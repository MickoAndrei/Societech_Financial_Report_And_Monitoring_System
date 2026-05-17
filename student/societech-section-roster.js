/**
 * Societech treasurer: view any section roster via ?class=BSIT1A
 */
(function () {
  const STUDENT_PAYMENTS = {
    '2024-001234': [
      { fee: 'Societech Membership Fee', due: 80, paid: 80 },
      { fee: 'IT Days / Panagmaya', due: 280, paid: 280 },
    ],
    '2024-001235': [
      { fee: 'Societech Membership Fee', due: 80, paid: 0 },
      { fee: 'IT Days / Panagmaya', due: 280, paid: 0 },
    ],
  };

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH')}`;
  }

  function getClassKeyFromQuery() {
    const p = new URLSearchParams(window.location.search);
    return window.ClassRosters.normalizeClassKey(p.get('class') || 'BSIT1A') || 'BSIT1A';
  }

  function feeRowsFromTemplate(cleared) {
    const payments = window.SocietechPayments?.getPayments() || [];
    return payments.map((p) => {
      const due = p.amount;
      const paid = cleared ? due : 0;
      const balance = due - paid;
      let status = 'Paid';
      if (balance >= due && due > 0) status = 'Unpaid';
      else if (balance > 0) status = 'Partial';
      return { fee: p.name, due, paid, balance, status };
    });
  }

  function resolvePaymentRows(studentId, clearanceStatus) {
    const custom = STUDENT_PAYMENTS[studentId];
    const cleared = clearanceStatus === 'cleared';
    if (custom) {
      return custom.map((row) => {
        const paid = Math.min(row.paid, row.due);
        const balance = Math.max(0, row.due - paid);
        let status = 'Paid';
        if (balance >= row.due && row.due > 0) status = 'Unpaid';
        else if (balance > 0) status = 'Partial';
        return { fee: row.fee, due: row.due, paid, balance, status };
      });
    }
    return feeRowsFromTemplate(cleared);
  }

  function statusPillClass(status) {
    if (status === 'Paid') return 'status-pill status-cleared';
    if (status === 'Partial') return 'status-pill status-pending';
    return 'status-pill status-warning';
  }

  function renderRosterTable(tbody, students) {
    tbody.textContent = '';
    students.forEach((s) => {
      const tr = document.createElement('tr');
      tr.dataset.name = s.name;
      tr.dataset.id = s.id;
      tr.dataset.status = s.status;
      tr.setAttribute('role', 'button');
      tr.setAttribute('tabindex', '0');

      const tdName = document.createElement('td');
      tdName.textContent = s.name;
      const tdId = document.createElement('td');
      tdId.textContent = s.id;
      const tdStatus = document.createElement('td');
      const span = document.createElement('span');
      span.className = s.status === 'cleared' ? 'status-pill status-cleared' : 'status-pill status-warning';
      span.textContent = s.status === 'cleared' ? 'Cleared' : 'Not Cleared';
      tdStatus.appendChild(span);

      tr.appendChild(tdName);
      tr.appendChild(tdId);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
  }

  function updateCounts(table, resultCount, totalId, clearedId, notClearedId) {
    const rows = Array.from(table.querySelectorAll('tbody tr')).filter((r) => r.style.display !== 'none');
    const cleared = rows.filter((r) => r.dataset.status === 'cleared').length;
    const notCleared = rows.filter((r) => r.dataset.status === 'not-cleared').length;
    const totalEl = document.getElementById(totalId);
    const clearedEl = document.getElementById(clearedId);
    const notClearedEl = document.getElementById(notClearedId);
    const resultEl = document.getElementById(resultCount);
    if (totalEl) totalEl.textContent = String(rows.length);
    if (clearedEl) clearedEl.textContent = String(cleared);
    if (notClearedEl) notClearedEl.textContent = String(notCleared);
    if (resultEl) resultEl.textContent = `Showing ${rows.length} student${rows.length === 1 ? '' : 's'}`;
  }

  function setupSearch(searchInputId, tableId, resultCountId, totalId, clearedId, notClearedId) {
    const searchInput = document.getElementById(searchInputId);
    const table = document.getElementById(tableId);
    if (!searchInput || !table) return;
    function applyFilter() {
      const q = (searchInput.value || '').trim().toLowerCase();
      table.querySelectorAll('tbody tr').forEach((row) => {
        const name = (row.dataset.name || '').toLowerCase();
        const id = (row.dataset.id || '').toLowerCase();
        row.style.display = !q || name.includes(q) || id.includes(q) ? '' : 'none';
      });
      updateCounts(table, resultCountId, totalId, clearedId, notClearedId);
    }
    searchInput.addEventListener('input', applyFilter);
    applyFilter();
  }

  function openModal(overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function initSectionRoster() {
    if (!window.StudentSession?.requireSocietechTreasurer('index.html')) return;

    const classKey = getClassKeyFromQuery();
    const label = window.ClassRosters.formatClassLabel(classKey);
    const students = window.ClassRosters.getRosterForClass(classKey);
    const summary = window.ClassRosters.getSectionSummary(classKey);

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

    renderRosterTable(tbody, students);
    setupSearch('studentSearch', 'studentsTable', 'resultCount', 'totalStudents', 'clearedCount', 'notClearedCount');

    const overlay = document.getElementById('studentPaymentsModal');
    if (!overlay) return;

    overlay.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => closeModal(overlay));
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });

    function fillModal(name, studentId, clearanceStatus) {
      document.getElementById('studentPaymentsTitle').textContent = name;
      document.getElementById('studentPaymentsSubtitle').textContent =
        `${label} · School ID ${studentId}`;
      const payTbody = document.querySelector('#studentPaymentsTable tbody');
      payTbody.textContent = '';
      resolvePaymentRows(studentId, clearanceStatus).forEach((row) => {
        const tr = document.createElement('tr');
        [row.fee, peso(row.due), peso(row.paid), peso(row.balance)].forEach((text) => {
          const td = document.createElement('td');
          td.textContent = text;
          tr.appendChild(td);
        });
        const tdStat = document.createElement('td');
        const span = document.createElement('span');
        span.className = statusPillClass(row.status);
        span.textContent = row.status;
        tdStat.appendChild(span);
        tr.appendChild(tdStat);
        payTbody.appendChild(tr);
      });
    }

    function activateRow(tr) {
      if (!tr || tr.parentElement !== tbody) return;
      fillModal(tr.dataset.name, tr.dataset.id, tr.dataset.status);
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
