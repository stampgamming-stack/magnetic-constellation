/**
 * ==========================================
 * JS MASTER - แพลตฟอร์มเรียน JavaScript ภาษาไทย
 * ==========================================
 * 
 * ฟีเจอร์:
 * 1. ระบบ Login (แยกบัญชีผู้ใช้)
 * 2. ระบบ Streak (ไฟ) แบบ Duolingo
 * 3. ระบบตรวจสอบโจทย์ (ต้องทำถูกก่อนไปบทถัดไป)
 * 4. หมวดหมู่บทเรียน (Course Categories)
 * 5. Code Editor แบบ Interactive
 * 
 * บทเรียนโหลดจาก:
 * - courses-part1.js (Introduction → Objects)
 * - courses-part2.js (Events → Type Conversion)
 * - courses-part3.js (Errors → JSON)
 */

// ==========================================
// COURSE DATA - รวมจากไฟล์ทั้ง 3 parts
// ==========================================
const courses = [
    ...coursesPart1,
    ...coursesPart2,
    ...coursesPart3
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentUser = null;
let state = {
    currentCourseId: 'introduction',
    currentLessonIndex: 0,
    completedLessons: [],
    showPlatform: false,
    currentLessonPassed: false,
    streak: {
        count: 0,
        lastStudyDate: null,
        todayCompleted: false
    }
};

const ACCOUNTS_KEY = 'jsmaster_accounts';
const CURRENT_USER_KEY = 'jsmaster_current_user';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// ==========================================
// DOM ELEMENTS
// ==========================================
const elements = {
    // Login Screen
    loginScreen: document.getElementById('loginScreen'),
    loginForm: document.getElementById('loginForm'),
    usernameInput: document.getElementById('usernameInput'),
    existingAccounts: document.getElementById('existingAccounts'),
    accountsList: document.getElementById('accountsList'),

    // Hero
    hero: document.getElementById('hero'),
    startLearning: document.getElementById('startLearning'),
    continueBtn: document.getElementById('continueBtn'),
    codeRain: document.getElementById('codeRain'),
    userBar: document.getElementById('userBar'),
    displayUserName: document.getElementById('displayUserName'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Platform
    platform: document.getElementById('platform'),
    backToHome: document.getElementById('backToHome'),
    headerUserName: document.getElementById('headerUserName'),

    // Sidebar
    sidebar: document.getElementById('sidebar'),
    menuBtn: document.getElementById('menuBtn'),
    closeSidebar: document.getElementById('closeSidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    courseCategories: document.getElementById('courseCategories'),

    // Content
    courseBadge: document.getElementById('courseBadge'),
    courseName: document.getElementById('courseName'),
    lessonBadge: document.getElementById('lessonBadge'),
    lessonTitle: document.getElementById('lessonTitle'),
    lessonContent: document.getElementById('lessonContent'),

    // Example Code
    exampleSection: document.getElementById('exampleSection'),
    exampleCodeContent: document.getElementById('exampleCodeContent'),
    copyExampleBtn: document.getElementById('copyExampleBtn'),

    // Challenge
    challengeSection: document.getElementById('challengeSection'),
    challengeInstruction: document.getElementById('challengeInstruction'),
    challengeStatus: document.getElementById('challengeStatus'),
    hintBtn: document.getElementById('hintBtn'),
    hintContent: document.getElementById('hintContent'),

    // Code Editor
    codeInput: document.getElementById('codeInput'),
    lineNumbers: document.getElementById('lineNumbers'),
    runBtn: document.getElementById('runBtn'),
    resetCodeBtn: document.getElementById('resetCodeBtn'),
    copyBtn: document.getElementById('copyBtn'),
    outputConsole: document.getElementById('outputConsole'),
    clearOutput: document.getElementById('clearOutput'),

    // Navigation
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    mobilePrevBtn: document.getElementById('mobilePrevBtn'),
    mobileNextBtn: document.getElementById('mobileNextBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),

    // Streak
    streakContainer: document.getElementById('streakContainer'),
    fireIcon: document.getElementById('fireIcon'),
    streakCount: document.getElementById('streakCount'),
    tooltipDesc: document.getElementById('tooltipDesc'),
    sidebarStreak: document.getElementById('sidebarStreak'),

    // Other
    completionMessage: document.getElementById('completionMessage'),
    nextCategoryBtn: document.getElementById('nextCategoryBtn'),
    restartBtn: document.getElementById('restartBtn')
};

// ==========================================
// ACCOUNT MANAGEMENT
// ==========================================
function getAllAccounts() {
    try {
        const accounts = localStorage.getItem(ACCOUNTS_KEY);
        return accounts ? JSON.parse(accounts) : {};
    } catch (e) {
        return {};
    }
}

function saveAllAccounts(accounts) {
    try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (e) {
        console.error('Failed to save accounts:', e);
    }
}

function getAccountData(username) {
    const accounts = getAllAccounts();
    return accounts[username] || null;
}

function saveAccountData(username, data) {
    const accounts = getAllAccounts();
    accounts[username] = data;
    saveAllAccounts(accounts);
}

function loginUser(username) {
    currentUser = username;
    localStorage.setItem(CURRENT_USER_KEY, username);

    const userData = getAccountData(username);
    if (userData) {
        state = { ...state, ...userData };
        if (!isToday(state.streak.lastStudyDate)) {
            state.streak.todayCompleted = false;
        }
    } else {
        state = {
            currentCourseId: 'basics',
            currentLessonIndex: 0,
            completedLessons: [],
            showPlatform: false,
            currentLessonPassed: false,
            streak: { count: 0, lastStudyDate: null, todayCompleted: false }
        };
        saveAccountData(username, state);
    }

    updateUserDisplay();
    showHero();

    if (state.completedLessons.length > 0 && elements.continueBtn) {
        elements.continueBtn.style.display = 'inline-flex';
    }
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    elements.hero.style.display = 'none';
    elements.platform.classList.remove('active');
    elements.loginScreen.classList.remove('hidden');
    elements.loginScreen.style.display = 'flex';
    renderExistingAccounts();
}

function updateUserDisplay() {
    if (currentUser) {
        elements.displayUserName.textContent = currentUser;
        elements.headerUserName.textContent = currentUser;
    }
}

function renderExistingAccounts() {
    const accounts = getAllAccounts();
    const usernames = Object.keys(accounts);

    if (usernames.length > 0) {
        elements.existingAccounts.classList.add('show');
        elements.accountsList.innerHTML = usernames.map(username => `
            <button class="account-btn" data-username="${username}">
                <span class="account-avatar">👤</span>
                <span>${username}</span>
            </button>
        `).join('');

        document.querySelectorAll('.account-btn').forEach(btn => {
            btn.addEventListener('click', () => loginUser(btn.dataset.username));
        });
    } else {
        elements.existingAccounts.classList.remove('show');
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getCurrentCourse() {
    return courses.find(c => c.id === state.currentCourseId) || courses[0];
}

function getCurrentLesson() {
    const course = getCurrentCourse();
    return course.lessons[state.currentLessonIndex];
}

function getCompletedLessonsInCourse(courseId) {
    return state.completedLessons.filter(l => l.courseId === courseId).length;
}

function isLessonCompleted(courseId, lessonId) {
    return state.completedLessons.some(l => l.courseId === courseId && l.lessonId === lessonId);
}

// ==========================================
// DATE/TIME UTILITIES (Fixed for proper streak)
// ==========================================
function getLocalDateString(date) {
    // แปลงเป็นวันที่ในรูปแบบ YYYY-MM-DD ตาม timezone ของผู้ใช้
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTodayString() {
    return getLocalDateString(new Date());
}

function isToday(dateString) {
    if (!dateString) return false;
    return getTodayString() === getLocalDateString(new Date(dateString));
}

function daysSinceLastStudy() {
    if (!state.streak.lastStudyDate) return Infinity;

    // เปรียบเทียบวันโดยใช้ local date เทียบกัน
    const today = new Date(getTodayString());
    const lastStudy = new Date(getLocalDateString(new Date(state.streak.lastStudyDate)));

    const diffTime = today.getTime() - lastStudy.getTime();
    const diffDays = Math.floor(diffTime / ONE_DAY_MS);

    return diffDays;
}

// ==========================================
// STREAK SYSTEM (Fixed)
// ==========================================
function updateStreak() {
    const daysSince = daysSinceLastStudy();

    // รีเซ็ต streak ถ้าไม่เรียนเกิน 2 วัน
    if (daysSince > 2) {
        state.streak.count = 0;
        state.streak.todayCompleted = false;
        saveProgress();
    }
    // รีเซ็ต todayCompleted ถ้าเป็นวันใหม่
    else if (daysSince >= 1) {
        state.streak.todayCompleted = false;
    }

    renderStreak();
}

function recordStudySession() {
    const todayStr = getTodayString();
    const lastStudyStr = state.streak.lastStudyDate
        ? getLocalDateString(new Date(state.streak.lastStudyDate))
        : null;

    // ถ้าวันนี้ยังไม่ได้เรียน
    if (!state.streak.todayCompleted) {
        const daysSince = daysSinceLastStudy();

        console.log('📅 Streak Debug:', {
            today: todayStr,
            lastStudy: lastStudyStr,
            daysSince: daysSince,
            currentStreak: state.streak.count
        });

        if (daysSince > 2 || !lastStudyStr) {
            // เริ่มใหม่
            state.streak.count = 1;
        } else if (daysSince >= 1) {
            // ต่อยอด streak! (วันใหม่)
            state.streak.count++;
        }
        // ถ้า daysSince === 0 = วันนี้เรียนไปแล้ว ไม่เพิ่ม

        state.streak.lastStudyDate = new Date().toISOString();
        state.streak.todayCompleted = true;

        console.log('🔥 New Streak:', state.streak.count);

        saveProgress();
        renderStreak();
    }
}

function renderStreak() {
    const count = state.streak.count;
    const daysSince = daysSinceLastStudy();

    elements.streakCount.textContent = count;
    if (elements.sidebarStreak) elements.sidebarStreak.textContent = count;

    // กรณี 1: ยังไม่เคยเรียนเลย (streak = 0)
    if (count === 0) {
        elements.tooltipDesc.textContent = 'เริ่มเรียนวันนี้เพื่อเริ่ม Streak!';
        elements.fireIcon.classList.add('inactive');
    }
    // กรณี 2: วันนี้เรียนแล้ว → ไฟติด!
    else if (state.streak.todayCompleted) {
        elements.tooltipDesc.textContent = `เยี่ยม! คุณเรียนต่อเนื่อง ${count} วันแล้ว 🔥`;
        elements.fireIcon.classList.remove('inactive');
    }
    // กรณี 3: วันใหม่ยังไม่เรียน → ไฟดับ (แต่ยังแสดงจำนวนวันเดิม)
    else {
        // ไฟดับ! รอให้เรียนก่อน
        elements.fireIcon.classList.add('inactive');

        if (daysSince === 1) {
            elements.tooltipDesc.textContent = `🔥 ${count} วัน - เรียนวันนี้เพื่อเป็น ${count + 1} วัน!`;
        } else if (daysSince === 2) {
            elements.tooltipDesc.textContent = `⚠️ ${count} วัน - Streak จะหายถ้าไม่เรียนวันนี้!`;
        } else if (daysSince > 2) {
            // จะถูก reset ใน updateStreak() อยู่แล้ว
            elements.tooltipDesc.textContent = 'เริ่มเรียนวันนี้เพื่อเริ่ม Streak ใหม่!';
        }
    }
}

// ==========================================
// CHALLENGE VALIDATION
// ==========================================
function validateChallenge(outputs, code) {
    const lesson = getCurrentLesson();
    const challenge = lesson.challenge;

    if (!challenge) return true;

    // Custom validation function
    if (challenge.validateFn) {
        return challenge.validateFn(outputs, code);
    }

    // Expected output matching
    if (challenge.expectedOutput) {
        if (outputs.length !== challenge.expectedOutput.length) return false;

        for (let i = 0; i < challenge.expectedOutput.length; i++) {
            const expected = String(challenge.expectedOutput[i]).trim();
            const actual = String(outputs[i].content).trim();
            if (actual !== expected) return false;
        }
        return true;
    }

    return outputs.length > 0;
}

function updateChallengeStatus(passed) {
    state.currentLessonPassed = passed;

    const statusEl = elements.challengeStatus;
    if (passed) {
        statusEl.className = 'challenge-status success';
        statusEl.innerHTML = '✅ ถูกต้อง! คุณสามารถไปบทถัดไปได้';
        elements.nextBtn.disabled = false;
        elements.mobileNextBtn.disabled = false;
    } else {
        statusEl.className = 'challenge-status';
        statusEl.innerHTML = '';
    }

    updateNavigationState();
}

function showWrongAnswer() {
    const statusEl = elements.challengeStatus;
    statusEl.className = 'challenge-status error';
    statusEl.innerHTML = '❌ ยังไม่ถูกต้อง ลองอีกครั้ง!';
}

function toggleHint() {
    const hintEl = elements.hintContent;
    if (hintEl.classList.contains('show')) {
        hintEl.classList.remove('show');
    } else {
        const lesson = getCurrentLesson();
        if (lesson.challenge && lesson.challenge.hint) {
            hintEl.textContent = '💡 ' + lesson.challenge.hint;
            hintEl.classList.add('show');
        }
    }
}

// ==========================================
// LOCAL STORAGE
// ==========================================
function saveProgress() {
    if (currentUser) {
        saveAccountData(currentUser, state);
    }
}

// ==========================================
// RENDER FUNCTIONS
// ==========================================
function renderCourseCategories() {
    let html = '';

    courses.forEach(course => {
        const total = course.lessons.length;
        const completed = getCompletedLessonsInCourse(course.id);
        const isActive = course.id === state.currentCourseId;
        const isExpanded = isActive;

        html += `
            <div class="course-category" data-course-id="${course.id}">
                <div class="category-header ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}">
                    <div class="category-info">
                        <span class="category-icon">${course.icon}</span>
                        <div>
                            <div class="category-title">${course.title}</div>
                            <div class="category-progress">${completed}/${total} บท</div>
                        </div>
                    </div>
                    <svg class="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <ul class="category-lessons ${isExpanded ? 'show' : ''}">
                    ${course.lessons.map((lesson, index) => {
            const isLessonActive = isActive && index === state.currentLessonIndex;
            const isCompleted = isLessonCompleted(course.id, lesson.id);
            let statusIcon = isCompleted ? '✓' : (index + 1);

            return `
                            <li class="lesson-item ${isLessonActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                                <a href="#" data-course-id="${course.id}" data-lesson-index="${index}">
                                    <span class="lesson-status">${statusIcon}</span>
                                    <span class="lesson-name">${lesson.title}</span>
                                </a>
                            </li>
                        `;
        }).join('')}
                </ul>
            </div>
        `;
    });

    elements.courseCategories.innerHTML = html;

    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('expanded');
            header.nextElementSibling.classList.toggle('show');
        });
    });

    document.querySelectorAll('.lesson-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = link.dataset.courseId;
            const lessonIndex = parseInt(link.dataset.lessonIndex);

            // Can only go to completed lessons or current lesson
            const lesson = courses.find(c => c.id === courseId).lessons[lessonIndex];
            if (isLessonCompleted(courseId, lesson.id) ||
                (courseId === state.currentCourseId && lessonIndex <= state.currentLessonIndex)) {
                navigateToLesson(courseId, lessonIndex);
                closeSidebar();
            }
        });
    });
}

