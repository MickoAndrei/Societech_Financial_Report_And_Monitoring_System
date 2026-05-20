/**
 * Admin — create, edit, and delete society-wide announcements.
 */
(function () {
  let editingId = null;

  function $(id) {
    return document.getElementById(id);
  }

  function showForm(show) {
    const card = $('announcementComposeCard');
    if (card) card.hidden = !show;
    if (show) $('announcementTitle')?.focus();
  }

  function resetForm() {
    editingId = null;
    const titleEl = $('announcementFormTitle');
    if (titleEl) titleEl.textContent = 'New announcement';
    $('announcementTitle').value = '';
    $('announcementBody').value = '';
    $('announcementAuthor').value = 'Moderator Admin';
    $('announcementPosted').value = window.SocietechAnnouncements.todayIso();
    $('announcementEnds').value = '';
    $('announcementActive').checked = true;
    $('cancelComposeBtn').hidden = true;
  }

  function fillForm(entry) {
    editingId = entry.id;
    $('announcementFormTitle').textContent = 'Edit announcement';
    $('announcementTitle').value = entry.title;
    $('announcementBody').value = entry.body;
    $('announcementAuthor').value = entry.author;
    $('announcementPosted').value = entry.postedAt || '';
    $('announcementEnds').value = entry.endsAt || '';
    $('announcementActive').checked = entry.active !== false;
    $('cancelComposeBtn').hidden = false;
    showForm(true);
  }

  function statusPill(entry) {
    const SA = window.SocietechAnnouncements;
    if (entry.active === false) {
      return '<span class="announcement-status-pill inactive">Inactive</span>';
    }
    if (SA.isOngoing(entry)) {
      return '<span class="announcement-status-pill ongoing">Ongoing</span>';
    }
    return '<span class="announcement-status-pill ended">Ended</span>';
  }

  function renderList() {
    const list = $('announcementList');
    if (!list) return;
    const SA = window.SocietechAnnouncements;
    const items = SA.getAllAnnouncements();
    list.innerHTML = '';

    if (!items.length) {
      list.innerHTML =
        '<p style="padding:24px;color:#6b7280;text-align:center;">No announcements yet. Use <strong>Post New Announcement</strong> to publish one.</p>';
      return;
    }

    items.forEach((entry) => {
      const div = document.createElement('div');
      div.className = 'announcement-entry';
      div.innerHTML =
        `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px;">` +
        `<h3 style="margin:0;">${escapeHtml(entry.title)}</h3>` +
        statusPill(entry) +
        `</div>` +
        `<div class="announcement-entry-meta">` +
        `<span>Posted: ${escapeHtml(SA.formatPostedDate(entry.postedAt))}</span>` +
        `<span>•</span>` +
        `<span>By: ${escapeHtml(entry.author)}</span>` +
        `<span>•</span>` +
        `<span>${escapeHtml(SA.formatEndLabel(entry.endsAt))}</span>` +
        `</div>` +
        `<p class="announcement-entry-body">${escapeHtml(entry.body)}</p>` +
        `<div class="announcement-entry-actions">` +
        `<button type="button" class="btn btn-secondary btn-sm" data-edit="${entry.id}">Edit</button>` +
        `<button type="button" class="btn btn-danger btn-sm" data-delete="${entry.id}">Delete</button>` +
        `</div>`;
      list.appendChild(div);
    });

    list.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const entry = SA.getById(btn.getAttribute('data-edit'));
        if (entry) fillForm(entry);
      });
    });

    list.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete');
        const entry = SA.getById(id);
        if (entry && confirm(`Delete "${entry.title}"?`)) {
          SA.deleteAnnouncement(id);
          renderList();
          if (editingId === id) {
            resetForm();
            showForm(false);
          }
        }
      });
    });
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function saveAnnouncement(event) {
    event.preventDefault();
    const title = $('announcementTitle').value.trim();
    const body = $('announcementBody').value.trim();
    const author = $('announcementAuthor').value.trim() || 'Administrator';
    const postedAt = $('announcementPosted').value;
    const endsAt = $('announcementEnds').value;
    const active = $('announcementActive').checked;

    if (!title || !body) {
      alert('Please enter a title and message.');
      return;
    }

    const data = { title, body, author, postedAt, endsAt, active };
    if (editingId) {
      window.SocietechAnnouncements.updateAnnouncement(editingId, data);
    } else {
      window.SocietechAnnouncements.addAnnouncement(data);
    }

    resetForm();
    showForm(false);
    renderList();
  }

  function init() {
    if (!window.SocietechAnnouncements) return;

    $('showComposeBtn')?.addEventListener('click', () => {
      resetForm();
      showForm(true);
    });
    $('cancelComposeBtn')?.addEventListener('click', () => {
      resetForm();
      showForm(false);
    });
    $('announcementForm')?.addEventListener('submit', saveAnnouncement);

    resetForm();
    showForm(false);
    renderList();
    window.addEventListener('societech-announcements-changed', renderList);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
