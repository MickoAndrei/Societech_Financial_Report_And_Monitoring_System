function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.classList.toggle('show');
}

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('notificationDropdown');
  const notifBtn = document.querySelector('.notification-btn');
  if (!notifBtn || !dropdown) return;
  if (!notifBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});