function renderLessonContent() {
    const course = getCurrentCourse();
    const lesson = getCurrentLesson();

    // Reset passed state for new lesson
    const alreadyCompleted = isLessonCompleted(state.currentCourseId, lesson.id);
    state.currentLessonPassed = alreadyCompleted;

    // Course badge
    elements.courseName.textContent = course.title;

    // Lesson badge and title
    elements.lessonBadge.textContent = `บทที่ ${state.currentLessonIndex + 1}`;
    elements.lessonTitle.textContent = lesson.title;
    elements.lessonContent.innerHTML = lesson.content;

    // Example code
    elements.exampleCodeContent.textContent = lesson.codeExample;

    // Challenge
    if (lesson.challenge) {
        elements.challengeInstruction.innerHTML = lesson.challenge.instruction;
        elements.hintContent.classList.remove('show');

        if (alreadyCompleted) {
            elements.challengeStatus.className = 'challenge-status success';
            elements.challengeStatus.innerHTML = '✅ บทนี้ผ่านแล้ว!';
        } else {
            elements.challengeStatus.className = 'challenge-status';
            elements.challengeStatus.innerHTML = '';
        }
    }

    // Code editor - empty for practice
    elements.codeInput.value = '';
    updateLineNumbers();
    clearConsole();

    // Navigation
    updateNavigationState();
}

