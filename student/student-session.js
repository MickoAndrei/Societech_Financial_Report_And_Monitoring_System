/**
 * Student session: role and section scope (class vs Societech treasurer).
 */
(function (global) {
  const SESSION_KEY = 'studentSession';
  const DEMO_CLASS_TREASURER_EMAILS = ['alyssa.cruz.bsit1a@societech.demo'];
  const DEMO_SOCIETECH_TREASURER_EMAILS = ['societech.treasurer@societech.demo'];

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

  function normalizeRole(role) {
    if (role === 'treasurer') return 'class_treasurer';
    return role || 'student';
  }

  function inferClassKeyFromProgram(program) {
    if (!program) return 'BSIT1A';
    const match = program.match(/([A-Za-z]+\s*\d+\s*[A-Za-z])/);
    return normalizeClassKey(match ? match[1] : program) || 'BSIT1A';
  }

  function readPersonalInfo() {
    try {
      return JSON.parse(localStorage.getItem('studentPersonalInfo') || '{}');
    } catch {
      return {};
    }
  }

  function buildDefaultSession() {
    const info = readPersonalInfo();
    const email = (info.email || 'alyssa.cruz.bsit1a@societech.demo').toLowerCase();
    const classKey = inferClassKeyFromProgram(info.program || 'BSIT 1A');

    if (DEMO_SOCIETECH_TREASURER_EMAILS.includes(email)) {
      return {
        role: 'societech_treasurer',
        classKey: classKey || 'BSIT2A',
        fullName: info.fullName || 'Mark Santos',
        email,
      };
    }

    if (DEMO_CLASS_TREASURER_EMAILS.includes(email)) {
      return {
        role: 'class_treasurer',
        classKey: classKey || 'BSIT1A',
        fullName: info.fullName || 'Alyssa Cruz',
        email,
      };
    }

    return {
      role: 'student',
      classKey,
      fullName: info.fullName || 'Student',
      email,
    };
  }

  function getStudentSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.role = normalizeRole(parsed.role);
        if (parsed.classKey) {
          parsed.classKey = normalizeClassKey(parsed.classKey);
        }
        return parsed;
      }
    } catch {
      /* fall through */
    }
    const session = buildDefaultSession();
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function setStudentSession(session) {
    const next = {
      ...session,
      role: normalizeRole(session.role),
      classKey: normalizeClassKey(session.classKey || ''),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    return next;
  }

  function clearStudentSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isClassroomTreasurer() {
    return getStudentSession().role === 'class_treasurer';
  }

  function isSocietechTreasurer() {
    return getStudentSession().role === 'societech_treasurer';
  }

  function isAnyTreasurer() {
    const role = getStudentSession().role;
    return role === 'class_treasurer' || role === 'societech_treasurer';
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
      window.location.replace(redirectTo || 'index.html');
      return false;
    }
    return true;
  }

  function requireSocietechTreasurer(redirectTo) {
    if (!isSocietechTreasurer()) {
      window.location.replace(redirectTo || 'index.html');
      return false;
    }
    return true;
  }

  function applyProfileToPage() {
    const session = getStudentSession();
    const profileName = document.querySelector('.profile-name');
    const profileRole = document.querySelector('.profile-role');
    const profileImg = document.querySelector('.profile-img');

    if (profileName && session.fullName) {
      profileName.textContent = session.fullName;
    }

    if (profileRole) {
      if (isSocietechTreasurer()) {
        profileRole.textContent = 'Societech Treasurer';
      } else if (isClassroomTreasurer()) {
        profileRole.textContent = `${formatClassLabel(session.classKey)} · Class Treasurer`;
      } else {
        profileRole.textContent = `${formatClassLabel(session.classKey)} · Societech`;
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
})(window);
