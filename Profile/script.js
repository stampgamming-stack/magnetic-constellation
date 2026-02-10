// ===== Cursor Follower (Desktop only) =====
const cursor = document.getElementById('cursor');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const revealItems = document.querySelectorAll('.reveal-item');

    revealItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (rect.top < windowHeight - 80) {
            // Add staggered delay based on index within same section
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 80);
        }
    });
}

// Initial check on load
window.addEventListener('load', () => {
    revealOnScroll();
});

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===== Background Parallax on Scroll =====
const geometricBg = document.getElementById('geometricBg');
const circles = document.querySelectorAll('.circle');
const lines = document.querySelectorAll('.line');

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Move circles with different speeds
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.05;
                const rotation = scrollY * 0.02 * (index % 2 === 0 ? 1 : -1);
                circle.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
            });

            // Move lines with scroll
            lines.forEach((line, index) => {
                const speed = (index + 1) * 0.08;
                const direction = index % 2 === 0 ? 1 : -1;
                line.style.transform = `translateY(${scrollY * speed * direction}px)`;
            });

            ticking = false;
        });
        ticking = true;
    }
});

// ===== Mouse Parallax for Background =====
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 6;
        const currentTransform = circle.style.transform || '';
        const scrollPart = currentTransform.match(/translateY\([^)]+\)/) || [''];
        circle.style.transform = `${scrollPart[0]} translate(${x * speed}px, ${y * speed}px)`;
    });

    lines.forEach((line, index) => {
        const speed = (index + 1) * 4;
        const currentTransform = line.style.transform || '';
        const scrollPart = currentTransform.match(/translateY\([^)]+\)/) || [''];
        line.style.transform = `${scrollPart[0]} translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Nav Active State =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// ===== Image Frame Hover Effect =====
const imageFrame = document.querySelector('.image-frame');
if (imageFrame) {
    imageFrame.addEventListener('mouseenter', function () {
        this.style.borderColor = 'var(--gold)';
        this.style.boxShadow = '0 25px 70px rgba(198, 160, 74, 0.15)';
    });

    imageFrame.addEventListener('mouseleave', function () {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
}

// ===== Social Card Tilt Effect =====
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 768) return;

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ===== Interest Items Animation =====
document.querySelectorAll('.interest-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Fog Parallax on Scroll =====
const fogLayers = document.querySelectorAll('.fog-layer');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    fogLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.015;
        const direction = index % 2 === 0 ? 1 : -1;
        layer.style.marginTop = `${scrollY * speed * direction}px`;
    });
});

// =========================================
// ===== 🎵 Background Music Player =====
// =========================================
//
// 📌 วิธีใส่เพลง:
// ────────────────────────────────────
// 1. เตรียมไฟล์เพลง (แนะนำ .mp3 หรือ .ogg)
// 2. วางไฟล์เพลงไว้ในโฟลเดอร์เดียวกับ index.html
// 3. แก้ไขตรง MUSIC_URL ด้านล่างให้เป็นชื่อไฟล์เพลงของคุณ
//    ตัวอย่าง: const MUSIC_URL = 'my-song.mp3';
// 4. แก้ไข MUSIC_TITLE เป็นชื่อเพลงที่ต้องการแสดง
//
// 💡 หรือจะใช้ลิงก์เพลงจากอินเทอร์เน็ตก็ได้
//    ตัวอย่าง: const MUSIC_URL = 'https://example.com/song.mp3';
//
// ⚠️ เสียงจะเริ่มเล่นเมื่อผู้ใช้กดปุ่ม Play
//    (เบราว์เซอร์ไม่อนุญาตให้เล่นเสียงอัตโนมัติ)
// ────────────────────────────────────

// 🎶 <<<< แก้ไขตรงนี้ >>>>
const MUSIC_URL = '/Profile/Laufey - From The Start Official Music Video.mp3';       // ← ใส่ลิงก์หรือชื่อไฟล์เพลงที่นี่
const MUSIC_TITLE = 'Laufey - From The Start';          // ← ใส่ชื่อเพลงที่นี่ (แสดงบน Player)
// 🎶 <<<< จบส่วนแก้ไข >>>>

const audio = new Audio(MUSIC_URL);
audio.loop = true;
audio.volume = 0.3; // เสียงเริ่มต้น 30%

const musicToggle = document.getElementById('musicToggle');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const musicBars = document.getElementById('musicBars');
const musicTitle = document.getElementById('musicTitle');
const volumeSlider = document.getElementById('volumeSlider');
const progressSlider = document.getElementById('progressSlider');
const timeDisplay = document.getElementById('timeDisplay');
const durationDisplay = document.getElementById('durationDisplay');
const musicPlayer = document.getElementById('musicPlayer');
const musicCollapseBtn = document.getElementById('musicCollapseBtn');
const musicMinimizeBtn = document.getElementById('musicMinimizeBtn');

// ตั้งชื่อเพลงที่แสดง
musicTitle.textContent = MUSIC_TITLE;

let isPlaying = false;
let isSeeking = false;

// ===== ฟังก์ชันแปลงเวลาเป็น mm:ss =====
function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== ปุ่ม Play / Pause =====
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
        musicBars.classList.remove('playing');
        isPlaying = false;
    } else {
        audio.play().then(() => {
            iconPlay.style.display = 'none';
            iconPause.style.display = '';
            musicBars.classList.add('playing');
            isPlaying = true;
        }).catch(err => {
            console.warn('ไม่สามารถเล่นเพลงได้:', err);
        });
    }
});

// ===== ปรับระดับเสียง =====
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// ===== อัพเดตหลอดท่อนเพลง (Progress) =====
audio.addEventListener('timeupdate', () => {
    if (!isSeeking && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
        timeDisplay.textContent = formatTime(audio.currentTime);
    }
});

// แสดงความยาวเพลงเมื่อโหลดเสร็จ
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// ===== ลากหลอดเพื่อเลื่อนท่อนเพลง =====
progressSlider.addEventListener('mousedown', () => { isSeeking = true; });
progressSlider.addEventListener('touchstart', () => { isSeeking = true; });

progressSlider.addEventListener('input', (e) => {
    if (audio.duration) {
        const seekTime = (e.target.value / 100) * audio.duration;
        timeDisplay.textContent = formatTime(seekTime);
    }
});

progressSlider.addEventListener('change', (e) => {
    if (audio.duration) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    }
    isSeeking = false;
});

// ===== ปุ่มย่อ Player (Minimize) =====
musicMinimizeBtn.addEventListener('click', () => {
    musicPlayer.classList.add('collapsed');
    musicCollapseBtn.classList.add('visible');
});

// ===== ปุ่มขยาย Player (Expand) =====
musicCollapseBtn.addEventListener('click', () => {
    musicPlayer.classList.remove('collapsed');
    musicCollapseBtn.classList.remove('visible');
});

// ===== Console Message =====
console.log('%c S ', 'background: #C6A04A; color: #080608; font-size: 32px; font-weight: 300; font-family: serif; padding: 10px 20px;');
console.log('%cSTAMP | INFP 5w4', 'color: #D4B96A; font-size: 12px; letter-spacing: 3px;');



