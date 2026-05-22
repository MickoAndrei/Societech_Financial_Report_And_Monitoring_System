/**
 * Public homepage — latest ongoing announcements list.
 */
(function () {
  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function render() {
    const announcementsService = window.SocietechAnnouncements;
    const root = document.getElementById('publicAnnouncementsList');
    if (!announcementsService || !root) return;

    const items = announcementsService.getOngoingAnnouncements().slice(0, 5);
    if (!items.length) {
      root.innerHTML =
        '<div class="announcementItem"><p style="color: var(--gray-600);">No ongoing announcements at this time.</p></div>';
      return;
    }

    root.innerHTML = items
      .map(
        (a) =>
          `<div class="announcementItem">` +
          `<h4 style="margin-bottom: 0.5rem; color: var(--primary-color);">${escapeHtml(a.title)}</h4>` +
          `<p style="color: var(--gray-600);">${escapeHtml(a.body)}</p>` +
          `<small style="color: var(--gray-500);">Posted ${escapeHtml(
            announcementsService.formatPostedDate(a.postedAt),
          )}</small>` +
          `</div>`,
      )
      .join('');
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('societech-announcements-changed', render);
})();
