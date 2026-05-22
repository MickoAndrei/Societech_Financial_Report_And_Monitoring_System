/**
 * Shared fee rows + payment overrides for class treasurer and Societech treasurer rosters.
 * Database-ready: fee rows are derived from configured Societech payments, not seeded records.
 */
(function (global) {
  const balanceOverrideStorageKey = 'treasurer_shared_fee_balance_overrides';
  const legacyClassStorageKey = 'classTreasurer_fee_balance_overrides';
  const legacySocietechStorageKey = 'societechTreasurer_fee_balance_overrides';

  function tryParse(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveBalanceOverrides(map) {
    localStorage.setItem(balanceOverrideStorageKey, JSON.stringify(map));
  }

  function loadBalanceOverrides() {
    const rawCurrent = localStorage.getItem(balanceOverrideStorageKey);
    if (rawCurrent === null) {
      const fromClass = tryParse(legacyClassStorageKey);
      const fromSocietech = tryParse(legacySocietechStorageKey);
      const current = {};
      const ids = new Set([...Object.keys(fromClass), ...Object.keys(fromSocietech)]);
      ids.forEach((id) => {
        current[id] = { ...(fromSocietech[id] || {}), ...(fromClass[id] || {}) };
      });
      saveBalanceOverrides(current);
      return current;
    }
    return tryParse(balanceOverrideStorageKey);
  }

  function getConfiguredFees() {
    const payments = global.SocietechPayments?.getPayments?.() || [];
    return payments.map((payment) => ({
      fee: payment.name,
      due: Number(payment.amount) || 0,
      paid: 0,
    }));
  }

  function toPaymentRow(row) {
    const due = Math.max(0, Number(row.due) || 0);
    const paid = Math.max(0, Math.min(due, Number(row.paid) || 0));
    const balance = Math.max(0, due - paid);
    let status = 'Paid';
    if (balance >= due && due > 0) status = 'Unpaid';
    else if (balance > 0) status = 'Partial';
    return { fee: row.fee, due, paid, balance, status };
  }

  function applyStoredBalances(studentId, rows) {
    const perStudent = loadBalanceOverrides()[studentId];
    if (!perStudent) return rows;
    return rows.map((row) => {
      if (!Object.prototype.hasOwnProperty.call(perStudent, row.fee)) return row;
      let balance = Math.round(Number(perStudent[row.fee]));
      if (Number.isNaN(balance)) return row;
      balance = Math.max(0, Math.min(row.due, balance));
      return toPaymentRow({ fee: row.fee, due: row.due, paid: row.due - balance });
    });
  }

  function resolvePaymentRows(studentId) {
    return applyStoredBalances(studentId, getConfiguredFees().map(toPaymentRow));
  }

  function totalOutstanding(studentId, clearanceStatus) {
    return resolvePaymentRows(studentId, clearanceStatus).reduce((sum, row) => sum + row.balance, 0);
  }

  function persistFeeBalance(studentId, feeName, due, rawBalance) {
    const all = loadBalanceOverrides();
    if (!all[studentId]) all[studentId] = {};
    let balance = Math.round(Number(rawBalance));
    if (Number.isNaN(balance)) balance = 0;
    balance = Math.max(0, Math.min(due, balance));
    all[studentId][feeName] = balance;
    saveBalanceOverrides(all);
    return balance;
  }

  function persistFeePaid(studentId, feeName, due, rawPaid) {
    let paid = Math.round(Number(rawPaid));
    if (Number.isNaN(paid)) paid = 0;
    paid = Math.max(0, Math.min(due, paid));
    persistFeeBalance(studentId, feeName, due, due - paid);
    return paid;
  }

  function peso(n) {
    return `PHP ${Number(n).toLocaleString('en-PH')}`;
  }

  function sortStudents(list, mode) {
    const copy = [...list];
    if (mode === 'cleared-first') {
      return copy.sort((a, b) => {
        const aCleared = a.status === 'cleared' ? 0 : 1;
        const bCleared = b.status === 'cleared' ? 0 : 1;
        if (aCleared !== bCleared) return aCleared - bCleared;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
    }
    if (mode === 'not-cleared-first') {
      return copy.sort((a, b) => {
        const aCleared = a.status === 'cleared' ? 1 : 0;
        const bCleared = b.status === 'cleared' ? 1 : 0;
        if (aCleared !== bCleared) return aCleared - bCleared;
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
    }
    return copy;
  }

  global.TreasurerFeeDataset = {
    balanceOverrideStorageKey,
    resolvePaymentRows,
    totalOutstanding,
    persistFeeBalance,
    persistFeePaid,
    peso,
    sortStudents,
  };
})(window);
