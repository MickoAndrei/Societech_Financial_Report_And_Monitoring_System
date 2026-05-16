/**
 * Section roster: URL ?class=BSIT1A → label "BSIT 1A", render students, payment modal.
 */
(function () {
  const DEFAULT_CLASS_KEY = 'BSIT1A';

  const CLASS_ROSTERS = {
    BSIT1A: [
      { name: 'Alyssa Cruz', id: '2024-001234', status: 'cleared' },
      { name: 'Mark Santos', id: '2024-001235', status: 'not-cleared' },
      { name: 'Kevin Dela Rosa', id: '2024-001236', status: 'cleared' },
      { name: 'Janelle Reyes', id: '2024-001237', status: 'cleared' },
      { name: 'Paolo Lim', id: '2024-001238', status: 'not-cleared' },
    ],
    BSIT1B: [
      { name: 'Bianca Flores', id: '2024-002101', status: 'cleared' },
      { name: 'Carlos Mendoza', id: '2024-002102', status: 'not-cleared' },
      { name: 'Denise Ramos', id: '2024-002103', status: 'cleared' },
      { name: 'Ethan Navarro', id: '2024-002104', status: 'cleared' },
    ],
    BSIT2A: [
      { name: 'Felix Torres', id: '2023-003201', status: 'not-cleared' },
      { name: 'Gabby Lim', id: '2023-003202', status: 'cleared' },
      { name: 'Hannah Cruz', id: '2023-003203', status: 'cleared' },
      { name: 'Ivan Reyes', id: '2023-003204', status: 'cleared' },
      { name: 'Jen Navarro', id: '2023-003205', status: 'not-cleared' },
    ],
    BSIT2B: [
      { name: 'Kyle Santos', id: '2023-004301', status: 'cleared' },
      { name: 'Lara Tan', id: '2023-004302', status: 'cleared' },
      { name: 'Miguel Ang', id: '2023-004303', status: 'not-cleared' },
    ],
    BSIT3A: [
      { name: 'Nina Lopez', id: '2022-005401', status: 'cleared' },
      { name: 'Oscar Diaz', id: '2022-005402', status: 'not-cleared' },
      { name: 'Patty Go', id: '2022-005403', status: 'cleared' },
      { name: 'Quincy Bautista', id: '2022-005404', status: 'cleared' },
    ],
    BSIT3B: [
      { name: 'Ria Fernandez', id: '2022-006501', status: 'cleared' },
      { name: 'Sam Villa', id: '2022-006502', status: 'not-cleared' },
      { name: 'Tina Ocampo', id: '2022-006503', status: 'cleared' },
    ],
  };

  /** Optional overrides per school ID */
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

  function normalizeClassKey(raw) {
    if (!raw || typeof raw !== 'string') return '';
    return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function formatClassLabel(key) {
    if (!key) return 'Section';
    const m = key.match(/^([A-Z]+)(\d+)([A-Z])$/i);
    if (m) return `${m[1].toUpperCase()} ${m[2]}${m[3].toUpperCase()}`;
    return key;
  }

  function getClassKeyFromQuery() {
    const p = new URLSearchParams(window.location.search);
    const key = normalizeClassKey(p.get('class') || '');
    return key || DEFAULT_CLASS_KEY;
  }

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH')}`;
  }

  function feeRowsFromTemplate(cleared) {
    const payFactor = cleared ? 1 : 0.35;
    const raw = [
      { fee: 'Societech Membership Fee', due: 80, paid: cleared ? 80 : 0 },
      { fee: 'Daily Dues (semester)', due: 400, paid: Math.round(400 * payFactor) },
      /* IT Panagmaya – local name for IT Days */
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

  function statusBadgeClass(status) {
    if (status === 'Paid') return 'badge badge-paid';
    if (status === 'Partial') return 'badge badge-pending';
    return 'badge badge-rejected';
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
      tr.setAttribute(
        'aria-label',
        `View payment details for ${s.name}`
      );

      const tdName = document.createElement('td');
      tdName.textContent = s.name;

      const tdStatus = document.createElement('td');
      tdStatus.style.textAlign = 'right';
      const span = document.createElement('span');
      span.className = s.status === 'cleared' ? 'badge badge-paid' : 'badge badge-rejected';
      span.textContent = s.status === 'cleared' ? 'Cleared' : 'Not Cleared';
      tdStatus.appendChild(span);

      tr.appendChild(tdName);
      tr.appendChild(tdStatus);
      tbody.appendChild(tr);
    });
  }

  function fillStudentPaymentsModal(name, studentId, clearanceStatus) {
    const titleEl = document.getElementById('studentPaymentsTitle');
    const subEl = document.getElementById('studentPaymentsSubtitle');
    const payTbody = document.querySelector('#studentPaymentsTable tbody');
    const classLabel = document.getElementById('sectionTitle')?.textContent?.trim() || '';

    if (titleEl) titleEl.textContent = name;
    if (subEl) {
      subEl.textContent = `${classLabel ? `${classLabel} · ` : ''}School ID ${studentId}`;
    }

    const rows = resolvePaymentRows(studentId, clearanceStatus);
    if (!payTbody) return;
    payTbody.textContent = '';
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      const tdFee = document.createElement('td');
      tdFee.textContent = row.fee;
      const tdDue = document.createElement('td');
      tdDue.textContent = peso(row.due);
      const tdPaid = document.createElement('td');
      tdPaid.textContent = peso(row.paid);
      const tdBal = document.createElement('td');
      tdBal.textContent = peso(row.balance);
      const tdStat = document.createElement('td');
      tdStat.style.textAlign = 'right';
      const badge = document.createElement('span');
      badge.className = statusBadgeClass(row.status);
      badge.textContent = row.status;
      tdStat.appendChild(badge);
      tr.appendChild(tdFee);
      tr.appendChild(tdDue);
      tr.appendChild(tdPaid);
      tr.appendChild(tdBal);
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

  function initSectionPage(options) {
    const classKey = getClassKeyFromQuery();
    const label = formatClassLabel(classKey);
    const students = CLASS_ROSTERS[classKey] || CLASS_ROSTERS[DEFAULT_CLASS_KEY];

    const sectionTitle = document.getElementById('sectionTitle');
    const pageMainTitle = document.getElementById('pageMainTitle');
    if (sectionTitle) sectionTitle.textContent = label;
    if (pageMainTitle) pageMainTitle.textContent = label;
    document.title = `${label} • Societech Admin`;

    const table = document.getElementById('studentsTable');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    renderRosterTable(tbody, students);

    if (typeof setupTableFilters === 'function' && options) {
      setupTableFilters(
        options.searchInputId,
        options.tableId,
        options.resultCountId,
        options.totalId,
        options.clearedId,
        options.notClearedId
      );
    }

    const overlay = document.getElementById('studentPaymentsModal');
    if (!overlay) return;

    overlay.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => closeModal(overlay));
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('show')) {
        closeModal(overlay);
      }
    });

    function activateRow(tr) {
      if (!tr || tr.parentElement !== tbody) return;
      fillStudentPaymentsModal(tr.dataset.name, tr.dataset.id, tr.dataset.status);
      openModal(overlay);
    }

    tbody.addEventListener('click', (e) => {
      const tr = e.target.closest('tr');
      activateRow(tr);
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

  window.initSectionPage = initSectionPage;
  window.getSectionClassKey = getClassKeyFromQuery;
})();