function updateNavigationState() {
    const course = getCurrentCourse();
    const lesson = getCurrentLesson();
    const isFirstLesson = state.currentLessonIndex === 0;
    const isLastLesson = state.currentLessonIndex === course.lessons.length - 1;
    const alreadyCompleted = isLessonCompleted(state.currentCourseId, lesson.id);

    elements.prevBtn.disabled = isFirstLesson;
    elements.mobilePrevBtn.disabled = isFirstLesson;

    // Block next button if not passed
    const canGoNext = state.currentLessonPassed || alreadyCompleted;
    elements.nextBtn.disabled = !canGoNext;
    elements.mobileNextBtn.disabled = !canGoNext;

    if (isLastLesson) {
        elements.nextBtn.querySelector('span').textContent = 'เสร็จสิ้น 🎉';
        elements.mobileNextBtn.querySelector('span').textContent = 'เสร็จ';
    } else {
        elements.nextBtn.querySelector('span').textContent = 'บทถัดไป';
        elements.mobileNextBtn.querySelector('span').textContent = 'ถัดไป';
    }
}

function renderAll() {
    renderCourseCategories();
    renderLessonContent();
    updateStreak();
}

// ==========================================
// CODE EDITOR FUNCTIONS
// ==========================================
function updateLineNumbers() {
    const lines = elements.codeInput.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= Math.max(lines, 3); i++) {
        html += i + '\n';
    }
    elements.lineNumbers.textContent = html;
}

