// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (document.querySelector('.main-header')?.offsetHeight || 0),
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for stats bar
const statNumbers = document.querySelectorAll('.stat-number');

const countObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the element is visible
};

const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const duration = 2000; // milliseconds
            const increment = target / (duration / 16); // ~60fps

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    entry.target.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.textContent = target;
                }
            };
            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, countObserverOptions);

statNumbers.forEach(num => {
    countObserver.observe(num);
});

// Initialize animations when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // animateHeroText(); // Removed animateHeroText call
});