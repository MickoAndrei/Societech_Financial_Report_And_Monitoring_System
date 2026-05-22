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
    const announcementsService = window.SocietechAnnouncements;
    const countEl = document.getElementById('announcementStatCount');
    const container = document.getElementById('announcementsFeed');
    if (!container) {
      return false;
    }

    if (!announcementsService) {
      if (countEl) countEl.textContent = '0';
      container.innerHTML =
        '<div class="studentCard"><p class="studentMeta">No data available. Announcements will appear here after records are fetched.</p></div>';
      return false;
    }

    const ongoing = announcementsService.getOngoingAnnouncements();
    if (countEl) countEl.textContent = String(ongoing.length);

    if (!ongoing.length) {
      container.innerHTML =
        '<div class="studentCard"><p class="studentMeta">No ongoing announcements from Societech admin right now.</p></div>';
      return true;
    }

    container.innerHTML = ongoing
      .map(
        (a) =>
          `<div class="studentCard announcementFeedCard">` +
          `<h4>${escapeHtml(a.title)}</h4>` +
          `<p class="studentMeta" style="margin-bottom:8px;">Posted ${escapeHtml(
            announcementsService.formatPostedDate(a.postedAt),
          )} · ${escapeHtml(announcementsService.formatEndLabel(a.endsAt))}</p>` +
          `<p style="margin:0;color:#374151;line-height:1.6;white-space:pre-wrap;">${escapeHtml(a.body)}</p>` +
          `</div>`,
      )
      .join('');
    return true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAnnouncementsSection();
    setTimeout(renderAnnouncementsSection, 100);
    window.addEventListener('societech-announcements-changed', renderAnnouncementsSection);
  });
})();
