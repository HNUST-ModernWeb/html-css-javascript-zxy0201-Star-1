const avatarInput = document.getElementById('avatar-input');
const avatar = document.getElementById('avatar');
const nameDisplay = document.getElementById('name-display');
const bioDisplay = document.getElementById('bio-display');
const nameInput = document.getElementById('name-input');
const bioInput = document.getElementById('bio-input');
const saveBtn = document.getElementById('save-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      avatar.style.backgroundImage = `url(${event.target.result})`;
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.innerHTML = '';
      localStorage.setItem('avatar', event.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function loadSavedData() {
  const savedName = localStorage.getItem('name');
  const savedBio = localStorage.getItem('bio');
  const savedAvatar = localStorage.getItem('avatar');

  if (savedName) {
    nameDisplay.textContent = savedName;
    nameInput.value = savedName;
  }

  if (savedBio) {
    bioDisplay.textContent = savedBio;
    bioInput.value = savedBio;
  }

  if (savedAvatar) {
    avatar.style.backgroundImage = `url(${savedAvatar})`;
    avatar.style.backgroundSize = 'cover';
    avatar.style.backgroundPosition = 'center';
    avatar.innerHTML = '';
  }
}

saveBtn.addEventListener('click', () => {
  const newName = nameInput.value.trim();
  const newBio = bioInput.value.trim();

  if (newName) {
    nameDisplay.textContent = newName;
    localStorage.setItem('name', newName);
  }

  if (newBio) {
    bioDisplay.textContent = newBio;
    localStorage.setItem('bio', newBio);
  }

  nameInput.value = '';
  bioInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadSavedData();
});
