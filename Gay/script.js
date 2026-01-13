document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Observe all sections and cards
    document.querySelectorAll('.section-title, .hero-content, .about-text, .about-image, .stat-card, .skill-card, .project-card, .activity-item, .cert-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    // Add class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Mobile Menu Styles injected by JS */
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: var(--header-height);
                left: 0;
                width: 100%;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
                padding: 2rem;
                border-bottom: 1px solid var(--glass-border);
            }
        }
    `;
    document.head.appendChild(style);
});