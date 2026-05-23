/**
 * Classroom treasurer: section roster scoped to the treasurer's own class only.
 */
(function () {
  function getFeeDataset() {
    return window.TreasurerFeeDataset;
  }

  function statusPillClass(status) {
    if (status === 'Paid') return 'statusPill statusCleared';
    if (status === 'Partial') return 'statusPill statusPending';
    return 'statusPill statusWarning';
  }

  function renderRosterTable(tbody, students) {
    const feeDataset = getFeeDataset();
    if (!feeDataset) return;
    const { totalOutstanding, peso } = feeDataset;
    tbody.textContent = '';
    students.forEach((s) => {
      const tr = document.createElement('tr');
      tr.dataset.name = s.name;
      tr.dataset.id = s.id;
      tr.dataset.status = s.status;
      const total = totalOutstanding(s.id, s.status);
      tr.dataset.balanceTotal = String(total);
      tr.setAttribute('role', 'button');
      tr.setAttribute('tabindex', '0');
      tr.setAttribute('aria-label', `View payment details for ${s.name}`);

      const tdName = document.createElement('td');
      tdName.textContent = s.name;

      const tdBal = document.createElement('td');
      tdBal.className = 'rosterBalanceCell';
      tdBal.textContent = peso(total);

      const tdStatus = document.createElement('td');
      const span = document.createElement('span');
      span.className = s.status === 'cleared' ? 'statusPill statusCleared' : 'statusPill statusWarning';
      span.textContent = s.status === 'cleared' ? 'Cleared' : 'Not Cleared';
      tdStatus.appendChild(span);

      tr.appendChild(tdName);
      tr.appendChild(tdBal);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
  }

  function updateCounts(table, resultCountId, totalId, clearedId, notClearedId) {
    const rows = Array.from(table.querySelectorAll('tbody tr')).filter((r) => r.style.display !== 'none');
    const cleared = rows.filter((r) => r.dataset.status === 'cleared').length;
    const notCleared = rows.filter((r) => r.dataset.status === 'not-cleared').length;

    const totalEl = document.getElementById(totalId);
    const clearedEl = document.getElementById(clearedId);
    const notClearedEl = document.getElementById(notClearedId);
    const resultEl = document.getElementById(resultCountId);

    if (totalEl) totalEl.textContent = String(rows.length);
    if (clearedEl) clearedEl.textContent = String(cleared);
    if (notClearedEl) notClearedEl.textContent = String(notCleared);
    if (resultEl) {
      resultEl.textContent = `Showing ${rows.length} student${rows.length === 1 ? '' : 's'}`;
    }
  }

  /** @returns {(() => void) | null} */
  function setupSearch(searchInputId, tableId, resultCountId, totalId, clearedId, notClearedId) {
    const feeDataset = getFeeDataset();
    if (!feeDataset) return null;
    const { peso } = feeDataset;
    const searchInput = document.getElementById(searchInputId);
    const table = document.getElementById(tableId);
    if (!searchInput || !table) return null;

    function applyFilter() {
      const q = (searchInput.value || '').trim().toLowerCase();
      table.querySelectorAll('tbody tr').forEach((row) => {
        const name = (row.dataset.name || '').toLowerCase();
        const bal = (row.dataset.balanceTotal || '').toLowerCase();
        const balFormatted = peso(Number(row.dataset.balanceTotal || 0)).toLowerCase();
        row.style.display =
          !q || name.includes(q) || bal.includes(q) || balFormatted.includes(q) ? '' : 'none';
      });
      updateCounts(table, resultCountId, totalId, clearedId, notClearedId);
    }

    searchInput.addEventListener('input', applyFilter);
    applyFilter();
    return applyFilter;
  }

  function syncRosterRowBalance(tbody, studentId, clearanceStatus) {
    const feeDataset = getFeeDataset();
    if (!feeDataset) return;
    const { totalOutstanding, peso } = feeDataset;
    const tr = tbody.querySelector(`tr[data-id="${CSS.escape(studentId)}"]`);
    if (!tr) return;
    const total = totalOutstanding(studentId, clearanceStatus);
    tr.dataset.balanceTotal = String(total);
    const cell = tr.querySelector('.rosterBalanceCell');
    if (cell) cell.textContent = peso(total);
  }

  function updateSubtitleTotal(subEl, classLabel, studentId, clearanceStatus) {
    const feeDataset = getFeeDataset();
    if (!feeDataset || !subEl) return;
    const { totalOutstanding, peso } = feeDataset;
    const total = totalOutstanding(studentId, clearanceStatus);
    const prefix = classLabel ? `${classLabel} · ` : '';
    subEl.textContent = `${prefix}Total outstanding: ${peso(total)}`;
  }

  function fillStudentPaymentsModal(name, studentId, clearanceStatus, classLabel, rosterTbody, subEl) {
    const feeDataset = getFeeDataset();
    if (!feeDataset) return;
    const { resolvePaymentRows, persistFeePaid, peso } = feeDataset;

    const titleEl = document.getElementById('studentPaymentsTitle');
    if (titleEl) titleEl.textContent = name;
    updateSubtitleTotal(subEl, classLabel, studentId, clearanceStatus);

    const payTbody = document.querySelector('#studentPaymentsTable tbody');
    if (!payTbody) return;
    payTbody.textContent = '';

    function renderRows() {
      const rows = resolvePaymentRows(studentId, clearanceStatus);
      payTbody.textContent = '';
      rows.forEach((row) => {
        const tr = document.createElement('tr');
        tr.dataset.fee = row.fee;

        const tdFee = document.createElement('td');
        tdFee.textContent = row.fee;
        tr.appendChild(tdFee);

        const tdDue = document.createElement('td');
        tdDue.textContent = peso(row.due);
        tr.appendChild(tdDue);

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'formInput feePaidInput';
        input.min = '0';
        input.max = String(row.due);
        input.step = '1';
        input.value = String(row.paid);
        input.setAttribute('aria-label', `Amount paid for ${row.fee}`);
        input.addEventListener('change', () => onPaidInput(input));
        input.addEventListener('input', () => onPaidInput(input));

        const tdPaid = document.createElement('td');
        tdPaid.appendChild(input);
        tr.appendChild(tdPaid);

        const tdBal = document.createElement('td');
        tdBal.className = 'feeBalanceCell';
        tdBal.textContent = peso(row.balance);
        tr.appendChild(tdBal);

        const tdStat = document.createElement('td');
        const span = document.createElement('span');
        span.className = statusPillClass(row.status);
        span.textContent = row.status;
        tdStat.appendChild(span);
        tr.appendChild(tdStat);

        payTbody.appendChild(tr);
      });
    }

    function onPaidInput(input) {
      const tr = input.closest('tr');
      const feeName = tr?.dataset.fee;
      if (!feeName) return;
      const due = Number(input.max);
      const paid = persistFeePaid(studentId, feeName, due, input.value);
      input.value = String(paid);

      const balanceCell = tr.querySelector('.feeBalanceCell');
      if (balanceCell) balanceCell.textContent = peso(due - paid);

      const rows = resolvePaymentRows(studentId, clearanceStatus);
      const updated = rows.find((r) => r.fee === feeName);
      const statSpan = tr.querySelector('td:last-child span');
      if (statSpan && updated) {
        statSpan.className = statusPillClass(updated.status);
        statSpan.textContent = updated.status;
      }

      updateSubtitleTotal(subEl, classLabel, studentId, clearanceStatus);
      syncRosterRowBalance(rosterTbody, studentId, clearanceStatus);
      const table = rosterTbody.closest('table');
      if (table) {
        updateCounts(table, 'resultCount', 'totalStudents', 'clearedCount', 'notClearedCount');
      }
    }

    renderRows();
  }

  function openModal(overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    const closeBtn = overlay.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function initTreasurerRosterPage() {
    if (!window.TreasurerFeeDataset) {
      console.error('treasurer-fee-dataset.js must load before treasurer-roster.js');
      return;
    }
    if (!window.StudentSession?.requireClassTreasurer()) {
      return;
    }

    const classKey = window.StudentSession.getTreasurerClassKey();
    const label = window.StudentSession.getTreasurerClassLabel();
    const students = window.ClassRosters?.getRosterForClass(classKey) || [];
    const baseStudents = [...students];
    const sortSelect = document.getElementById('rosterSort');
    let sortMode = sortSelect?.value || 'default';

    const sectionTitle = document.getElementById('sectionTitle');
    const rosterHeading = document.getElementById('rosterSectionHeading');
    const pageMainTitle = document.getElementById('pageMainTitle');
    const profileRole = document.querySelector('.profileRole');
    const session = window.StudentSession.getStudentSession();

    if (sectionTitle) sectionTitle.textContent = label;
    if (rosterHeading) rosterHeading.textContent = `${label} — class list`;
    if (pageMainTitle) pageMainTitle.textContent = `${label} Class List`;
    if (profileRole) profileRole.textContent = `${label} · Class Treasurer`;
    if (session.fullName) {
      const profileName = document.querySelector('.profileName');
      if (profileName) profileName.textContent = session.fullName;
    }
    document.title = `${label} Class List • Societech Student`;

    const table = document.getElementById('studentsTable');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    function applySortAndRender() {
      const sorted = window.TreasurerFeeDataset.sortStudents(baseStudents, sortMode);
      renderRosterTable(tbody, sorted);
    }

    applySortAndRender();
    const applyFilter = setupSearch(
      'studentSearch',
      'studentsTable',
      'resultCount',
      'totalStudents',
      'clearedCount',
      'notClearedCount',
    );

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        sortMode = sortSelect.value;
        applySortAndRender();
        if (applyFilter) applyFilter();
      });
    }

    const overlay = document.getElementById('studentPaymentsModal');
    if (!overlay) return;
    const subEl = document.getElementById('studentPaymentsSubtitle');

    overlay.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => closeModal(overlay));
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('show')) closeModal(overlay);
    });

    function activateRow(tr) {
      if (!tr || tr.parentElement !== tbody) return;
      fillStudentPaymentsModal(tr.dataset.name, tr.dataset.id, tr.dataset.status, label, tbody, subEl);
      openModal(overlay);
    }

    tbody.addEventListener('click', (e) => {
      activateRow(e.target.closest('tr'));
    });
    tbody.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const tr = e.target.closest('tr');
      if (tr && tbody.contains(tr)) {
        e.preventDefault();
        activateRow(tr);
      }
    });
  }

  // FIX: race condition — auth/me (societech-session-ready) resolves faster than
  // the /api/sections + roster chain (societech-rosters-changed). If we initialise
  // on session-ready alone, ClassRosters.getRosterForClass() returns [] and the
  // table is empty. Both events must fire before we render.
  let _sessionReady = false;
  let _rostersReady = false;

  function maybeInit() {
    if (_sessionReady && _rostersReady) {
      initTreasurerRosterPage();
    }
  }

  window.addEventListener('societech-session-ready', function () {
    _sessionReady = true;
    maybeInit();
  });

  window.addEventListener('societech-rosters-changed', function () {
    _rostersReady = true;
    maybeInit();
  });
})();