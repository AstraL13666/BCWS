// ---------- 1. Stars ----------
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

// ---------- 2. Theme toggle ----------
function showNotify(message = "Theme changed", duration = 2000) {
    const existing = document.querySelector('.notify.show');
    if (existing) {
        existing.classList.remove('show');
        setTimeout(() => showNotify(message, duration), 350);
        return;
    }

    const notify = document.querySelector('.notify');
    const progressBar = notify.querySelector('.notify__progress-bar');

    notify.querySelector('.notify__text').textContent = message;

    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(1)';
    progressBar.offsetHeight;

    notify.classList.add('show');

    progressBar.style.transition = `transform ${duration}ms linear`;
    progressBar.style.transform = 'scaleX(0)';

    setTimeout(() => {
        notify.classList.remove('show');
    }, duration);
}

// ---------- 3. Theme ----------
const themes = ['light', 'dark'];
let current = 0;

function applyTheme(name) {
    document.body.className = 'theme-' + name;
    localStorage.setItem('theme', name);

    const iconUse = document.getElementById('themeIconUse');
    iconUse?.setAttribute('href', 'assets/svg/sprite.svg#' +
        (name === 'light' ? 'sun' : 'moon'));

    const starColor = name === 'light' ? '#495057' : '#adb5bd';
    document.querySelectorAll('.star').forEach(s => s.style.background = starColor);

    const newText = name === 'light' ? 'Тема сайта: Светлая' : 'Тема сайта: Тёмная';
    showNotify(newText);
}

document.getElementById('themeButton').addEventListener('click', () => {
    current = (current + 1) % 2;
    applyTheme(themes[current]);
});

// ---------- 3. Loading a saved theme ----------
const saved = localStorage.getItem('theme') || 'light';
current = themes.indexOf(saved) >= 0 ? themes.indexOf(saved) : 0;
applyTheme(themes[current]);

// ---------- 4. The button to top site ----------
(function () {
    const btn = document.getElementById('btnTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
