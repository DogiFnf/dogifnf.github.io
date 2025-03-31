document.addEventListener('DOMContentLoaded', () => {
    // Easter egg sound effect
    const headerImg = document.querySelector('.header-img');
    const clickSound = new Audio('./assets/toby-fox-bark.mp3');
    
    headerImg.addEventListener('click', () => {
        clickSound.currentTime = 0.1;
        clickSound.play();

        setTimeout(() => {
            clickSound.pause();
            clickSound.currentTime = 0;
        }, 800);
    });

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.project-card, .skill-card, .text');
    elements.forEach(el => observer.observe(el));
});