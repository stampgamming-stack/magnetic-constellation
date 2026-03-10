// ===== CONFIG =====
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ===== APP STATE =====
let quizData = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let furthestQuestion = 0;
let userAnswers = [];
let isReviewing = false;
let currentScreen = 'screen-landing';
let uploadedImageBase64 = null;
let uploadedImageMimeType = null;

// Loading tips to cycle through
const loadingTips = [
    '💡 รู้ไหม? การทำ Quiz ช่วยให้จำเนื้อหาได้ดีขึ้น 50%!',
    '🧠 เทคนิค Active Recall คือวิธีเรียนที่ได้ผลที่สุด!',
    '📚 AI กำลังวิเคราะห์เนื้อหาและสร้างโจทย์ให้เหมาะกับคุณ...',
    '🎯 โจทย์จะถูกเรียงจากง่ายไปยากตามเนื้อหา!',
    '⚡ กำลังสร้างโจทย์ 10 ข้อพร้อมตัวเลือก 4 ตัว...',
];

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
    history.pushState({ screen: screenId }, '', '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== IMAGE HANDLING =====
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (max 4MB for Gemini)
    if (file.size > 4 * 1024 * 1024) {
        alert('รูปภาพขนาดใหญ่เกินไป (สูงสุด 4MB) กรุณาเลือกรูปใหม่');
        return;
    }

    uploadedImageMimeType = file.type;

    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Full = e.target.result;
        // Extract just the base64 data (remove data:image/...;base64, prefix)
        uploadedImageBase64 = base64Full.split(',')[1];

        // Show preview
        document.getElementById('image-preview').src = base64Full;
        document.getElementById('image-upload-content').style.display = 'none';
        document.getElementById('image-preview-container').style.display = 'flex';
    };
    reader.readAsDataURL(file);
}

function removeImage(event) {
    event.stopPropagation();
    uploadedImageBase64 = null;
    uploadedImageMimeType = null;
    document.getElementById('image-input').value = '';
    document.getElementById('image-upload-content').style.display = 'flex';
    document.getElementById('image-preview-container').style.display = 'none';
}

// ===== LEVEL DROPDOWN =====
function handleLevelChange() {
    const select = document.getElementById('input-level');
    const customInput = document.getElementById('input-level-custom');
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        customInput.focus();
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

// ===== BUILD PROMPT FOR GEMINI =====
function buildPrompt() {
    const role = document.getElementById('input-role').value.trim();
    const topic = document.getElementById('input-topic').value.trim();
    const levelSelect = document.getElementById('input-level').value;
    const levelCustom = document.getElementById('input-level-custom').value.trim();
    const focus = document.getElementById('input-focus').value.trim();

    const level = levelSelect === 'custom' ? levelCustom : levelSelect;

    // Validation
    if (!role) {
        showError('กรุณาระบุบทบาทของ AI (ช่อง 👔)');
        return null;
    }
    if (!topic && !uploadedImageBase64) {
        showError('กรุณาระบุเนื้อหาหรืออัปโหลดรูปภาพ (ช่อง 🎯)');
        return null;
    }
    if (!level) {
        showError('กรุณาเลือกระดับชั้น (ช่อง 👦)');
        return null;
    }

    let prompt = `คุณเป็น ${role} ผู้เชี่ยวชาญ

สร้างข้อสอบแบบปรนัย (Multiple Choice) จำนวน 10 ข้อ จากเนื้อหาต่อไปนี้:

📚 เนื้อหา/หัวข้อ: ${topic || '(ดูจากรูปภาพที่แนบมา)'}
📊 ระดับความยาก: เหมาะสำหรับนักเรียนระดับ ${level}`;

    if (focus) {
        prompt += `\n🎯 เน้นเรื่อง: ${focus}`;
    }

    prompt += `

📌 กฎสำคัญ:
- สร้างโจทย์ 10 ข้อ ไล่ลำดับจากง่ายไปยาก
- แต่ละข้อมีตัวเลือก 4 ตัว
- ข้อถูกต้องต้องมีเพียง 1 ตัวเลือก
- ถ้ามีรูปภาพแนบมา ให้อ่านเนื้อหาจากรูปและใช้สร้างโจทย์
- ตอบเป็น JSON เท่านั้น ห้ามเพิ่มข้อความอื่นใดก่อนหรือหลัง JSON

📋 ตอบในรูปแบบ JSON array นี้เท่านั้น:
[{"question":"คำถาม","choices":["ตัวเลือก1","ตัวเลือก2","ตัวเลือก3","ตัวเลือก4"],"correctIndex":0}]

ห้ามใส่ \`\`\`json หรือ \`\`\` ครอบ JSON ตอบ JSON array ตรงๆ เลย`;

    return prompt;
}

// ===== CALL GROQ API =====
async function callGroqAPI(prompt) {
    const requestBody = {
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'คุณเป็นผู้ช่วยสร้างข้อสอบ ตอบเป็น JSON array เท่านั้น ห้ามเพิ่มข้อความอื่น ห้ามใส่ ```json หรือ ``` ครอบ'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.7,
        max_tokens: 4096,
    };

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
        throw new Error('AI ไม่ได้ส่งคำตอบกลับมา กรุณาลองใหม่');
    }

    return text;
}

