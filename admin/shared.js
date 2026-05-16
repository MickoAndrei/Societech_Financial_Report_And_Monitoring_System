function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

window.logout = function () {
  window.location.href = '../auth/login.html';
};

// Single unified click-outside handler for both profile menu and notification dropdown
document.addEventListener('click', function (event) {
  const profile = document.querySelector('.profile-wrapper');
  const menu = document.getElementById('profileMenu');
  if (profile && menu && !profile.contains(event.target)) {
    menu.style.display = 'none';
  }

  const notifBtn = document.querySelector('.notification-btn');
  const dropdown = document.getElementById('notificationDropdown');
  if (notifBtn && dropdown && !notifBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});