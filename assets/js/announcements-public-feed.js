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
    const SA = window.SocietechAnnouncements;
    const root = document.getElementById('publicAnnouncementsList');
    if (!SA || !root) return;

    const items = SA.getOngoingAnnouncements().slice(0, 5);
    if (!items.length) {
      root.innerHTML =
        '<div class="announcement-item"><p style="color: var(--gray-600);">No ongoing announcements at this time.</p></div>';
      return;
    }

    root.innerHTML = items
      .map(
        (a) =>
          `<div class="announcement-item">` +
          `<h4 style="margin-bottom: 0.5rem; color: var(--primary-color);">${escapeHtml(a.title)}</h4>` +
          `<p style="color: var(--gray-600);">${escapeHtml(a.body)}</p>` +
          `<small style="color: var(--gray-500);">Posted ${escapeHtml(
            SA.formatPostedDate(a.postedAt),
          )}</small>` +
          `</div>`,
      )
      .join('');
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('societech-announcements-changed', render);
})();
