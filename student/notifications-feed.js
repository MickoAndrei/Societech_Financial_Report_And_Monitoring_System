/**
 * Student notifications page — announcements section from shared store.
 */
(function () {
  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function renderAnnouncementsSection() {
    const SA = window.SocietechAnnouncements;
    if (!SA) return;

    const ongoing = SA.getOngoingAnnouncements();
    const countEl = document.getElementById('announcementStatCount');
    if (countEl) countEl.textContent = String(ongoing.length);

    const container = document.getElementById('announcementsFeed');
    if (!container) return;

    if (!ongoing.length) {
      container.innerHTML =
        '<div class="student-card"><p class="student-meta">No ongoing announcements from Societech admin right now.</p></div>';
      return;
    }

    container.innerHTML = ongoing
      .map(
        (a) =>
          `<div class="student-card announcement-feed-card">` +
          `<h4>${escapeHtml(a.title)}</h4>` +
          `<p class="student-meta" style="margin-bottom:8px;">Posted ${escapeHtml(
            SA.formatPostedDate(a.postedAt),
          )} · ${escapeHtml(SA.formatEndLabel(a.endsAt))}</p>` +
          `<p style="margin:0;color:#374151;line-height:1.6;white-space:pre-wrap;">${escapeHtml(a.body)}</p>` +
          `</div>`,
      )
      .join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAnnouncementsSection();
    window.addEventListener('societech-announcements-changed', renderAnnouncementsSection);
  });
})();