// ===== PARSE QUIZ RESPONSE =====
function parseQuizResponse(responseText) {
    // Clean up response — remove markdown code fences if any
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    // Try to find JSON array in the response
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
        cleaned = jsonMatch[0];
    }

    const parsed = JSON.parse(cleaned);

    // Validate structure
    if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('AI ตอบกลับมาไม่ถูกรูปแบบ');
    }

    // Validate each question
    const validated = parsed.map((q, i) => {
        if (!q.question || !Array.isArray(q.choices) || q.choices.length < 2 || typeof q.correctIndex !== 'number') {
            throw new Error(`ข้อที่ ${i + 1} มีรูปแบบไม่ถูกต้อง`);
        }
        // Ensure 4 choices
        while (q.choices.length < 4) {
            q.choices.push('(ไม่มีตัวเลือก)');
        }
        // Ensure correctIndex is valid
        if (q.correctIndex < 0 || q.correctIndex >= q.choices.length) {
            q.correctIndex = 0;
        }
        return {
            question: q.question,
            choices: q.choices.slice(0, 4),
            correctIndex: q.correctIndex
        };
    });

    return validated.slice(0, 10); // Max 10 questions
}

// ===== MAIN GENERATE HANDLER =====
let loadingTipInterval = null;

async function handleGenerate() {
    const prompt = buildPrompt();
    if (!prompt) return;

    // Hide form, show loading
    hideError();
    document.getElementById('btn-generate').style.display = 'none';
    document.querySelector('.prompt-card').style.display = 'none';
    document.getElementById('features-row').style.display = 'none';
    document.getElementById('loading-container').classList.add('active');

    // Cycle loading tips
    let tipIndex = 0;
    const tipsEl = document.getElementById('loading-tips');
    tipsEl.textContent = loadingTips[0];
    loadingTipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % loadingTips.length;
        tipsEl.style.opacity = '0';
        setTimeout(() => {
            tipsEl.textContent = loadingTips[tipIndex];
            tipsEl.style.opacity = '1';
        }, 200);
    }, 3000);

    try {
        const responseText = await callGroqAPI(prompt);
        quizData = parseQuizResponse(responseText);

        if (quizData.length === 0) {
            throw new Error('AI ไม่สามารถสร้างโจทย์ได้ ลองเปลี่ยนเนื้อหาหรือรายละเอียดเพิ่ม');
        }

        // Success — start quiz
        clearInterval(loadingTipInterval);
        currentQuestion = 0;
        score = 0;
        answered = false;
        furthestQuestion = 0;
        userAnswers = [];
        isReviewing = false;

        showScreen('screen-quiz');
        loadQuestion();

    } catch (error) {
        console.error('Gemini API Error:', error);
        clearInterval(loadingTipInterval);

        // Show form again with error
        document.getElementById('loading-container').classList.remove('active');
        document.querySelector('.prompt-card').style.display = 'block';
        document.getElementById('btn-generate').style.display = '';
        document.getElementById('features-row').style.display = '';

        showError(error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
}

// ===== ERROR HANDLING =====
function showError(message) {
    const errorBox = document.getElementById('error-box');
    document.getElementById('error-text').textContent = message;
    errorBox.style.display = 'flex';
}

function hideError() {
    document.getElementById('error-box').style.display = 'none';
}

// ===== QUIZ LOGIC =====
function loadQuestion() {
    const data = quizData[currentQuestion];
    const previousAnswer = userAnswers[currentQuestion];
    isReviewing = !!previousAnswer;
    answered = isReviewing;

    const totalQ = quizData.length;

    document.getElementById('quiz-counter').textContent = `ข้อ ${currentQuestion + 1} / ${totalQ}`;
    document.getElementById('quiz-score-live').textContent = `⭐ ${score} คะแนน`;
    document.getElementById('progress-fill').style.width = `${((furthestQuestion + 1) / totalQ) * 100}%`;
    document.getElementById('question-badge').textContent = `❓ ข้อที่ ${currentQuestion + 1}`;

    // Navigation buttons
    const btnBack = document.getElementById('btn-back');
    const btnForward = document.getElementById('btn-forward');
    btnBack.disabled = currentQuestion === 0;
    if (isReviewing && currentQuestion < furthestQuestion) {
        btnForward.classList.remove('hidden');
    } else {
        btnForward.classList.add('hidden');
    }

    document.getElementById('review-badge').classList.toggle('show', isReviewing);
    document.getElementById('question-text').textContent = data.question;

    // Build choices
    const labels = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    data.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span class="choice-label">${labels[index]}</span><span>${choice}</span>`;

        if (isReviewing) {
            btn.disabled = true;
            if (index === data.correctIndex) {
                btn.classList.add('review-correct');
            } else if (index === previousAnswer.selectedIndex && !previousAnswer.wasCorrect) {
                btn.classList.add('review-wrong');
            } else {
                btn.classList.add('review-neutral');
            }
        } else {
            btn.onclick = () => selectAnswer(index);
        }
        container.appendChild(btn);
    });

    // Feedback
    const toast = document.getElementById('feedback-toast');
    if (isReviewing) {
        toast.className = previousAnswer.wasCorrect ? 'feedback-toast correct-toast show' : 'feedback-toast wrong-toast show';
        toast.innerHTML = previousAnswer.wasCorrect ? '✅ คุณตอบถูกข้อนี้' : '❌ คุณตอบผิดข้อนี้ — ดูเฉลยด้านบน';
    } else {
        toast.className = 'feedback-toast';
        toast.style.display = 'none';
    }
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const data = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.choice-btn');
    const toast = document.getElementById('feedback-toast');
    const wasCorrect = selectedIndex === data.correctIndex;

    userAnswers[currentQuestion] = { selectedIndex, wasCorrect };
    buttons.forEach(btn => btn.disabled = true);

    if (wasCorrect) {
        score++;
        buttons[selectedIndex].classList.add('correct');
        toast.className = 'feedback-toast correct-toast show';
        toast.innerHTML = '✅ ถูกต้อง! เก่งมาก~ 🎉';
        document.getElementById('quiz-score-live').textContent = `⭐ ${score} คะแนน`;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[data.correctIndex].classList.add('correct');
        toast.className = 'feedback-toast wrong-toast show';
        toast.innerHTML = '❌ ผิดนะ~ ลองดูเฉลยด้านบน';
    }

    setTimeout(() => {
        currentQuestion++;
        furthestQuestion = currentQuestion;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

// ===== NAVIGATION =====
function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function goForward() {
    if (currentQuestion < furthestQuestion) {
        currentQuestion++;
        loadQuestion();
    }
}

// ===== RESULT =====
function showResult() {
    showScreen('screen-result');

    const totalQ = quizData.length;
    const wrong = totalQ - score;
    document.getElementById('result-score').textContent = `${score} / ${totalQ}`;
    document.getElementById('stat-correct').textContent = score;
    document.getElementById('stat-wrong').textContent = wrong;

    const title = document.querySelector('.result-title');
    const subtitle = document.getElementById('result-subtitle');
    const trophy = document.getElementById('trophy-icon');
    const pct = score / totalQ;

    if (pct >= 0.9) {
        title.textContent = '🎉 สุดยอดไปเลย!';
        subtitle.textContent = 'คุณเก่งมาก ทำได้เกือบเต็มเลย!';
        trophy.textContent = '🏆';
    } else if (pct >= 0.7) {
        title.textContent = '🎉 ยอดเยี่ยมมาก!';
        subtitle.textContent = 'คุณทำได้ดีเลยนะ!';
        trophy.textContent = '🥇';
    } else if (pct >= 0.5) {
        title.textContent = '👏 ทำได้ดี!';
        subtitle.textContent = 'พยายามอีกนิดจะสุดยอดเลย!';
        trophy.textContent = '🥈';
    } else {
        title.textContent = '💪 สู้ๆ นะ!';
        subtitle.textContent = 'ลองทบทวนแล้วทำใหม่อีกรอบ!';
        trophy.textContent = '📖';
    }

    // Stars
    const starsRow = document.getElementById('stars-row');
    starsRow.innerHTML = '';
    const filledStars = Math.round(pct * 5);
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = i < filledStars ? '⭐' : '☆';
        if (i >= filledStars) star.style.opacity = '0.3';
        starsRow.appendChild(star);
    }

    // AI Feedback — use prompt context
    const role = document.getElementById('input-role').value.trim();
    const feedbackText = document.getElementById('ai-feedback-text');

    if (pct >= 0.8) {
        feedbackText.innerHTML = `💡 คุณทำได้เยี่ยมมาก! ${role ? `ในฐานะ${role} ` : ''}ระบบ AI วิเคราะห์พบว่าคุณมีความเข้าใจเนื้อหาอยู่ในระดับ <strong>ดีเยี่ยม</strong> ลองท้าทายตัวเองด้วยเนื้อหาที่ยากขึ้นดูนะ! 🚀`;
    } else if (pct >= 0.5) {
        feedbackText.innerHTML = `💡 คุณทำได้ดีหลายข้อเลย! แต่ระบบ AI พบว่ายังมีบางจุดที่ต้องทบทวน ลองกด <strong>ย้อนกลับ</strong> ไปดูข้อที่ตอบผิดแล้วศึกษาเพิ่มเติมนะ 📚`;
    } else {
        feedbackText.innerHTML = `💡 ไม่ต้องกังวลนะ! การทำ Quiz คือวิธีเรียนรู้ที่ดีที่สุด ลองกลับไปอ่านเนื้อหาอีกรอบแล้วมาท้าทายใหม่ สู้ๆ! 💪`;
    }

    launchConfetti();
}

// ===== CONFETTI =====
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#58CC02', '#1CB0F6', '#CE82FF', '#FF9600', '#FF86D0', '#FFD700', '#FF4B4B'];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.animationDelay = Math.random() * 1.5 + 's';
        piece.style.width = (Math.random() * 8 + 6) + 'px';
        piece.style.height = (Math.random() * 12 + 8) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }
    setTimeout(() => { container.innerHTML = ''; }, 5000);
}

// ===== RESET =====
function resetApp() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    furthestQuestion = 0;
    userAnswers = [];
    isReviewing = false;
    quizData = [];

    // Show form again
    document.querySelector('.prompt-card').style.display = 'block';
    document.getElementById('btn-generate').style.display = '';
    document.getElementById('features-row').style.display = '';
    document.getElementById('loading-container').classList.remove('active');
    hideError();

    showScreen('screen-landing');
}

// ===== BROWSER BACK PROTECTION =====
history.pushState({ screen: 'screen-landing' }, '', '');

window.addEventListener('popstate', function (e) {
    if (currentScreen === 'screen-quiz') {
        history.pushState({ screen: 'screen-quiz' }, '', '');
        document.getElementById('back-modal').classList.add('show');
    } else if (currentScreen === 'screen-result') {
        history.pushState({ screen: 'screen-landing' }, '', '');
        resetApp();
    } else {
        history.back();
    }
});

function confirmLeave() {
    document.getElementById('back-modal').classList.remove('show');
    resetApp();
}

function cancelLeave() {
    document.getElementById('back-modal').classList.remove('show');
}
