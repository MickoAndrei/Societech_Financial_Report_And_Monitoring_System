/**
 * Shared section roster data (admin section pages + student treasurer roster).
 */
(function (global) {
  const CLASS_ROSTERS = {
    BSIT1A: [
      { name: 'Alyssa Cruz', id: '2024-001234', status: 'cleared' },
      { name: 'Mark Santos', id: '2024-001235', status: 'not-cleared' },
      { name: 'Kevin Dela Rosa', id: '2024-001236', status: 'cleared' },
      { name: 'Janelle Reyes', id: '2024-001237', status: 'cleared' },
      { name: 'Paolo Lim', id: '2024-001238', status: 'not-cleared' },
    ],
    BSIT1B: [
      { name: 'Bianca Flores', id: '2024-002101', status: 'cleared' },
      { name: 'Carlos Mendoza', id: '2024-002102', status: 'not-cleared' },
      { name: 'Denise Ramos', id: '2024-002103', status: 'cleared' },
      { name: 'Ethan Navarro', id: '2024-002104', status: 'cleared' },
    ],
    BSIT2A: [
      { name: 'Felix Torres', id: '2023-003201', status: 'not-cleared' },
      { name: 'Gabby Lim', id: '2023-003202', status: 'cleared' },
      { name: 'Hannah Cruz', id: '2023-003203', status: 'cleared' },
      { name: 'Ivan Reyes', id: '2023-003204', status: 'cleared' },
      { name: 'Jen Navarro', id: '2023-003205', status: 'not-cleared' },
    ],
    BSIT2B: [
      { name: 'Kyle Santos', id: '2023-004301', status: 'cleared' },
      { name: 'Lara Tan', id: '2023-004302', status: 'cleared' },
      { name: 'Miguel Ang', id: '2023-004303', status: 'not-cleared' },
    ],
    BSIT3A: [
      { name: 'Nina Lopez', id: '2022-005401', status: 'cleared' },
      { name: 'Oscar Diaz', id: '2022-005402', status: 'not-cleared' },
      { name: 'Patty Go', id: '2022-005403', status: 'cleared' },
      { name: 'Quincy Bautista', id: '2022-005404', status: 'cleared' },
    ],
    BSIT3B: [
      { name: 'Ria Fernandez', id: '2022-006501', status: 'cleared' },
      { name: 'Sam Villa', id: '2022-006502', status: 'not-cleared' },
      { name: 'Tina Ocampo', id: '2022-006503', status: 'cleared' },
    ],
  };

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

  function getRosterForClass(classKey) {
    const key = normalizeClassKey(classKey);
    return CLASS_ROSTERS[key] || [];
  }

  const SECTION_SUMMARIES = {
    BSIT1A: { students: 42, collections: 12600, balance: 9800, treasurer: 'Alyssa Cruz' },
    BSIT1B: { students: 38, collections: 11400, balance: 8900, treasurer: 'Mark Santos' },
    BSIT2A: { students: 40, collections: 14200, balance: 10500, treasurer: 'Kevin Dela Rosa' },
    BSIT2B: { students: 36, collections: 13000, balance: 9600, treasurer: 'Janelle Reyes' },
    BSIT3A: { students: 41, collections: 15500, balance: 12200, treasurer: 'Paolo Lim' },
    BSIT3B: { students: 35, collections: 10800, balance: 8100, treasurer: 'Sofia Tan' },
  };

  function getAllSectionKeys() {
    return Object.keys(CLASS_ROSTERS);
  }

  function getSectionSummary(classKey) {
    const key = normalizeClassKey(classKey);
    const roster = CLASS_ROSTERS[key] || [];
    const summary = SECTION_SUMMARIES[key] || {};
    return {
      classKey: key,
      label: formatClassLabel(key),
      students: summary.students ?? roster.length,
      collections: summary.collections ?? 0,
      balance: summary.balance ?? 0,
      treasurer: summary.treasurer ?? '—',
      rosterCount: roster.length,
    };
  }

  function getAllSections() {
    return getAllSectionKeys().map((key) => getSectionSummary(key));
  }

  function peso(n) {
    return `₱${Number(n).toLocaleString('en-PH')}`;
  }

  global.ClassRosters = {
    CLASS_ROSTERS,
    SECTION_SUMMARIES,
    normalizeClassKey,
    formatClassLabel,
    getRosterForClass,
    getAllSectionKeys,
    getSectionSummary,
    getAllSections,
    peso,
  };
})(window);
