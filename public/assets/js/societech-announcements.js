/**
 * Society-wide announcements backed by the CI4 API.
 */
(function (global) {
  // FIX: pathname.replace regex produced wrong URLs on nested routes like /student/class-roster.
  // Derive the app base from this script's own <script src> tag instead — always correct.
  function appBase() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].getAttribute('src') || '';
      if (src.includes('societech-announcements.js')) {
        return src.replace(/\/assets\/js\/societech-announcements\.js.*$/, '');
      }
    }
    if (window.location.pathname.includes('/public/')) {
      return `${window.location.origin}${window.location.pathname.replace(/\/public\/.*$/, '/public')}`;
    }
    return window.location.origin;
  }
  const apiUrl = `${appBase()}/api/announcements`;
  let cache = [];

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function toViewModel(row) {
    return {
      id: Number(row.id),
      title: row.title || '',
      body: row.body || '',
      author: row.author || row.posted_by_name || '',
      postedAt: String(row.posted_at || row.created_at || '').slice(0, 10),
      endsAt: row.ends_at ? String(row.ends_at).slice(0, 10) : '',
      active: Number(row.is_active ?? 1) === 1,
      audience: row.audience || 'all',
    };
  }

  function toApiPayload(data) {
    return {
      title: String(data.title || '').trim(),
      body: String(data.body || '').trim(),
      audience: data.audience || 'all',
      ends_at: data.endsAt || data.ends_at || null,
      is_active: data.active === false ? 0 : 1,
    };
  }

  async function request(path = '', options = {}) {
    const response = await fetch(`${apiUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Announcements API failed with ${response.status}`);
    }

    return response.status === 204 ? {} : response.json();
  }

  async function refresh() {
    try {
      const result = await request();
      cache = (result.data || []).map(toViewModel);
      global.dispatchEvent(new CustomEvent('societech-announcements-changed'));
    } catch {
      cache = [];
    }

    return cache;
  }

  function isOngoing(entry) {
    if (!entry || entry.active === false) return false;
    const today = todayIso();
    if (entry.endsAt && entry.endsAt < today) return false;
    return true;
  }

  function getAllAnnouncements() {
    return [...cache].sort((a, b) => (b.postedAt || '').localeCompare(a.postedAt || ''));
  }

  function getOngoingAnnouncements() {
    return getAllAnnouncements().filter(isOngoing);
  }

  function getOngoingCount() {
    return getOngoingAnnouncements().length;
  }

  function getById(id) {
    return getAllAnnouncements().find((announcement) => String(announcement.id) === String(id)) || null;
  }

  async function addAnnouncement(data) {
    const result = await request('', {
      method: 'POST',
      body: JSON.stringify(toApiPayload(data)),
    });
    await refresh();
    return getById(result.id);
  }

  async function updateAnnouncement(id, data) {
    await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toApiPayload(data)),
    });
    await refresh();
    return getById(id);
  }

  async function deleteAnnouncement(id) {
    await request(`/${id}`, { method: 'DELETE' });
    await refresh();
    return cache;
  }

  function formatPostedDate(iso) {
    if (!iso) return '';
    const date = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatEndLabel(iso) {
    if (!iso) return 'No end date';
    return `Until ${formatPostedDate(iso)}`;
  }

  global.SocietechAnnouncements = {
    refresh,
    getAllAnnouncements,
    getOngoingAnnouncements,
    getOngoingCount,
    getById,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    isOngoing,
    formatPostedDate,
    formatEndLabel,
    todayIso,
  };

  refresh();
})(window);