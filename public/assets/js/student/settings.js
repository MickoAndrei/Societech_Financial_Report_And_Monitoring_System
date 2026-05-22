// Settings page functionality
document.addEventListener('DOMContentLoaded', function() {
  loadNotificationSettings();
  loadPersonalInfo();
});

// Notification Settings
function loadNotificationSettings() {
  const settings = JSON.parse(localStorage.getItem('studentNotificationSettings') || '{}');
  document.getElementById('paymentReminders').checked = settings.paymentReminders !== false;
  document.getElementById('systemUpdates').checked = settings.systemUpdates !== false;
  document.getElementById('classAnnouncements').checked = settings.classAnnouncements !== false;
  document.getElementById('financialAlerts').checked = settings.financialAlerts !== false;
}

function saveNotificationSettings() {
  const settings = {
    paymentReminders: document.getElementById('paymentReminders').checked,
    systemUpdates: document.getElementById('systemUpdates').checked,
    classAnnouncements: document.getElementById('classAnnouncements').checked,
    financialAlerts: document.getElementById('financialAlerts').checked
  };

  localStorage.setItem('studentNotificationSettings', JSON.stringify(settings));
  alert('Notification settings saved successfully!');
}

// Password Settings
function changePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Basic validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert('Please fill in all password fields.');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('New passwords do not match.');
    return;
  }

  if (newPassword.length < 6) {
    alert('New password must be at least 6 characters long.');
    return;
  }

  alert('Password changes require the database-backed account endpoint.');
  return;
}

// Personal Information
function loadPersonalInfo() {
  const info = JSON.parse(localStorage.getItem('studentPersonalInfo') || '{}');
  document.getElementById('fullName').value = info.fullName || '';
  document.getElementById('email').value = info.email || '';
  document.getElementById('phone').value = info.phone || '';
  document.getElementById('program').value = info.program || '';

  // Load profile picture
  const profilePicture = localStorage.getItem('studentProfilePicture');
  if (profilePicture) {
    document.getElementById('profilePreview').src = profilePicture;
    document.getElementById('profilePreview').style.display = 'block';
  }
}

function previewProfilePicture() {
  const file = document.getElementById('profilePicture').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profilePreview').src = e.target.result;
      document.getElementById('profilePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function savePersonalInfo() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const program = document.getElementById('program').value.trim();

  // Basic validation
  if (!fullName || !email || !phone || !program) {
    alert('Please fill in all personal information fields.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const info = {
    fullName,
    email,
    phone,
    program
  };

  localStorage.setItem('studentPersonalInfo', JSON.stringify(info));

  // Save profile picture if uploaded
  const file = document.getElementById('profilePicture').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem('studentProfilePicture', e.target.result);
      // Update profile image in header
      updateProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  alert('Personal information saved successfully!');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateProfileImage(imageSrc) {
  // Update the profile image in the header
  const profileImg = document.querySelector('.profileImg');
  if (profileImg) {
    profileImg.innerHTML = `<img src="${imageSrc}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
  }
}
