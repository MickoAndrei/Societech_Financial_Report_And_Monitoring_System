(function () {
  const body = document.body;
  const page = body.getAttribute('data-page');
  const navLinks = document.querySelectorAll('.student-nav a');

  navLinks.forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });

  // Load profile image from localStorage
  loadProfileImage();

  // Profile menu toggle functionality
  window.toggleProfileMenu = function() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  // Close profile menu when clicking outside
  document.addEventListener('click', (event) => {
    const profile = document.querySelector('.profile');
    const menu = document.getElementById('profileMenu');
    if (profile && menu && !profile.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });

  // Logout function
  window.logout = function() {
    // Simple logout - redirect to login page
    window.location.href = '../auth/login.html';
  };

  // Load profile image from localStorage
  function loadProfileImage() {
    const profilePicture = localStorage.getItem('studentProfilePicture');
    if (profilePicture) {
      const profileImg = document.querySelector('.profile-img');
      if (profileImg) {
        profileImg.innerHTML = `<img src="${profilePicture}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      }
    }
  }

  window.studentSearchTable = function (tableId, inputId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    if (!table) {
      return;
    }
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i += 1) {
      const firstCell = rows[i].getElementsByTagName('td')[0];
      if (!firstCell) {
        continue;
      }
      const text = (firstCell.textContent || firstCell.innerText).toLowerCase();
      rows[i].style.display = text.indexOf(filter) > -1 ? '' : 'none';
    }
  };
})();
