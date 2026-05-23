/**
 * Shared section roster access backed by the CI4 API.
 */
(function (global) {
  // FIX: pathname.replace regex produced wrong URLs on nested routes like /student/class-roster.
  function appBase() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].getAttribute('src') || '';
      if (src.includes('class-rosters.js')) {
        return src.replace(/\/assets\/js\/class-rosters\.js.*$/, '');
      }
    }
    if (window.location.pathname.includes('/public/')) {
      return `${window.location.origin}${window.location.pathname.replace(/\/public\/.*$/, '/public')}`;
    }
    return window.location.origin;
  }
  const apiUrl = `${appBase()}/api/sections`;
  let sections = [];
  const rosters = {};

  function normalizeClassKey(raw) {
    if (!raw || typeof raw !== 'string') return '';
    return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function sectionKey(section) {
    return normalizeClassKey(`${section.program || ''}${section.year_level || ''}${section.section_name || ''}`);
  }

  function formatClassLabel(key) {
    if (!key) return 'Section';
    const match = key.match(/^([A-Z]+)(\d+)([A-Z])$/i);
    if (match) return `${match[1].toUpperCase()} ${match[2]}${match[3].toUpperCase()}`;
    return key;
  }

  async function request(path = '') {
    const response = await fetch(`${apiUrl}${path}`);
    if (!response.ok) throw new Error(`Sections API failed with ${response.status}`);
    return response.json();
  }

  function toSectionSummary(section) {
    const key = sectionKey(section);
    const roster = rosters[key] || [];

    return {
      id: Number(section.id),
      classKey: key,
      label: formatClassLabel(key),
      students: roster.length,
      collections: Number(section.collections || 0),
      balance: Number(section.balance || 0),
      treasurer: [section.first_name, section.last_name].filter(Boolean).join(' '),
      rosterCount: roster.length,
      program: section.program || '',
      yearLevel: section.year_level || '',
      sectionName: section.section_name || '',
    };
  }

  async function refreshRosters() {
    await Promise.all(sections.map(async (section) => {
      const key = sectionKey(section);
      try {
        const result = await request(`/${section.id}/roster`);
        rosters[key] = (result.data || []).map((student) => ({
          id: Number(student.id),
          studentNumber: student.student_no || '',
          name: [student.first_name, student.last_name].filter(Boolean).join(' '),
          email: student.email || '',
          role: student.role || 'student',
        }));
      } catch {
        rosters[key] = [];
      }
    }));
  }

  async function refresh() {
    try {
      // notify listeners that rosters fetch is starting
      global.dispatchEvent(new CustomEvent('societech-rosters-loading'));
      const result = await request();
      sections = result.data || [];
      await refreshRosters();
      global.dispatchEvent(new CustomEvent('societech-rosters-changed'));
    } catch {
      sections = [];
      global.dispatchEvent(new CustomEvent('societech-rosters-changed'));
    }

    return getAllSections();
  }

  function getRosterForClass(classKey) {
    return rosters[normalizeClassKey(classKey)] || [];
  }

  function getAllSectionKeys() {
    return sections.map(sectionKey).filter(Boolean).sort();
  }

  function getSectionSummary(classKey) {
    const key = normalizeClassKey(classKey);
    const section = sections.find((item) => sectionKey(item) === key);

    if (!section) {
      const roster = getRosterForClass(key);
      return {
        classKey: key,
        label: formatClassLabel(key),
        students: roster.length,
        collections: 0,
        balance: 0,
        treasurer: '',
        rosterCount: roster.length,
      };
    }

    return toSectionSummary(section);
  }

  function getAllSections() {
    return sections.map(toSectionSummary);
  }

  function peso(n) {
    return `PHP ${Number(n).toLocaleString('en-PH')}`;
  }

  global.ClassRosters = {
    refresh,
    normalizeClassKey,
    formatClassLabel,
    getRosterForClass,
    getAllSectionKeys,
    getSectionSummary,
    getAllSections,
    peso,
  };

  refresh();
})(window);