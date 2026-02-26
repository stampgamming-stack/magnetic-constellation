/**
 * JSMaster - App Logic
 * Theme, Login, Hero, Course Outline, Lesson Viewer, Console, Code Exec
 */
const STORE_KEY = 'jsm_accounts', USER_KEY = 'jsm_user', THEME_KEY = 'jsm_theme';
let currentUser = null, state = { currentLesson: 0, completed: [], streak: { count: 0, last: null, today: false } };

// === DOM ===
const $ = id => document.getElementById(id);
const el = {
    loginScreen: $('loginScreen'), loginForm: $('loginForm'), usernameInput: $('usernameInput'),
    savedAccounts: $('savedAccounts'), accountsList: $('accountsList'),
    heroScreen: $('heroScreen'), heroUser: $('heroUser'), heroStreakFire: $('heroStreakFire'),
    heroStreakNum: $('heroStreakNum'), heroLogout: $('heroLogout'), startBtn: $('startBtn'), continueBtn: $('continueBtn'),
    courseScreen: $('courseScreen'), backToHero: $('backToHero'), sidebarList: $('sidebarList'),
    courseMain: $('courseMain'), courseIntro: $('courseIntro'), introCards: $('introCards'),
    courseUser: $('courseUser'), courseStreakNum: $('courseStreakNum'), courseStreakFire: $('courseStreakFire'),
    lessonScreen: $('lessonScreen'), backToCourse: $('backToCourse'), lessonNavTitle: $('lessonNavTitle'),
    lessonStreakNum: $('lessonStreakNum'), lessonStreakFire: $('lessonStreakFire'),
    learnBody: $('learnBody'), seeBody: $('seeBody'), doBody: $('doBody'),
    codeEditor: $('codeEditor'), lineNums: $('lineNums'), runBtn: $('runBtn'),
    resetBtn: $('resetBtn'), hintBtn: $('hintBtn'), hintBox: $('hintBox'), resultMsg: $('resultMsg'),
    consoleBody: $('consoleBody'), clearConsole: $('clearConsole'),
    arenaBody: $('arenaBody'), arenaTitle: $('arenaTitle'),
    prevLesson: $('prevLesson'), nextLesson: $('nextLesson'),
    completeModal: $('completeModal'), completeMsg: $('completeMsg'), completeNext: $('completeNext')
};

// === THEME ===
function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
}
function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
}
initTheme();
document.querySelectorAll('.theme-toggle').forEach(t => t.addEventListener('click', toggleTheme));

// === ACCOUNTS ===
function getAccounts() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function saveAccount(u, d) { const a = getAccounts(); a[u] = d; localStorage.setItem(STORE_KEY, JSON.stringify(a)); }
function saveProgress() { if (!currentUser) return; saveAccount(currentUser, { currentLesson: state.currentLesson, completed: state.completed, streak: state.streak }); }
function showSavedAccounts() {
    const users = Object.keys(getAccounts());
    if (!users.length) { el.savedAccounts.classList.remove('show'); return; }
    el.savedAccounts.classList.add('show');
    el.accountsList.innerHTML = users.map(u => `<button class="account-btn" data-u="${u}">👤 ${u}</button>`).join('');
    el.accountsList.querySelectorAll('.account-btn').forEach(b => b.addEventListener('click', () => login(b.dataset.u)));
}
function login(u) {
    currentUser = u; localStorage.setItem(USER_KEY, u);
    const a = getAccounts(); if (a[u]) Object.assign(state, a[u]);
    else { state = { currentLesson: 0, completed: [], streak: { count: 0, last: null, today: false } }; saveProgress(); }
    updateStreak(); showHero();
}
function logout() { saveProgress(); currentUser = null; localStorage.removeItem(USER_KEY); show('login'); showSavedAccounts(); }

// === SCREENS ===
function show(s) {
    el.loginScreen.style.display = s === 'login' ? 'flex' : 'none';
    el.heroScreen.style.display = s === 'hero' ? 'flex' : 'none';
    el.courseScreen.style.display = s === 'course' ? 'flex' : 'none';
    el.lessonScreen.style.display = s === 'lesson' ? 'flex' : 'none';
}
function showHero() {
    show('hero');
    el.heroUser.textContent = currentUser;
    renderStreakAll();
    el.continueBtn.style.display = state.completed.length > 0 ? 'inline-flex' : 'none';
}
function showCourse() {
    show('course');
    el.courseUser.textContent = currentUser;
    renderSidebar(); renderIntroCards(); renderStreakAll();
}
function showLesson(idx) {
    if (idx === undefined) idx = state.currentLesson;
    state.currentLesson = idx; saveProgress();
    show('lesson'); renderLesson(); renderStreakAll();
}

