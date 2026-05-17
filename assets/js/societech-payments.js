/**
 * Societech-wide payment assessments (membership, IT Panagmaya, etc.).
 * Persisted in localStorage for the prototype.
 */
(function (global) {
  const STORAGE_KEY = 'societechPayments';

  const DEFAULT_PAYMENTS = [
    {
      id: 'pay-membership',
      name: 'Societech Membership Fee',
      amount: 80,
      deadline: '2026-03-28',
      description: 'Required for all BSIT members each semester.',
    },
    {
      id: 'pay-panagmaya',
      name: 'IT Days / Panagmaya',
      amount: 280,
      deadline: '2026-04-05',
      description: 'IT Days event contribution (Panagmaya).',
    },
    {
      id: 'pay-shirt',
      name: 'Society Shirt',
      amount: 150,
      deadline: '2026-04-20',
      description: 'Official Societech shirt order.',
    },
    {
      id: 'pay-dues',
      name: 'Daily Dues (semester)',
      amount: 400,
      deadline: '2026-04-15',
      description: 'Semester daily dues balance.',
    },
    {
      id: 'pay-community',
      name: 'Community Project Share',
      amount: 120,
      deadline: '2026-05-01',
      description: 'Class community project fund share.',
    },
  ];

  function loadPayments() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {
      /* use defaults */
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PAYMENTS));
    return DEFAULT_PAYMENTS.slice();
  }

  function savePayments(payments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    return payments;
  }

  function getPayments() {
    return loadPayments();
  }

  function getPaymentById(id) {
    return getPayments().find((p) => p.id === id) || null;
  }

  function generateId() {
    return `pay-${Date.now().toString(36)}`;
  }

  function addPayment(data) {
    const payments = getPayments();
    const entry = {
      id: generateId(),
      name: String(data.name || '').trim(),
      amount: Number(data.amount) || 0,
      deadline: data.deadline || '',
      description: String(data.description || '').trim(),
    };
    payments.push(entry);
    savePayments(payments);
    return entry;
  }

  function updatePayment(id, data) {
    const payments = getPayments();
    const idx = payments.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    payments[idx] = {
      ...payments[idx],
      name: String(data.name ?? payments[idx].name).trim(),
      amount: Number(data.amount ?? payments[idx].amount),
      deadline: data.deadline ?? payments[idx].deadline,
      description: String(data.description ?? payments[idx].description).trim(),
    };
    savePayments(payments);
    return payments[idx];
  }

  function deletePayment(id) {
    const payments = getPayments().filter((p) => p.id !== id);
    savePayments(payments);
    return payments;
  }

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function formatDeadline(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  global.SocietechPayments = {
    getPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
    peso,
    formatDeadline,
    DEFAULT_PAYMENTS,
  };
})(window);
