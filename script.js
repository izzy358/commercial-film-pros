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

// Intersection Observer for scroll-triggered fade-in animations
const revealElements = document.querySelectorAll('.reveal, .reveal-item');

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('service-card')) {
                // Staggered animation for service cards
                const index = Array.from(document.querySelectorAll('.services-grid .service-card')).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    observer.observe(el);
});

// Hero text staggered reveal animation
function animateHeroText() {
    const headline = document.querySelector('.hero-headline');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero-section .primary-cta');
    const badges = document.querySelector('.trust-badges');

    // Split headline into words/lines
    const headlineText = headline.textContent;
    headline.textContent = '';
    headlineText.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = 0;
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        headline.appendChild(span);
        setTimeout(() => {
            span.style.opacity = 1;
            span.style.transform = 'translateY(0)';
        }, 50);
    });

    // Animate subtitle
    subtitle.style.opacity = 0;
    subtitle.style.transform = 'translateY(20px)';
    subtitle.style.transition = 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s';
    setTimeout(() => {
        subtitle.style.opacity = 1;
        subtitle.style.transform = 'translateY(0)';
    }, 50);

    // Animate CTA button
    cta.style.opacity = 0;
    cta.style.transform = 'translateY(20px)';
    cta.style.transition = 'opacity 0.8s ease-out 1.2s, transform 0.8s ease-out 1.2s';
    setTimeout(() => {
        cta.style.opacity = 1;
        cta.style.transform = 'translateY(0)';
    }, 50);

    // Animate Trust Badges
    badges.style.opacity = 0;
    badges.style.transform = 'translateY(20px)';
    badges.style.transition = 'opacity 0.8s ease-out 1.5s, transform 0.8s ease-out 1.5s';
    setTimeout(() => {
        badges.style.opacity = 1;
        badges.style.transform = 'translateY(0)';
    }, 50);
}

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
    animateHeroText();
});
