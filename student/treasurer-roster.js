/**
 * Classroom treasurer: section roster scoped to the treasurer's own class only.
 */
(function () {
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

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH')}`;
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
      tr.setAttribute('aria-label', `View payment details for ${s.name}`);

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
    if (resultEl) {
      resultEl.textContent = `Showing ${rows.length} student${rows.length === 1 ? '' : 's'}`;
    }
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

  function fillStudentPaymentsModal(name, studentId, clearanceStatus, classLabel) {
    const titleEl = document.getElementById('studentPaymentsTitle');
    const subEl = document.getElementById('studentPaymentsSubtitle');
    const payTbody = document.querySelector('#studentPaymentsTable tbody');

    if (titleEl) titleEl.textContent = name;
    if (subEl) {
      subEl.textContent = `${classLabel ? `${classLabel} · ` : ''}School ID ${studentId}`;
    }

    const rows = resolvePaymentRows(studentId, clearanceStatus);
    if (!payTbody) return;
    payTbody.textContent = '';
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      const cells = [
        row.fee,
        peso(row.due),
        peso(row.paid),
        peso(row.balance),
      ];
      cells.forEach((text) => {
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
    if (!window.StudentSession?.requireClassTreasurer('index.html')) {
      return;
    }

    const classKey = window.StudentSession.getTreasurerClassKey();
    const label = window.StudentSession.getTreasurerClassLabel();
    const students = window.ClassRosters?.getRosterForClass(classKey) || [];

    const sectionTitle = document.getElementById('sectionTitle');
    const rosterHeading = document.getElementById('rosterSectionHeading');
    const pageMainTitle = document.getElementById('pageMainTitle');
    const profileRole = document.querySelector('.profile-role');
    const session = window.StudentSession.getStudentSession();

    if (sectionTitle) sectionTitle.textContent = label;
    if (rosterHeading) rosterHeading.textContent = `${label} — class list`;
    if (pageMainTitle) pageMainTitle.textContent = `${label} Class List`;
    if (profileRole) profileRole.textContent = `${label} · Class Treasurer`;
    if (session.fullName) {
      const profileName = document.querySelector('.profile-name');
      if (profileName) profileName.textContent = session.fullName;
    }
    document.title = `${label} Class List • Societech Student`;

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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('show')) closeModal(overlay);
    });

    function activateRow(tr) {
      if (!tr || tr.parentElement !== tbody) return;
      fillStudentPaymentsModal(tr.dataset.name, tr.dataset.id, tr.dataset.status, label);
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

  document.addEventListener('DOMContentLoaded', initTreasurerRosterPage);
})();
