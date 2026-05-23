/**
 * Societech treasurer — all classes grid (all sections).
 */
(function () {
  function createInfoRow(label, value, valueClass) {
    const row = document.createElement('div');
    row.className = 'stClassInfo';
    const span = document.createElement('span');
    span.textContent = label;
    const strong = document.createElement('strong');
    if (valueClass) strong.className = valueClass;
    strong.textContent = value;
    row.appendChild(span);
    row.appendChild(strong);
    return row;
  }

  function renderCard(section) {
    const link = document.createElement('a');
    link.href = `${window.location.origin}${window.location.pathname.replace(/\/student\/.*$/, '/student/societech-section-roster')}?class=${section.classKey}`;
    link.className = 'stClassCardLink';

    const card = document.createElement('div');
    card.className = 'stClassCard';

    const name = document.createElement('div');
    name.className = 'stClassName';
    name.textContent = section.label;

    card.appendChild(name);
    card.appendChild(createInfoRow('Students: ', String(section.students)));
    card.appendChild(createInfoRow('Collections: ', window.ClassRosters.peso(section.collections), 'textSuccess'));
    card.appendChild(createInfoRow('Balance: ', window.ClassRosters.peso(section.balance), 'textPrimary'));
    card.appendChild(createInfoRow('Treasurer: ', section.treasurer));

    link.appendChild(card);
    return link;
  }

  function initAllClasses() {
    if (!window.StudentSession?.requireSocietechTreasurer()) return;

    const grid = document.getElementById('classesGrid');
    if (!grid) return;

    const sections = window.ClassRosters.getAllSections();
    grid.textContent = '';
    sections.forEach((s) => grid.appendChild(renderCard(s)));

    const searchInput = document.getElementById('classSearch');
    const yearFilter = document.getElementById('yearFilter');
    const sectionFilter = document.getElementById('sectionFilter');

    function applyFilters() {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const year = yearFilter?.value || 'all';
      const section = sectionFilter?.value || 'all';

      grid.querySelectorAll('.stClassCardLink').forEach((card) => {
        const name = card.querySelector('.stClassName')?.textContent || '';
        const matchSearch = !q || name.toLowerCase().includes(q);
        const matchYear = year === 'all' || name.includes(year.replace('BSIT ', ''));
        const matchSection = section === 'all' || name.endsWith(section);
        card.style.display = matchSearch && matchYear && matchSection ? '' : 'none';
      });
    }

    searchInput?.addEventListener('input', applyFilters);
    yearFilter?.addEventListener('change', applyFilters);
    sectionFilter?.addEventListener('change', applyFilters);

    window.StudentSession.applyProfileToPage();
    document.title = 'All Classes • Societech Treasurer';
  }

  // Wait for BOTH session (auth/me) AND rosters (api/sections) before running.
  let sessionReady = false;
  let rostersReady = false;

  function tryInit() {
    if (sessionReady && rostersReady) initAllClasses();
  }

  window.addEventListener('societech-session-ready', function () { sessionReady = true; tryInit(); });
  window.addEventListener('societech-rosters-changed', function () { rostersReady = true; tryInit(); });
})();