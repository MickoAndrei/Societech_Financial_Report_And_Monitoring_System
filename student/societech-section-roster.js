/**
 * Societech treasurer: view any section roster via ?class=BSIT1A
 */
(function () {
  function getFD() {
    return window.TreasurerFeeDataset;
  }

  function getClassKeyFromQuery() {
    const p = new URLSearchParams(window.location.search);
    return window.ClassRosters.normalizeClassKey(p.get('class') || 'BSIT1A') || 'BSIT1A';
  }

  function statusPillClass(status) {
    if (status === 'Paid') return 'status-pill status-cleared';
    if (status === 'Partial') return 'status-pill status-pending';
    return 'status-pill status-warning';
  }

  function renderRosterTable(tbody, students) {
    const FD = getFD();
    if (!FD) return;
    const { totalOutstanding, peso } = FD;
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
      tdBal.className = 'roster-balance-cell';
      tdBal.textContent = peso(total);
      const tdStatus = document.createElement('td');
      const span = document.createElement('span');
      span.className = s.status === 'cleared' ? 'status-pill status-cleared' : 'status-pill status-warning';
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
    if (resultEl) resultEl.textContent = `Showing ${rows.length} student${rows.length === 1 ? '' : 's'}`;
  }

  /** @returns {(() => void) | null} */
  function setupSearch(searchInputId, tableId, resultCountId, totalId, clearedId, notClearedId) {
    const FD = getFD();
    if (!FD) return null;
    const { peso } = FD;
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

  function openModal(overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function syncRosterRowBalance(tbody, studentId, clearanceStatus) {
    const FD = getFD();
    if (!FD) return;
    const { totalOutstanding, peso } = FD;
    const tr = tbody.querySelector(`tr[data-id="${CSS.escape(studentId)}"]`);
    if (!tr) return;
    const total = totalOutstanding(studentId, clearanceStatus);
    tr.dataset.balanceTotal = String(total);
    const cell = tr.querySelector('.roster-balance-cell');
    if (cell) cell.textContent = peso(total);
  }

  function updateSubtitleTotal(subEl, label, studentId, clearanceStatus) {
    const FD = getFD();
    if (!FD || !subEl) return;
    const { totalOutstanding, peso } = FD;
    const total = totalOutstanding(studentId, clearanceStatus);
    subEl.textContent = `${label} · Total outstanding: ${peso(total)}`;
  }

  function fillFeeModal(name, studentId, clearanceStatus, label, rosterTbody, subEl) {
    const FD = getFD();
    if (!FD) return;
    const { resolvePaymentRows, persistFeeBalance, peso } = FD;

    const titleEl = document.getElementById('studentPaymentsTitle');
    if (titleEl) titleEl.textContent = name;
    updateSubtitleTotal(subEl, label, studentId, clearanceStatus);

    const payTbody = document.querySelector('#studentPaymentsTable tbody');
    if (!payTbody) return;

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

        const tdPaid = document.createElement('td');
        tdPaid.className = 'fee-paid-cell';
        tdPaid.textContent = peso(row.paid);
        tr.appendChild(tdPaid);

        const tdBal = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-input fee-balance-input';
        input.min = '0';
        input.max = String(row.due);
        input.step = '1';
        input.value = String(row.balance);
        input.setAttribute('aria-label', `Balance for ${row.fee}`);
        input.addEventListener('change', () => onBalanceInput(input));
        input.addEventListener('input', () => onBalanceInput(input));
        tdBal.appendChild(input);
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

    function onBalanceInput(input) {
      const tr = input.closest('tr');
      const feeName = tr?.dataset.fee;
      if (!feeName) return;
      const due = Number(input.max);
      const stored = persistFeeBalance(studentId, feeName, due, input.value);
      input.value = String(stored);

      const paidCell = tr.querySelector('.fee-paid-cell');
      if (paidCell) paidCell.textContent = peso(due - stored);

      const rows = resolvePaymentRows(studentId, clearanceStatus);
      const updated = rows.find((r) => r.fee === feeName);
      const statSpan = tr.querySelector('td:last-child span');
      if (statSpan && updated) {
        statSpan.className = statusPillClass(updated.status);
        statSpan.textContent = updated.status;
      }

      updateSubtitleTotal(subEl, label, studentId, clearanceStatus);
      syncRosterRowBalance(rosterTbody, studentId, clearanceStatus);
      const rosterTable = rosterTbody.closest('table');
      if (rosterTable) {
        updateCounts(rosterTable, 'resultCount', 'totalStudents', 'clearedCount', 'notClearedCount');
      }
    }

    renderRows();
  }

  function initSectionRoster() {
    if (!window.TreasurerFeeDataset) {
      console.error('treasurer-fee-dataset.js must load before societech-section-roster.js');
      return;
    }
    if (!window.StudentSession?.requireSocietechTreasurer('index.html')) return;

    const classKey = getClassKeyFromQuery();
    const label = window.ClassRosters.formatClassLabel(classKey);
    const students = window.ClassRosters.getRosterForClass(classKey);
    const baseStudents = [...students];
    const sortSelect = document.getElementById('rosterSort');
    let sortMode = sortSelect?.value || 'default';

    const sectionTitleEl = document.getElementById('sectionTitle');
    if (sectionTitleEl) sectionTitleEl.textContent = label;
    const pageMainTitle = document.getElementById('pageMainTitle');
    if (pageMainTitle) pageMainTitle.textContent = `${label} Class List`;
    const rosterHeading = document.getElementById('rosterSectionHeading');
    if (rosterHeading) rosterHeading.textContent = `${label} — class roster`;
    document.title = `${label} Class List • Societech Treasurer`;

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
      fillFeeModal(tr.dataset.name, tr.dataset.id, tr.dataset.status, label, tbody, subEl);
      openModal(overlay);
    }

    tbody.addEventListener('click', (e) => activateRow(e.target.closest('tr')));
    tbody.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const tr = e.target.closest('tr');
        if (tr && tbody.contains(tr)) {
          e.preventDefault();
          activateRow(tr);
        }
      }
    });

    window.StudentSession.applyProfileToPage();
  }

  document.addEventListener('DOMContentLoaded', initSectionRoster);
})();
