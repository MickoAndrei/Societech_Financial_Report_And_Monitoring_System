/**
 * Societech treasurer dashboard and shared helpers.
 */
(function (global) {
  function guard() {
    return window.StudentSession?.requireSocietechTreasurer() === true;
  }

  function initDashboard() {
    if (!guard()) return;

    const sections = window.ClassRosters?.getAllSections() || [];
    const payments = window.SocietechPayments?.getPayments() || [];

    let totalStudents = 0;
    let totalCollections = 0;
    let totalBalance = 0;
    sections.forEach((s) => {
      totalStudents += s.students;
      totalCollections += s.collections;
      totalBalance += s.balance;
    });

    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    set('statSections', String(sections.length));
    set('statStudents', String(totalStudents));
    set('statCollections', window.ClassRosters.peso(totalCollections));
    set('statBalance', window.ClassRosters.peso(totalBalance));
    set('statPayments', String(payments.length));

    const tbody = document.querySelector('#recentPaymentsTable tbody');
    if (tbody) {
      tbody.textContent = '';
      payments.slice(0, 5).forEach((p) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.name}</td>
          <td>${window.SocietechPayments.peso(p.amount)}</td>
          <td>${window.SocietechPayments.formatDeadline(p.deadline)}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    const sectionsList = document.getElementById('sectionsQuickList');
    if (sectionsList) {
      sectionsList.textContent = '';
      sections.slice(0, 4).forEach((s) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${window.location.origin}${window.location.pathname.replace(/\/student\/.*$/, '/student/societech-section-roster')}?class=${s.classKey}`;
        a.textContent = `${s.label} — ${s.students} students`;
        li.appendChild(a);
        sectionsList.appendChild(li);
      });
    }

    window.StudentSession.applyProfileToPage();
    document.title = 'Societech Treasurer Dashboard • Societech Student';
  }

  // FIX: also init when session loads asynchronously (the fetch('/auth/me') in
  // student-session.js completes after DOMContentLoaded, so the guard was always
  // seeing role='guest' and redirecting to /student).
  window.addEventListener('societech-session-ready', function () {
    // Only run if we haven't already successfully initialised
    if (!document.getElementById('statSections')?.textContent) {
      initDashboard();
    }
  });

  global.SocietechTreasurer = { guard, initDashboard };
})(window);