function runCode() {
    const code = elements.codeInput.value;

    if (!code.trim()) {
        addOutput('กรุณาเขียนโค้ดก่อนกดรัน!', 'warn');
        return;
    }

    clearConsole();

    const outputs = [];
    const customConsole = {
        log: (...args) => outputs.push({ type: 'log', content: args.map(formatOutput).join(' ') }),
        error: (...args) => outputs.push({ type: 'error', content: args.map(formatOutput).join(' ') }),
        warn: (...args) => outputs.push({ type: 'warn', content: args.map(formatOutput).join(' ') }),
        info: (...args) => outputs.push({ type: 'info', content: args.map(formatOutput).join(' ') })
    };

    try {
        const wrappedCode = `(function(console) { ${code} })(customConsole);`;
        eval(wrappedCode);

        if (outputs.length === 0) {
            addOutput('(ไม่มี output - ลองใช้ console.log())', 'info');
        } else {
            outputs.forEach(out => addOutput(out.content, out.type));
        }

        // Validate challenge
        const passed = validateChallenge(outputs, code);
        if (passed) {
            updateChallengeStatus(true);
        } else if (outputs.length > 0) {
            showWrongAnswer();
        }

    } catch (error) {
        addOutput('❌ Error: ' + error.message, 'error');
        showWrongAnswer();
    }
}

