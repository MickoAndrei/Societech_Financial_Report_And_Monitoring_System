/**
 * Student session: role and section scope.
 */
(function (global) {
  let cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };

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
    if (role === 'treasurer') return 'classTreasurer';
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

  async function refresh() {
    try {
      // FIX: Use appBase() so the auth/me URL is always correct regardless of the
      // current page path. The old inline pathname regex produced a wrong URL on
      // some routes (e.g. /student/class-roster -> /student/auth/me instead of
      // /auth/me), which returned a redirect or 403 and triggered the forbidden popup.
      const response = await fetch(`${appBase()}/auth/me`);
      // FIX: Treat 401 silently - user is a guest, not an error.
      if (response.status === 401) {
        cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };
        global.dispatchEvent(new CustomEvent('societech-session-ready', { detail: cachedSession }));
        return cachedSession;
      }
      if (!response.ok) throw new Error('Session unavailable');
      cachedSession = normalizeSession(await response.json());
    } catch {
      cachedSession = { role: 'guest', classKey: '', fullName: '', email: '' };
    }

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
    if (!isClassroomTreasurer()) {
      window.location.replace(redirectTo || `${appBase()}/student`);
      return false;
    }
    return true;
  }

  function requireSocietechTreasurer(redirectTo) {
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

    const marker = '/Societech_Financial_And_Monitoring';
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

