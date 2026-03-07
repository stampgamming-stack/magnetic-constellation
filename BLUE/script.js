// ============================================
//  FUTURISTIC PORTFOLIO — PREMIUM SCRIPT
// ============================================
(() => {
    'use strict';

    // ============================================
    //  1. PARTICLE NETWORK (Canvas)
    // ============================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 200 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 12), 100);
    const CONNECT_DIST = 150;

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 1.8 + 0.3;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
            this.alpha = this.baseAlpha;
            this.pulse = Math.random() * Math.PI * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.015;
            this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.15;

            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;

            // Mouse attraction/repulsion
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.vx += dx / dist * force * 0.015;
                    this.vy += dy / dist * force * 0.015;
                }
            }
            // Damping
            this.vx *= 0.998;
            this.vy *= 0.998;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
            ctx.fill();

            // Glow ring
            if (this.radius > 1.2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha * 0.1})`;
                ctx.fill();
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
            // Mouse connections
            if (mouse.x !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    // ============================================
    //  2. TYPING EFFECT
    // ============================================
    const typingEl = document.getElementById('typingText');
    const phrases = [
        'Web Developer & Designer',
        'JDM & Coding Enthusiast',
        'Front-End Developer',
        'Creative Problem Solver',
        'UI / UX Passionate'
    ];
    let pIdx = 0, cIdx = 0, deleting = false, speed = 80;

    function type() {
        const txt = phrases[pIdx];
        if (deleting) {
            typingEl.textContent = txt.substring(0, --cIdx);
            speed = 35;
        } else {
            typingEl.textContent = txt.substring(0, ++cIdx);
            speed = 70 + Math.random() * 40; // natural variance
        }
        if (!deleting && cIdx === txt.length) { speed = 2200; deleting = true; }
        else if (deleting && cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; speed = 600; }
        setTimeout(type, speed);
    }
    setTimeout(type, 1400);

    // ============================================
    //  3. NAVBAR
    // ============================================
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        const sy = window.scrollY;
        nav.classList.toggle('scrolled', sy > 80);

        let current = '';
        sections.forEach(sec => {
            if (sy >= sec.offsetTop - 250) current = sec.id;
        });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // ============================================
    //  4. MOBILE MENU
    // ============================================
    const burger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    //  5. SCROLL REVEAL
    // ============================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const d = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => entry.target.classList.add('show'), d);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => revealObserver.observe(el));

    // ============================================
    //  6. SKILL BARS
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = (entry.target.dataset.level || 0) + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-hex__fill').forEach(f => skillObserver.observe(f));

    // ============================================
    //  7. STATS COUNTER
    // ============================================
    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 40);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('[data-count]');
                nums.forEach(n => animateCounter(n, parseInt(n.dataset.count)));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) statsObserver.observe(heroStats);

    // ============================================
    //  8. 3D TILT (Cards)
    // ============================================
    const TILT = 8;
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const rY = ((x - r.width / 2) / (r.width / 2)) * TILT;
            const rX = ((r.height / 2 - y) / (r.height / 2)) * TILT;
            card.style.transform = `perspective(700px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    //  9. CONTACT FORM
    // ============================================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const original = btn.innerHTML;
            btn.innerHTML = '<span>MESSAGE SENT ✓</span>';
            btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
            btn.style.boxShadow = '0 4px 20px rgba(0, 230, 118, .3)';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.boxShadow = '';
                form.reset();
            }, 2500);
        });
    }

    // ============================================
    //  10. SMOOTH SCROLL for all anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