function formatOutput(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'object') {
        try { return JSON.stringify(value, null, 2); }
        catch (e) { return String(value); }
    }
    return String(value);
}

function addOutput(text, type = 'log') {
    const placeholder = elements.outputConsole.querySelector('.output-placeholder');
    if (placeholder) placeholder.remove();

    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    elements.outputConsole.appendChild(line);
    elements.outputConsole.scrollTop = elements.outputConsole.scrollHeight;
}

function clearConsole() {
    elements.outputConsole.innerHTML = '<div class="output-placeholder">คลิก "รันโค้ด" เพื่อดูผลลัพธ์...</div>';
}

function resetCode() {
    elements.codeInput.value = '';
    updateLineNumbers();
    clearConsole();
    elements.challengeStatus.className = 'challenge-status';
    elements.challengeStatus.innerHTML = '';
    state.currentLessonPassed = isLessonCompleted(state.currentCourseId, getCurrentLesson().id);
    updateNavigationState();
}

async function copyCode() {
    try {
        await navigator.clipboard.writeText(elements.codeInput.value);
        elements.copyBtn.classList.add('copied');
        setTimeout(() => elements.copyBtn.classList.remove('copied'), 2000);
    } catch (err) {
        alert('ไม่สามารถคัดลอกได้');
    }
}

async function copyExampleCode() {
    try {
        const lesson = getCurrentLesson();
        await navigator.clipboard.writeText(lesson.codeExample);
        elements.copyExampleBtn.classList.add('copied');
        setTimeout(() => elements.copyExampleBtn.classList.remove('copied'), 2000);
    } catch (err) {
        alert('ไม่สามารถคัดลอกได้');
    }
}

