/**
 * Student session: role and section scope.
 */
(function (global) {
  let cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };
  let sessionLoaded = false; // FIX: guard against redirecting before auth/me has returned

  function normalizeClassKey(raw) {
    if (!raw || typeof raw !== 'string') return '';
    return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function formatClassLabel(key) {
    if (!key) return 'Section';
    const match = key.match(/^([A-Z]+)(\d+)([A-Z])$/i);
    if (match) return `${match[1].toUpperCase()} ${match[2]}${match[3].toUpperCase()}`;
    return key;
  }

  function normalizeRole(role) {
    return role || 'student';
  }

  function inferClassKeyFromProgram(program) {
    if (!program) return '';
    const match = program.match(/([A-Za-z]+\s*\d+\s*[A-Za-z])/);
    return normalizeClassKey(match ? match[1] : program);
  }

  function normalizeSession(session) {
    return {
      role: normalizeRole(session.role),
      classKey: normalizeClassKey(session.class_key || session.classKey || ''),
      fullName: session.fullName || session.name || '',
      email: session.email || '',
      id: session.id || null,
      organizationId: session.organization_id || session.organizationId || null,
    };
  }

  function appBase() {
    if (global.location.pathname.includes('/public/')) {
      return `${global.location.origin}${global.location.pathname.replace(/\/public\/.*$/, '/public')}`;
    }

    const marker = '/Societech_Financial_Report_And_Monitoring';
    if (global.location.pathname.includes(marker)) {
      return `${global.location.origin}${marker}/public`;
    }

    return global.location.origin;
  }

  async function refresh() {
    try {
      const response = await fetch(`${appBase()}/auth/me`);
      if (!response.ok) throw new Error('Session unavailable');
      cachedSession = normalizeSession(await response.json());
    } catch {
      cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };
    }

    sessionLoaded = true; // FIX: mark session as loaded before firing the event
    applyProfileToPage();
    global.dispatchEvent(new CustomEvent('societech-session-ready', { detail: cachedSession }));
    return cachedSession;
  }

  function getStudentSession() {
    return cachedSession;
  }

  function setStudentSession(session) {
    cachedSession = normalizeSession(session);
    return cachedSession;
  }

  function clearStudentSession() {
    cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };
  }

  function isClassroomTreasurer() {
    return getStudentSession().role === 'classTreasurer';
  }

  function isSocietechTreasurer() {
    return getStudentSession().role === 'societechTreasurer';
  }

  function isAnyTreasurer() {
    const role = getStudentSession().role;
    return role === 'classTreasurer' || role === 'societechTreasurer';
  }

  function getTreasurerClassKey() {
    if (!isClassroomTreasurer()) return '';
    return getStudentSession().classKey || '';
  }

  function getTreasurerClassLabel() {
    return formatClassLabel(getTreasurerClassKey());
  }

  function requireClassTreasurer(redirectTo) {
    if (!sessionLoaded) return false; // FIX: session still loading, don't redirect yet
    if (!isClassroomTreasurer()) {
      window.location.replace(redirectTo || `${appBase()}/student`);
      return false;
    }
    return true;
  }

  function requireSocietechTreasurer(redirectTo) {
    if (!sessionLoaded) return false; // FIX: session still loading, don't redirect yet
    if (!isSocietechTreasurer()) {
      window.location.replace(redirectTo || `${appBase()}/student`);
      return false;
    }
    return true;
  }

  function appBase() {
    if (window.location.pathname.includes('/public/')) {
      return `${window.location.origin}${window.location.pathname.replace(/\/public\/.*$/, '/public')}`;
    }

    const marker = '/Societech_Financial_Report_And_Monitoring';
    if (window.location.pathname.includes(marker)) {
      return `${window.location.origin}${marker}/public`;
    }

    return window.location.origin;
  }

  function applyProfileToPage() {
    const session = getStudentSession();
    const profileName = document.querySelector('.profileName');
    const profileRole = document.querySelector('.profileRole');
    const profileImg = document.querySelector('.profileImg');

    if (profileName) {
      profileName.textContent = session.fullName || '';
    }

    if (profileRole) {
      if (isSocietechTreasurer()) {
        profileRole.textContent = 'Societech Treasurer';
      } else if (isClassroomTreasurer()) {
        profileRole.textContent = `${formatClassLabel(session.classKey)} - Class Treasurer`;
      } else {
        profileRole.textContent = formatClassLabel(session.classKey);
      }
    }

    if (profileImg && session.fullName) {
      const parts = session.fullName.trim().split(/\s+/);
      const initials = parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : session.fullName.slice(0, 2).toUpperCase();
      if (!profileImg.querySelector('img')) {
        profileImg.textContent = initials;
      }
    }
  }

  global.StudentSession = {
    refresh,
    getStudentSession,
    setStudentSession,
    clearStudentSession,
    isClassroomTreasurer,
    isSocietechTreasurer,
    isAnyTreasurer,
    getTreasurerClassKey,
    getTreasurerClassLabel,
    requireClassTreasurer,
    requireSocietechTreasurer,
    applyProfileToPage,
    inferClassKeyFromProgram,
    normalizeClassKey,
    formatClassLabel,
    normalizeRole,
  };

  refresh();
})(window);