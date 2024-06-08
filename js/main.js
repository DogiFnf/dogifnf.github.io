document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    if (!themeToggleButton) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.classList.add(savedTheme); // Применяем сохраненную тему
    }

    themeToggleButton.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark-theme');
    
        const currentTheme = document.documentElement.classList.contains('dark-theme')? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
    });
});

document.getElementById('copyButton').addEventListener('click', function() {
    var textToCopy = this.getAttribute('data-text');
    var tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
});