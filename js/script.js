// звёзды
const starsContainer = document.getElementById('stars');
const starCount = 120;
for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
}

// смена темы
function setTheme(theme) {
    document.body.className = 'theme-' + theme;
    localStorage.setItem('theme', theme);
    const starColor = { dark: '#ffffff', gray: '#adb5bd', light: '#495057' }[theme];
    document.querySelectorAll('.star').forEach(s => s.style.background = starColor);
    const name = { dark: 'Тёмно-синяя', gray: 'Серая', light: 'Светлая' }[theme];
    showNotification('Тема изменена: ' + name);
}

function toggleThemeMenu() {
    document.getElementById('themeMenu').classList.toggle('show');
}

function showNotification(text) {
    const n = document.getElementById('notification');
    n.textContent = text;
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 3000);
}

// кнопка наверх
window.addEventListener('scroll', () => {
    document.getElementById('topBtn').classList.toggle('show', window.scrollY > 500);
});

// сохранённая тема
const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

// закрыть меню по клику вне
window.addEventListener('click', e => {
    if (!e.target.closest('.theme-toggle')) document.getElementById('themeMenu').classList.remove('show');
});