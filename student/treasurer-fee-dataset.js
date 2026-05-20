/**
 * Shared fee rows + balance overrides for class treasurer and Societech treasurer rosters.
 */
(function (global) {
  const STORAGE_KEY = 'treasurer_shared_fee_balance_overrides';
  const LEGACY_CLASS = 'classTreasurer_fee_balance_overrides';
  const LEGACY_SOC = 'societechTreasurer_fee_balance_overrides';

  const STUDENT_PAYMENTS = {
    '2024-001234': [
      { fee: 'Societech Membership Fee', due: 80, paid: 80 },
      { fee: 'Daily Dues (semester)', due: 400, paid: 400 },
      { fee: 'IT Days / Panagmaya', due: 280, paid: 280 },
      { fee: 'Society Shirt', due: 150, paid: 150 },
      { fee: 'Community Project Share', due: 120, paid: 120 },
    ],
    '2024-001235': [
      { fee: 'Societech Membership Fee', due: 80, paid: 0 },
      { fee: 'Daily Dues (semester)', due: 400, paid: 200 },
      { fee: 'IT Days / Panagmaya', due: 280, paid: 0 },
      { fee: 'Society Shirt', due: 150, paid: 150 },
      { fee: 'Community Project Share', due: 120, paid: 40 },
    ],
  };

  function tryParse(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      const o = JSON.parse(raw);
      return o && typeof o === 'object' ? o : {};
    } catch {
      return {};
    }
  }

  function saveBalanceOverrides(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }

  function loadBalanceOverrides() {
    const rawNew = localStorage.getItem(STORAGE_KEY);
    if (rawNew === null) {
      const fromClass = tryParse(LEGACY_CLASS);
      const fromSoc = tryParse(LEGACY_SOC);
      const cur = {};
      const ids = new Set([...Object.keys(fromClass), ...Object.keys(fromSoc)]);
      ids.forEach((id) => {
        cur[id] = { ...(fromSoc[id] || {}), ...(fromClass[id] || {}) };
      });
      saveBalanceOverrides(cur);
      return cur;
    }
    return tryParse(STORAGE_KEY);
  }

  function applyStoredBalances(studentId, rows) {
    const perStudent = loadBalanceOverrides()[studentId];
    if (!perStudent) return rows;
    return rows.map((row) => {
      if (!Object.prototype.hasOwnProperty.call(perStudent, row.fee)) return row;
      let balance = Math.round(Number(perStudent[row.fee]));
      if (Number.isNaN(balance)) return row;
      balance = Math.max(0, Math.min(row.due, balance));
      const paid = row.due - balance;
      let status = 'Paid';
      if (balance >= row.due && row.due > 0) status = 'Unpaid';
      else if (balance > 0) status = 'Partial';
      return { fee: row.fee, due: row.due, paid, balance, status };
    });
  }

  function feeRowsFromTemplate(cleared) {
    const payFactor = cleared ? 1 : 0.35;
    const raw = [
      { fee: 'Societech Membership Fee', due: 80, paid: cleared ? 80 : 0 },
      { fee: 'Daily Dues (semester)', due: 400, paid: Math.round(400 * payFactor) },
      { fee: 'IT Days / Panagmaya', due: 280, paid: cleared ? 280 : Math.round(280 * payFactor) },
      { fee: 'Society Shirt', due: 150, paid: cleared ? 150 : 150 },
      { fee: 'Community Project Share', due: 120, paid: cleared ? 120 : Math.round(120 * payFactor) },
    ];
    return raw.map((row) => {
      const paid = Math.min(row.paid, row.due);
      const balance = Math.max(0, row.due - paid);
      let status = 'Paid';
      if (balance >= row.due && row.due > 0) status = 'Unpaid';
      else if (balance > 0) status = 'Partial';
      return { ...row, paid, balance, status };
    });
  }

  function resolvePaymentRows(studentId, clearanceStatus) {
    const custom = STUDENT_PAYMENTS[studentId];
    const cleared = clearanceStatus === 'cleared';
    let base;
    if (custom) {
      base = custom.map((row) => {
        const paid = Math.min(row.paid, row.due);
        const balance = Math.max(0, row.due - paid);
        let status = 'Paid';
        if (balance >= row.due && row.due > 0) status = 'Unpaid';
        else if (balance > 0) status = 'Partial';
        return { fee: row.fee, due: row.due, paid, balance, status };
      });
    } else {
      base = feeRowsFromTemplate(cleared);
    }
    return applyStoredBalances(studentId, base);
  }

  function totalOutstanding(studentId, clearanceStatus) {
    return resolvePaymentRows(studentId, clearanceStatus).reduce((s, r) => s + r.balance, 0);
  }

  function persistFeeBalance(studentId, feeName, due, rawBalance) {
    const all = loadBalanceOverrides();
    if (!all[studentId]) all[studentId] = {};
    let b = Math.round(Number(rawBalance));
    if (Number.isNaN(b)) b = 0;
    b = Math.max(0, Math.min(due, b));
    all[studentId][feeName] = b;
    saveBalanceOverrides(all);
    return b;
  }

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH')}`;
  }

  /**
   * @param {Array<{ name: string, id: string, status: string }>} list
   * @param {'default'|'cleared-first'|'not-cleared-first'} mode
   */
  function sortStudents(list, mode) {
    const copy = [...list];
    if (mode === 'cleared-first') {
      return copy.sort((a, b) => {
        const ac = a.status === 'cleared' ? 0 : 1;
        const bc = b.status === 'cleared' ? 0 : 1;
        if (ac !== bc) return ac - bc;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
    }
    if (mode === 'not-cleared-first') {
      return copy.sort((a, b) => {
        const ac = a.status === 'cleared' ? 1 : 0;
        const bc = b.status === 'cleared' ? 1 : 0;
        if (ac !== bc) return ac - bc;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
    }
    return copy;
  }

  global.TreasurerFeeDataset = {
    STUDENT_PAYMENTS,
    resolvePaymentRows,
    totalOutstanding,
    persistFeeBalance,
    peso,
    sortStudents,
  };
})(window);
