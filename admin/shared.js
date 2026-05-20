function toggleNotifications() {
  if (window.AnnouncementBell) {
    const btn = document.querySelector('.notification-btn');
    if (btn) {
      btn.click();
      return;
    }
  }
  const dropdown = document.getElementById('notificationDropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

window.logout = function () {
  window.location.href = '../auth/admin-login.html';
};

// Single unified click-outside handler for both profile menu and notification dropdown
document.addEventListener('click', function (event) {
  const profile = document.querySelector('.profile-wrapper');
  const menu = document.getElementById('profileMenu');
  if (profile && menu && !profile.contains(event.target)) {
    menu.style.display = 'none';
  }

  const notifWrap = document.querySelector('.notification-wrapper');
  const dropdown = document.getElementById('notificationDropdown');
  if (notifWrap && dropdown && !notifWrap.contains(event.target)) {
    dropdown.classList.remove('show');
    const btn = notifWrap.querySelector('.notification-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});