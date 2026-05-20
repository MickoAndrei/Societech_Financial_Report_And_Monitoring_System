/**
 * Society-wide announcements (admin-posted). Persisted in localStorage.
 */
(function (global) {
  const STORAGE_KEY = 'societechAnnouncements';

  const DEFAULT_ANNOUNCEMENTS = [
    {
      id: 'ann-summit',
      title: 'Upcoming Organization Event',
      body:
        'Join us for the annual SOCIETECH Summit on March 25, 2026. All students are required to attend. Class treasurers should prepare their financial reports for presentation.',
      author: 'Admin User',
      postedAt: '2026-03-09',
      endsAt: '2026-03-26',
      active: true,
    },
    {
      id: 'ann-fees',
      title: 'Fee Payment Deadline Extension',
      body:
        'The deadline for March class fee payments has been extended to March 15, 2026. Please ensure all collections are submitted on time.',
      author: 'Admin User',
      postedAt: '2026-03-07',
      endsAt: '2026-03-16',
      active: true,
    },
    {
      id: 'ann-training',
      title: 'New Treasurer Training Session',
      body:
        'A training session for all class treasurers will be held on March 12, 2026 at 2:00 PM in the AVR. Topics include proper record keeping and submission procedures.',
      author: 'Admin User',
      postedAt: '2026-03-05',
      endsAt: '2026-03-13',
      active: true,
    },
  ];

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {
      /* use defaults */
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    return DEFAULT_ANNOUNCEMENTS.slice();
  }

  function saveAll(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    global.dispatchEvent(new CustomEvent('societech-announcements-changed'));
    return list;
  }

  function isOngoing(entry) {
    if (!entry || entry.active === false) return false;
    const today = todayIso();
    if (entry.endsAt && entry.endsAt < today) return false;
    return true;
  }

  function getAllAnnouncements() {
    return loadAll().sort((a, b) => (b.postedAt || '').localeCompare(a.postedAt || ''));
  }

  function getOngoingAnnouncements() {
    return getAllAnnouncements().filter(isOngoing);
  }

  function getOngoingCount() {
    return getOngoingAnnouncements().length;
  }

  function getById(id) {
    return getAllAnnouncements().find((a) => a.id === id) || null;
  }

  function generateId() {
    return `ann-${Date.now().toString(36)}`;
  }

  function addAnnouncement(data) {
    const list = loadAll();
    const entry = {
      id: generateId(),
      title: String(data.title || '').trim(),
      body: String(data.body || '').trim(),
      author: String(data.author || 'Administrator').trim(),
      postedAt: data.postedAt || todayIso(),
      endsAt: data.endsAt || '',
      active: data.active !== false,
    };
    list.unshift(entry);
    saveAll(list);
    return entry;
  }

  function updateAnnouncement(id, data) {
    const list = loadAll();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    list[idx] = {
      ...list[idx],
      title: String(data.title ?? list[idx].title).trim(),
      body: String(data.body ?? list[idx].body).trim(),
      author: String(data.author ?? list[idx].author).trim(),
      postedAt: data.postedAt ?? list[idx].postedAt,
      endsAt: data.endsAt !== undefined ? data.endsAt : list[idx].endsAt,
      active: data.active !== undefined ? data.active : list[idx].active,
    };
    saveAll(list);
    return list[idx];
  }

  function deleteAnnouncement(id) {
    const list = loadAll().filter((a) => a.id !== id);
    saveAll(list);
    return list;
  }

  function formatPostedDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatEndLabel(iso) {
    if (!iso) return 'No end date';
    return `Until ${formatPostedDate(iso)}`;
  }

  global.SocietechAnnouncements = {
    STORAGE_KEY,
    DEFAULT_ANNOUNCEMENTS,
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
})(window);
