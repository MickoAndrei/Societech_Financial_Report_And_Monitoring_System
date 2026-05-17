/**
 * Societech treasurer — manage society-wide payment assessments.
 */
(function () {
  let editingId = null;

  function guard() {
    return window.StudentSession?.requireSocietechTreasurer('index.html') === true;
  }

  function renderTable() {
    const tbody = document.querySelector('#paymentsTable tbody');
    if (!tbody) return;
    const payments = window.SocietechPayments.getPayments();
    tbody.textContent = '';

    payments.forEach((p) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${window.SocietechPayments.peso(p.amount)}</td>
        <td>${window.SocietechPayments.formatDeadline(p.deadline)}</td>
        <td>${p.description || '—'}</td>
        <td class="st-actions-cell">
          <button type="button" class="btn btn-secondary btn-sm" data-edit="${p.id}">Edit</button>
          <button type="button" class="btn btn-danger btn-sm" data-delete="${p.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-edit')));
    });
    tbody.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete');
        const p = window.SocietechPayments.getPaymentById(id);
        if (p && confirm(`Delete "${p.name}"?`)) {
          window.SocietechPayments.deletePayment(id);
          renderTable();
        }
      });
    });
  }

  function openModal(id) {
    editingId = id || null;
    const overlay = document.getElementById('paymentFormModal');
    const title = document.getElementById('paymentModalTitle');
    const nameInput = document.getElementById('paymentName');
    const amountInput = document.getElementById('paymentAmount');
    const deadlineInput = document.getElementById('paymentDeadline');
    const descInput = document.getElementById('paymentDescription');

    if (id) {
      const p = window.SocietechPayments.getPaymentById(id);
      if (!p) return;
      title.textContent = 'Edit Payment';
      nameInput.value = p.name;
      amountInput.value = p.amount;
      deadlineInput.value = p.deadline;
      descInput.value = p.description || '';
    } else {
      title.textContent = 'Add Payment';
      nameInput.value = '';
      amountInput.value = '';
      deadlineInput.value = '';
      descInput.value = '';
    }

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    nameInput.focus();
  }

  function closeModal() {
    const overlay = document.getElementById('paymentFormModal');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    editingId = null;
  }

  function savePayment(event) {
    event.preventDefault();
    const name = document.getElementById('paymentName').value.trim();
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const deadline = document.getElementById('paymentDeadline').value;
    const description = document.getElementById('paymentDescription').value.trim();

    if (!name || !deadline || Number.isNaN(amount) || amount < 0) {
      alert('Please enter a name, valid amount, and deadline.');
      return;
    }

    const data = { name, amount, deadline, description };
    if (editingId) {
      window.SocietechPayments.updatePayment(editingId, data);
    } else {
      window.SocietechPayments.addPayment(data);
    }

    closeModal();
    renderTable();
  }

  function init() {
    if (!guard()) return;

    document.getElementById('addPaymentBtn')?.addEventListener('click', () => openModal(null));
    document.getElementById('paymentForm')?.addEventListener('submit', savePayment);
    document.querySelectorAll('[data-close-payment-modal]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.getElementById('paymentFormModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'paymentFormModal') closeModal();
    });

    renderTable();
    window.StudentSession.applyProfileToPage();
    document.title = 'Manage Payments • Societech Treasurer';
  }

  document.addEventListener('DOMContentLoaded', init);
})();
