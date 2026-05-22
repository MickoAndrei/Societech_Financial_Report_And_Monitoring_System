/**
 * Societech-wide fee assessments backed by the CI4 API.
 */
(function (global) {
  const apiUrl = `${global.location.origin}${global.location.pathname.replace(/\/(?:public\/?)?[^/]*$/, '')}/api/fees`;
  let cache = [];

  function toViewModel(row) {
    return {
      id: Number(row.id),
      name: row.name || row.title || '',
      amount: Number(row.amount) || 0,
      deadline: row.deadline || row.due_on || '',
      description: row.description || '',
      status: row.status || 'active',
      scope: row.scope || 'organization',
      sectionId: row.section_id || null,
    };
  }

  function toApiPayload(data) {
    return {
      title: String(data.name || data.title || '').trim(),
      description: String(data.description || '').trim(),
      amount: Number(data.amount) || 0,
      due_on: data.deadline || data.due_on || null,
      scope: data.scope || 'organization',
      status: data.status || 'active',
      section_id: data.sectionId || data.section_id || null,
    };
  }

  async function request(path = '', options = {}) {
    const response = await fetch(`${apiUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Fees API failed with ${response.status}`);
    }

    return response.status === 204 ? {} : response.json();
  }

  async function refresh() {
    try {
      const result = await request();
      cache = (result.data || []).map(toViewModel);
      global.dispatchEvent(new CustomEvent('societech-payments-changed'));
    } catch {
      cache = [];
    }

    return cache;
  }

  function getPayments() {
    return [...cache];
  }

  function getPaymentById(id) {
    return getPayments().find((payment) => String(payment.id) === String(id)) || null;
  }

  async function addPayment(data) {
    const result = await request('', {
      method: 'POST',
      body: JSON.stringify(toApiPayload(data)),
    });
    await refresh();
    return getPaymentById(result.id);
  }

  async function updatePayment(id, data) {
    await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toApiPayload(data)),
    });
    await refresh();
    return getPaymentById(id);
  }

  async function deletePayment(id) {
    await request(`/${id}`, { method: 'DELETE' });
    await refresh();
    return cache;
  }

  function peso(n) {
    return `PHP ${Number(n).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function formatDeadline(iso) {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  global.SocietechPayments = {
    refresh,
    getPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
    peso,
    formatDeadline,
  };

  refresh();
})(window);
