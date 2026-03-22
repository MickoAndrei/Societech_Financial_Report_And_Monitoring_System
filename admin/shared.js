function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.classList.toggle('show');
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu'); 
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (event) => {
  const profile = document.querySelector('.profile');
  const menu = document.getElementById('profileMenu');
  if (profile && menu && !profile.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = 'none';
  }
});

window.logout = function() {
  // Simple logout - redirect to login page
  window.location.href = '../auth/login.html';
};

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('notificationDropdown');
  const notifBtn = document.querySelector('.notification-btn');
  if (!notifBtn || !dropdown) return;
  if (!notifBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});