// === STREAK ===
function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function daysSince() { if (!state.streak.last) return Infinity; return Math.floor((new Date(todayStr()) - new Date(state.streak.last.split('T')[0])) / 864e5); }
function updateStreak() { const d = daysSince(); if (d > 2) { state.streak.count = 0; state.streak.today = false; } else if (d >= 1) state.streak.today = false; saveProgress(); }
function recordStudy() {
    if (!state.streak.today) {
        const d = daysSince();
        if (d > 2 || !state.streak.last) state.streak.count = 1; else if (d >= 1) state.streak.count++;
        state.streak.last = new Date().toISOString(); state.streak.today = true;
        saveProgress(); renderStreakAll();
    }
}
function renderStreakAll() {
    const c = state.streak.count, inactive = !state.streak.today || c === 0;
    ['hero', 'course', 'lesson'].forEach(p => {
        const num = $(p + 'StreakNum'), fire = $(p + 'StreakFire');
        if (num) num.textContent = c;
        if (fire) fire.classList.toggle('inactive', inactive);
    });
}

// === SIDEBAR & INTRO ===
function renderSidebar() {
    let html = '';
    CATEGORIES.forEach(cat => {
        const items = LESSONS.filter(l => l.cat === cat.id);
        html += `<div class="sidebar-cat"><div class="sidebar-cat-title">${cat.icon} ${cat.title}</div>`;
        items.forEach((l, i) => {
            const idx = LESSONS.indexOf(l);
            const done = state.completed.includes(l.id);
            const active = idx === state.currentLesson;
            html += `<div class="sidebar-item${active ? ' active' : ''}${done ? ' completed' : ''}" data-idx="${idx}">
        <span class="item-icon">${done ? '✓' : '○'}</span>
        <span class="item-text">${l.title}</span>
      </div>`;
        });
        html += `</div>`;
    });
    el.sidebarList.innerHTML = html;
    el.sidebarList.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => showLesson(parseInt(item.dataset.idx)));
    });
}
function renderIntroCards() {
    el.introCards.innerHTML = CATEGORIES.map(cat => {
        const items = LESSONS.filter(l => l.cat === cat.id);
        const done = items.filter(l => state.completed.includes(l.id)).length;
        return `<div class="intro-card" data-cat="${cat.id}">
      <h3>${cat.icon} ${cat.title}</h3>
      <p>${items[0]?.title} → ${items[items.length - 1]?.title}</p>
      <div class="card-count">${done}/${items.length} สำเร็จ</div>
    </div>`;
    }).join('');
    el.introCards.querySelectorAll('.intro-card').forEach(c => {
        c.addEventListener('click', () => {
            const cat = c.dataset.cat;
            const first = LESSONS.findIndex(l => l.cat === cat);
            if (first >= 0) showLesson(first);
        });
    });
}

// === LESSON RENDERING ===
function getLesson() { return LESSONS[state.currentLesson] || LESSONS[0]; }
function renderLesson() {
    const L = getLesson();
    el.lessonNavTitle.textContent = L.title;
    el.arenaTitle.textContent = L.title;
    el.learnBody.innerHTML = L.learn || '';
    el.seeBody.innerHTML = L.see || '';
    el.doBody.innerHTML = L.doContent || '';
    // Arena
    if (L.arenaHTML) { el.arenaBody.innerHTML = L.arenaHTML; document.querySelector('.lesson-arena').style.display = 'flex'; }
    else { el.arenaBody.innerHTML = '<div class="arena-empty"><span>📝</span><p>บทนี้ใช้ Console Output</p></div>'; document.querySelector('.lesson-arena').style.display = 'flex'; }
    // Editor
    el.codeEditor.value = L.starterCode || ''; updateLines();
    el.hintBox.style.display = 'none';
    el.resultMsg.textContent = ''; el.resultMsg.className = 'result-msg';
    el.consoleBody.innerHTML = '';
    // Nav
    el.prevLesson.disabled = state.currentLesson <= 0;
    updateNextBtn();
    // Scroll
    document.querySelector('.lesson-guide').scrollTop = 0;
}
function updateNextBtn() {
    const done = state.completed.includes(getLesson().id);
    el.nextLesson.disabled = !done;
}

// === CODE EDITOR ===
function updateLines() {
    const n = el.codeEditor.value.split('\n').length;
    let s = ''; for (let i = 1; i <= Math.max(n, 5); i++)s += i + '\n';
    el.lineNums.textContent = s;
}
function resetCode() {
    const L = getLesson(); el.codeEditor.value = L.starterCode || ''; updateLines();
    el.resultMsg.textContent = ''; el.resultMsg.className = 'result-msg';
    el.hintBox.style.display = 'none'; el.consoleBody.innerHTML = '';
    if (L.arenaHTML) el.arenaBody.innerHTML = L.arenaHTML;
}
function toggleHint() {
    const L = getLesson();
    if (el.hintBox.style.display === 'none') { el.hintBox.style.display = 'block'; el.hintBox.textContent = L.hint || 'ไม่มีคำใบ้'; }
    else el.hintBox.style.display = 'none';
}

