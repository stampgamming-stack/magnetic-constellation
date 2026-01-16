// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu after click
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Cursor Follower
const cursorFollower = document.querySelector('.cursor-follower');

if (cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
}

// Geometric Background Parallax Effect
const circles = document.querySelectorAll('.circle');
const lines = document.querySelectorAll('.line');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Move circles with different speeds
    circles.forEach((circle, index) => {
        const speed = 0.02 + (index * 0.01);
        circle.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Move lines with different speeds
    lines.forEach((line, index) => {
        const speed = 0.03 + (index * 0.015);
        const isHorizontal = line.classList.contains('line-3');
        if (isHorizontal) {
            line.style.transform = `translateX(${scrollY * speed}px)`;
        } else {
            line.style.transform = `translateY(${scrollY * speed}px)`;
        }
    });
});

// Mouse Move Parallax for Geometric Elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    circles.forEach((circle, index) => {
        const speed = 10 + (index * 5);
        const x = mouseX * speed;
        const y = mouseY * speed;
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });

    lines.forEach((line, index) => {
        const speed = 5 + (index * 3);
        const x = mouseX * speed;
        const y = mouseY * speed;
        line.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all hidden elements
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ========================================
// Modal Popup Functionality
// ========================================
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

// Open Modal Function
function openModal(imageSrc, title, description) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Modal Function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close button click
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close when clicking overlay (outside modal content)
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Project Cards Click
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.project-image img');
        const title = card.querySelector('.project-info h3').textContent;
        const desc = card.querySelector('.project-info p').textContent;
        openModal(img.src, title, desc);
    });
});

// Activity Cards Click
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.activity-image img');
        const title = card.querySelector('.activity-info h3').textContent;
        const desc = card.querySelector('.activity-info p').textContent;
        openModal(img.src, title, desc);
    });
});

// Certificate Cards Click
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('p').textContent;
        openModal(img.src, title, 'เกียรติบัตร: ' + title);
    });
});