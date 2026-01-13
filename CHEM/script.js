/**
 * Chemical Equilibrium Dashboard - Interactive Features
 * ระบบตรวจสอบสมดุลเคมีในร่างกายและสิ่งแวดล้อม
 */

document.addEventListener('DOMContentLoaded', () => {
    initPulseGraph();
    initAltitudeSimulator();
    initAgeSimulator();
    initCaveAnimation();
});

/* ==================== PULSE GRAPH (O2 SATURATION) ==================== */
function initPulseGraph() {
    const canvas = document.getElementById('pulse-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;
    let offset = 0;
    let amplitude = 30;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        width = canvas.width;
        height = canvas.height;
    }

    function drawPulse() {
        ctx.clearRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.lineWidth = 1;
        for (let y = 0; y < height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw pulse line
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.beginPath();

        const centerY = height / 2;
        const frequency = 0.02;

        for (let x = 0; x < width; x++) {
            // Create heartbeat-like wave pattern
            const t = (x + offset) * frequency;
            const heartbeat =
                Math.sin(t) * 0.3 +
                Math.sin(t * 2) * 0.2 +
                Math.pow(Math.sin(t * 0.5), 10) * 1.5;

            const y = centerY - heartbeat * amplitude;

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        offset += 2;
        animationId = requestAnimationFrame(drawPulse);
    }

    // Store amplitude setter for altitude simulator
    window.setPulseAmplitude = (newAmplitude) => {
        amplitude = newAmplitude;
    };

    resize();
    window.addEventListener('resize', resize);
    drawPulse();
}

/* ==================== ALTITUDE SIMULATOR ==================== */
function initAltitudeSimulator() {
    const slider = document.getElementById('altitude-slider');
    const altitudeValue = document.getElementById('altitude-value');
    const o2Value = document.getElementById('o2-value');
    const warningBox = document.getElementById('hypoxia-warning');

    if (!slider) return;

    // O2 saturation calculation based on altitude
    function calculateO2Saturation(altitude) {
        // At sea level: ~98%, decreases with altitude
        // Approximate formula for SpO2 at altitude
        const baseSaturation = 98;
        const decreaseRate = 0.004; // % per meter
        const saturation = Math.max(70, baseSaturation - (altitude * decreaseRate));
        return Math.round(saturation);
    }

    function updateDisplay(altitude) {
        const saturation = calculateO2Saturation(altitude);

        // Update altitude display
        altitudeValue.textContent = `${altitude.toLocaleString()} เมตร`;

        // Update O2 saturation
        o2Value.textContent = `${saturation}%`;

        // Change color based on saturation level
        if (saturation >= 95) {
            o2Value.style.color = '#00ff88'; // Green - Normal
            o2Value.style.textShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
        } else if (saturation >= 90) {
            o2Value.style.color = '#ffcc00'; // Yellow - Warning
            o2Value.style.textShadow = '0 0 20px rgba(255, 204, 0, 0.3)';
        } else {
            o2Value.style.color = '#ff6b35'; // Orange - Danger
            o2Value.style.textShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
        }

        // Show/hide hypoxia warning
        if (altitude >= 2500) {
            warningBox.classList.add('active');
        } else {
            warningBox.classList.remove('active');
        }

        // Update pulse graph amplitude (weaker pulse at high altitude)
        if (window.setPulseAmplitude) {
            const newAmplitude = Math.max(15, 30 - (altitude / 200));
            window.setPulseAmplitude(newAmplitude);
        }
    }

    slider.addEventListener('input', (e) => {
        updateDisplay(parseInt(e.target.value));
    });

    // Initial update
    updateDisplay(0);
}

/* ==================== AGE SIMULATOR ==================== */
function initAgeSimulator() {
    const slider = document.getElementById('age-slider');
    const ageValue = document.getElementById('age-value');
    const densityStatus = document.getElementById('density-status');
    const boneInner = document.getElementById('bone-inner');
    const densityMeter = document.getElementById('density-meter');
    const osteoporosisInfo = document.getElementById('osteoporosis-info');

    if (!slider) return;

    function calculateBoneDensity(age) {
        // Peak bone mass at 25-30 years, then gradual decline
        if (age <= 30) {
            return 100;
        } else if (age <= 40) {
            return 100 - ((age - 30) * 0.5); // Slow decline
        } else if (age <= 50) {
            return 95 - ((age - 40) * 1); // Moderate decline
        } else if (age <= 60) {
            return 85 - ((age - 50) * 1.5); // Faster decline
        } else {
            return Math.max(40, 70 - ((age - 60) * 1.5)); // Rapid decline
        }
    }

    function getDensityStatus(density) {
        if (density >= 85) {
            return { text: 'ปกติ', color: '#00ff88' };
        } else if (density >= 70) {
            return { text: 'เสี่ยงกระดูกบาง', color: '#ffcc00' };
        } else {
            return { text: 'กระดูกพรุน', color: '#ff6b35' };
        }
    }

    function updateDisplay(age) {
        const density = calculateBoneDensity(age);
        const status = getDensityStatus(density);

        // Update age display
        ageValue.textContent = `${age} ปี`;

        // Update density status
        densityStatus.textContent = status.text;
        densityStatus.style.color = status.color;

        // Update bone inner opacity (shows porosity)
        if (boneInner) {
            const opacity = density / 100;
            boneInner.style.opacity = opacity;
        }

        // Update density meter
        if (densityMeter) {
            densityMeter.style.height = `${density}%`;

            // Change meter color
            if (density >= 85) {
                densityMeter.style.background = 'linear-gradient(to top, #00ff88, #00d4ff)';
            } else if (density >= 70) {
                densityMeter.style.background = 'linear-gradient(to top, #ffcc00, #ff9500)';
            } else {
                densityMeter.style.background = 'linear-gradient(to top, #ff6b35, #ff3366)';
            }
        }

        // Highlight warning info when age > 40
        if (osteoporosisInfo) {
            if (age >= 40) {
                osteoporosisInfo.style.borderColor = '#ff6b35';
                osteoporosisInfo.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.2)';
            } else {
                osteoporosisInfo.style.borderColor = '';
                osteoporosisInfo.style.boxShadow = '';
            }
        }
    }

    slider.addEventListener('input', (e) => {
        updateDisplay(parseInt(e.target.value));
    });

    // Initial update
    updateDisplay(25);
}

/* ==================== CAVE ANIMATION ==================== */
function initCaveAnimation() {
    const stalactite = document.getElementById('stalactite');
    const stalagmite = document.getElementById('stalagmite');

    if (!stalactite || !stalagmite) return;

    let stalactiteHeight = 60;
    let stalagmiteHeight = 50;
    const maxHeight = 100;
    const growthRate = 0.05; // pixels per animation frame

    function growFormations() {
        // Slowly grow stalactite and stalagmite
        if (stalactiteHeight < maxHeight) {
            stalactiteHeight += growthRate;
            stalactite.style.height = `${stalactiteHeight}px`;
        }

        if (stalagmiteHeight < maxHeight) {
            stalagmiteHeight += growthRate * 0.8; // Stalagmite grows slower
            stalagmite.style.height = `${stalagmiteHeight}px`;
        }

        requestAnimationFrame(growFormations);
    }

    growFormations();
}

/* ==================== SCROLL ANIMATIONS ==================== */
// Observe sections for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all modules
document.querySelectorAll('.module').forEach(module => {
    observer.observe(module);
});

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== PARTICLE EFFECTS (Optional Enhancement) ==================== */
function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        opacity: 1;
        transition: all 1s ease-out;
        box-shadow: 0 0 10px ${color};
    `;
    document.body.appendChild(particle);

    // Animate particle
    requestAnimationFrame(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
        particle.style.opacity = '0';
    });

    // Remove particle after animation
    setTimeout(() => particle.remove(), 1000);
}

// Add cursor trail effect on panels
document.querySelectorAll('.data-panel, .info-panel').forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) { // Limit particle creation
            createParticle(e.clientX, e.clientY, '#00ff88');
        }
    });
});