// === CODE EXECUTION ===
function runCode() {
    const code = el.codeEditor.value, L = getLesson();
    if (!code.trim()) { showResult('เขียนโค้ดก่อน!', false); return; }
    el.consoleBody.innerHTML = '';
    if (L.arenaHTML) el.arenaBody.innerHTML = L.arenaHTML;

    // Capture console.log
    const logs = [];
    const origLog = console.log;
    console.log = function () {
        const args = [...arguments].map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
        logs.push(args);
        addConsoleLine(args);
        origLog.apply(console, arguments);
    };

    try {
        const fn = new Function(code); fn();

        if (L.mode === 'dom') {
            setTimeout(() => {
                // Simulate interactions
                if (L.requireInput) { const inp = document.getElementById(L.inputId || 'nameInput'); if (inp && !inp.value) { inp.value = 'ทดสอบ'; inp.dispatchEvent(new Event('keyup')); } }
                if (L.requireClick) { const b = document.getElementById(L.requireClick); if (b) b.click(); }
                if (L.requireHover) { const t = document.getElementById(L.requireHover); if (t) t.dispatchEvent(new Event('mouseover')); }
                setTimeout(() => {
                    console.log = origLog;
                    if (L.validateFn()) { completeCurrent(); showResult('✅ สำเร็จ!', true); recordStudy(); }
                    else showResult('❌ ยังไม่ถูก ลองอีก!', false);
                }, 150);
            }, 100);
        } else {
            console.log = origLog;
            const output = logs.join('\n');
            if (L.validateFn(output)) { completeCurrent(); showResult('✅ สำเร็จ!', true); recordStudy(); }
            else showResult('❌ ยังไม่ถูก ลองอีก!', false);
        }
    } catch (err) {
        console.log = origLog;
        addConsoleLine('Error: ' + err.message, true);
        showResult('❌ Error: ' + err.message, false);
    }
}
function addConsoleLine(text, isErr) {
    const div = document.createElement('div');
    div.className = 'console-line' + (isErr ? ' error' : '');
    div.textContent = text;
    el.consoleBody.appendChild(div);
}
function completeCurrent() {
    const id = getLesson().id;
    if (!state.completed.includes(id)) { state.completed.push(id); saveProgress(); updateNextBtn(); }
}
function showResult(t, ok) { el.resultMsg.textContent = t; el.resultMsg.className = 'result-msg ' + (ok ? 'ok' : 'err'); }

// === NAV ===
function nextLesson() {
    if (state.currentLesson < LESSONS.length - 1) { state.currentLesson++; saveProgress(); renderLesson(); }
}
function prevLesson() {
    if (state.currentLesson > 0) { state.currentLesson--; saveProgress(); renderLesson(); }
}

// === EVENTS ===
el.loginForm.addEventListener('submit', e => { e.preventDefault(); const u = el.usernameInput.value.trim(); if (u) login(u); });
el.heroLogout.addEventListener('click', logout);
el.startBtn.addEventListener('click', showCourse);
el.continueBtn.addEventListener('click', () => { showCourse(); });
el.backToHero.addEventListener('click', () => { saveProgress(); showHero(); });
el.backToCourse.addEventListener('click', () => { saveProgress(); showCourse(); });
el.codeEditor.addEventListener('input', updateLines);
el.codeEditor.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); runCode(); }
    if (e.key === 'Tab') { e.preventDefault(); const s = el.codeEditor.selectionStart, end = el.codeEditor.selectionEnd; el.codeEditor.value = el.codeEditor.value.substring(0, s) + '  ' + el.codeEditor.value.substring(end); el.codeEditor.selectionStart = el.codeEditor.selectionEnd = s + 2; updateLines(); }
});
el.runBtn.addEventListener('click', runCode);
el.resetBtn.addEventListener('click', resetCode);
el.hintBtn.addEventListener('click', toggleHint);
el.clearConsole.addEventListener('click', () => { el.consoleBody.innerHTML = ''; });
el.prevLesson.addEventListener('click', prevLesson);
el.nextLesson.addEventListener('click', nextLesson);
el.completeNext.addEventListener('click', () => { el.completeModal.style.display = 'none'; nextLesson(); });

// === INIT ===
const savedUser = localStorage.getItem(USER_KEY);
if (savedUser) login(savedUser); else showSavedAccounts();
updateLines();
