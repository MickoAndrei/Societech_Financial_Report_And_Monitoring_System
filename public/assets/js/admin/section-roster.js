/**
 * Admin section roster: renders students from ClassRosters and fees from SocietechPayments.
 */
(function () {
  const defaultClassKey = '';
  const rosters = window.ClassRosters || {};

  const normalizeClassKey = rosters.normalizeClassKey || function (raw) {
    if (!raw || typeof raw !== 'string') return '';
    return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  };

  const formatClassLabel = rosters.formatClassLabel || function (key) {
    if (!key) return 'Section';
    const match = key.match(/^([A-Z]+)(\d+)([A-Z])$/i);
    if (match) return `${match[1].toUpperCase()} ${match[2]}${match[3].toUpperCase()}`;
    return key;
  };

  function getClassKeyFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return normalizeClassKey(params.get('class') || defaultClassKey);
  }

  function peso(n) {
    return window.ClassRosters?.peso?.(n) || `PHP ${Number(n).toLocaleString('en-PH')}`;
  }

  function resolvePaymentRows() {
    const payments = window.SocietechPayments?.getPayments?.() || [];
    return payments.map((payment) => ({
      fee: payment.name,
      due: Number(payment.amount) || 0,
      paid: 0,
      balance: Number(payment.amount) || 0,
      status: Number(payment.amount) > 0 ? 'Unpaid' : 'Paid',
    }));
  }

  function statusBadgeClass(status) {
    if (status === 'Paid') return 'badge badgePaid';
    if (status === 'Partial') return 'badge badgePending';
    return 'badge badgeRejected';
  }

  function renderRosterTable(tbody, students) {
    tbody.textContent = '';
    students.forEach((student) => {
      const row = document.createElement('tr');
      row.dataset.name = student.name;
      row.dataset.id = student.id;
      row.dataset.status = student.status;
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-label', `View payment details for ${student.name}`);

      const nameCell = document.createElement('td');
      nameCell.textContent = student.name;

      const statusCell = document.createElement('td');
      statusCell.style.textAlign = 'right';
      const statusBadge = document.createElement('span');
      statusBadge.className = student.status === 'cleared' ? 'badge badgePaid' : 'badge badgeRejected';
      statusBadge.textContent = student.status === 'cleared' ? 'Cleared' : 'Not Cleared';
      statusCell.appendChild(statusBadge);

      row.appendChild(nameCell);
      row.appendChild(statusCell);
      tbody.appendChild(row);
    });
  }

  function fillStudentPaymentsModal(name, studentId) {
    const titleEl = document.getElementById('studentPaymentsTitle');
    const subEl = document.getElementById('studentPaymentsSubtitle');
    const payTbody = document.querySelector('#studentPaymentsTable tbody');
    const classLabel = document.getElementById('sectionTitle')?.textContent?.trim() || '';

    if (titleEl) titleEl.textContent = name;
    if (subEl) {
      subEl.textContent = `${classLabel ? `${classLabel} - ` : ''}School ID ${studentId}`;
    }

    if (!payTbody) return;
    payTbody.textContent = '';
    resolvePaymentRows().forEach((paymentRow) => {
      const row = document.createElement('tr');
      const feeCell = document.createElement('td');
      feeCell.textContent = paymentRow.fee;
      const dueCell = document.createElement('td');
      dueCell.textContent = peso(paymentRow.due);
      const paidCell = document.createElement('td');
      paidCell.textContent = peso(paymentRow.paid);
      const balanceCell = document.createElement('td');
      balanceCell.textContent = peso(paymentRow.balance);
      const statusCell = document.createElement('td');
      statusCell.style.textAlign = 'right';
      const badge = document.createElement('span');
      badge.className = statusBadgeClass(paymentRow.status);
      badge.textContent = paymentRow.status;
      statusCell.appendChild(badge);
      row.appendChild(feeCell);
      row.appendChild(dueCell);
      row.appendChild(paidCell);
      row.appendChild(balanceCell);
      row.appendChild(statusCell);
      payTbody.appendChild(row);
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
    const students = rosters.getRosterForClass?.(classKey) || [];

    const sectionTitle = document.getElementById('sectionTitle');
    const pageMainTitle = document.getElementById('pageMainTitle');
    if (sectionTitle) sectionTitle.textContent = label;
    if (pageMainTitle) pageMainTitle.textContent = label;
    document.title = `${label} - Societech Admin`;

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
        options.notClearedId,
      );
    }

    const overlay = document.getElementById('studentPaymentsModal');
    if (!overlay) return;

    overlay.querySelectorAll('[data-close-modal]').forEach((element) => {
      element.addEventListener('click', () => closeModal(overlay));
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal(overlay);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('show')) {
        closeModal(overlay);
      }
    });

    function activateRow(row) {
      if (!row || row.parentElement !== tbody) return;
      fillStudentPaymentsModal(row.dataset.name, row.dataset.id);
      openModal(overlay);
    }

    tbody.addEventListener('click', (event) => {
      activateRow(event.target.closest('tr'));
    });

    tbody.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const row = event.target.closest('tr');
      if (row && tbody.contains(row)) {
        event.preventDefault();
        activateRow(row);
      }
    });
  }

  window.initSectionPage = initSectionPage;
  window.getSectionClassKey = getClassKeyFromQuery;
})();