// ==========================================
// NAVIGATION
// ==========================================
function navigateToLesson(courseId, lessonIndex) {
    state.currentCourseId = courseId;
    state.currentLessonIndex = lessonIndex;
    state.currentLessonPassed = false;
    saveProgress();
    renderAll();
    elements.completionMessage.classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextLesson() {
    if (!state.currentLessonPassed && !isLessonCompleted(state.currentCourseId, getCurrentLesson().id)) {
        return; // Blocked
    }

    const course = getCurrentCourse();
    const lesson = getCurrentLesson();

    if (!isLessonCompleted(state.currentCourseId, lesson.id)) {
        state.completedLessons.push({
            courseId: state.currentCourseId,
            lessonId: lesson.id
        });
        recordStudySession();
    }

    if (state.currentLessonIndex === course.lessons.length - 1) {
        elements.completionMessage.classList.add('show');
        saveProgress();
        renderCourseCategories();
    } else {
        state.currentLessonIndex++;
        state.currentLessonPassed = false;
        saveProgress();
        renderAll();
    }
}

function prevLesson() {
    if (state.currentLessonIndex > 0) {
        state.currentLessonIndex--;
        state.currentLessonPassed = false;
        saveProgress();
        renderAll();
    }
}

function nextCategory() {
    const currentIndex = courses.findIndex(c => c.id === state.currentCourseId);
    if (currentIndex < courses.length - 1) {
        state.currentCourseId = courses[currentIndex + 1].id;
        state.currentLessonIndex = 0;
        state.currentLessonPassed = false;
        saveProgress();
        renderAll();
        elements.completionMessage.classList.remove('show');
    }
}

// ==========================================
// VIEW MANAGEMENT
// ==========================================
function showPlatform() {
    elements.hero.style.display = 'none';
    elements.platform.classList.add('active');
    state.showPlatform = true;
    renderAll();
}

function showHero() {
    elements.loginScreen.classList.add('hidden');
    elements.loginScreen.style.display = 'none';
    elements.hero.style.display = 'flex';
    elements.platform.classList.remove('active');
    state.showPlatform = false;
}

function openSidebar() {
    elements.sidebar.classList.add('open');
    elements.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    elements.sidebar.classList.remove('open');
    elements.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// CODE RAIN EFFECT
// ==========================================
function createCodeRain() {
    if (!elements.codeRain) return;
    const chars = 'const let function if else for while'.split(' ');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const char = document.createElement('span');
            char.className = 'code-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 10 + 10) + 's';
            char.style.animationDelay = Math.random() * 5 + 's';
            char.style.fontSize = (Math.random() * 10 + 10) + 'px';
            elements.codeRain.appendChild(char);
            setTimeout(() => char.remove(), 20000);
        }, i * 200);
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
    // Login
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = elements.usernameInput.value.trim();
        if (username) loginUser(username);
    });

    elements.logoutBtn.addEventListener('click', logoutUser);

    // Hero
    elements.startLearning.addEventListener('click', showPlatform);
    elements.continueBtn?.addEventListener('click', showPlatform);
    elements.backToHome.addEventListener('click', showHero);

    // Sidebar
    elements.menuBtn.addEventListener('click', openSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);
    elements.mobileMenuBtn.addEventListener('click', openSidebar);

    // Code Editor
    elements.codeInput.addEventListener('input', updateLineNumbers);
    elements.codeInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = elements.codeInput.selectionStart;
            const end = elements.codeInput.selectionEnd;
            elements.codeInput.value = elements.codeInput.value.substring(0, start) + '  ' + elements.codeInput.value.substring(end);
            elements.codeInput.selectionStart = elements.codeInput.selectionEnd = start + 2;
            updateLineNumbers();
        }
    });

    elements.runBtn.addEventListener('click', runCode);
    elements.resetCodeBtn.addEventListener('click', resetCode);
    elements.copyBtn.addEventListener('click', copyCode);
    elements.copyExampleBtn.addEventListener('click', copyExampleCode);
    elements.clearOutput.addEventListener('click', clearConsole);
    elements.hintBtn?.addEventListener('click', toggleHint);

    // Navigation
    elements.nextBtn.addEventListener('click', nextLesson);
    elements.prevBtn.addEventListener('click', prevLesson);
    elements.mobileNextBtn.addEventListener('click', nextLesson);
    elements.mobilePrevBtn.addEventListener('click', prevLesson);
    elements.nextCategoryBtn?.addEventListener('click', nextCategory);
    elements.restartBtn?.addEventListener('click', () => {
        state.currentLessonIndex = 0;
        state.currentLessonPassed = false;
        saveProgress();
        renderAll();
        elements.completionMessage.classList.remove('show');
    });
}

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    console.log('🚀 JS Master - กำลังเริ่มต้น...');

    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
        loginUser(savedUser);
    } else {
        elements.loginScreen.style.display = 'flex';
        elements.hero.style.display = 'none';
        elements.platform.classList.remove('active');
        renderExistingAccounts();
    }

    createCodeRain();
    setInterval(createCodeRain, 15000);
    initEventListeners();
    updateLineNumbers();

    console.log('✅ JS Master - พร้อมใช้งาน!');
}

document.addEventListener('DOMContentLoaded', init);
