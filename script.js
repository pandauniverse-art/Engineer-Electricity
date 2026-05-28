let selectedLevel = 'engineer';
let selectedCategory = 'all';
let currentMode = 'written'; 

let mockTimerInterval = null;
let mockTimeLeft = 0;
let mockQuestions = [];
let currentMockIdx = 0;
let mockScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const levelSelect = document.getElementById("levelSelect");
    const modeSelect = document.getElementById("modeSelect");

    if (levelSelect) selectedLevel = levelSelect.value;
    if (modeSelect) currentMode = modeSelect.value;

    if (levelSelect) {
        levelSelect.addEventListener("change", (e) => {
            selectedLevel = e.target.value;
            renderSidebarRequirements();
            if (currentMode === 'mockexam') {
                initMockExamCore(selectedLevel);
            } else {
                selectedCategory = 'all';
                renderTabs();
                renderConcepts();
            }
        });
    }

    if (modeSelect) {
        modeSelect.addEventListener("change", (e) => {
            currentMode = e.target.value;
            clearInterval(mockTimerInterval); 

            const cGrid = document.getElementById("conceptList");
            const mockContainer = document.getElementById("mockExamContainer");
            const sidebarSection = document.getElementById("sidebarSection");
            const mainLayoutStructure = document.getElementById("mainLayoutStructure");

            if (currentMode === 'mockexam') {
                if (sidebarSection) sidebarSection.style.display = 'none';
                if (mainLayoutStructure) mainLayoutStructure.style.gridTemplateColumns = '1fr';
                if (cGrid) cGrid.style.display = 'none';
                
                if (mockContainer) {
                    mockContainer.style.display = 'block';
                    initMockExamCore(selectedLevel);
                }
            } else {
                if (mockContainer) mockContainer.style.display = 'none';
                if (cGrid) cGrid.style.display = 'flex';
                if (sidebarSection) sidebarSection.style.display = 'flex';
                if (mainLayoutStructure) {
                    mainLayoutStructure.style.gridTemplateColumns = window.innerWidth <= 768 ? '1fr' : '320px 1fr';
                }
                
                selectedCategory = 'all';
                renderTabs();
                renderConcepts();
            }
        });
    }

    renderSidebarRequirements();
    renderTabs();
    renderConcepts();
}

function renderSidebarRequirements() {
    const requirementContainer = document.getElementById("qualificationInfo");
    if (!requirementContainer) return;

    const currentReq = qualificationRequirements.find(req => {
        if (selectedLevel === "craftsman") return req.grade === "전기기능사";
        if (selectedLevel === "industrial_engineer") return req.grade === "전기산업기사";
        return req.grade === "전기기사";
    });

    if (currentReq) {
        let detailsHtml = currentReq.details.map(d => `<li>${d}</li>`).join("");
        requirementContainer.innerHTML = `
            <h5>${currentReq.icon} ${currentReq.grade} 요건</h5>
            <p style="font-size:0.9rem; margin: 0 0 10px 0;"><strong>요약:</strong> ${currentReq.summary}</p>
            <ul class="details-list">${detailsHtml}</ul>
        `;
    }
}

function renderTabs() {
    const categoryContainer = document.getElementById("categoryList");
    const mockSettingsContainer = document.getElementById("mockExamInfo");
    if (!categoryContainer) return;

    categoryContainer.innerHTML = "";
    const filteredCategories = electricianData.categories.filter(cat => 
        cat.mode === currentMode && cat.levels.includes(selectedLevel)
    );
    
    if (filteredCategories.length === 0) {
        categoryContainer.innerHTML = "<p class='no-data'>활성화된 과목 카테고리가 없습니다.</p>";
    } else {
        categoryContainer.innerHTML += `
            <button class="category-btn" style="border-left: 5px solid #64748b;" onclick="filterBySpecificCategory('all')">
                <span>📚</span> 전체 보기
            </button>
        `;
        filteredCategories.forEach(cat => {
            categoryContainer.innerHTML += `
                <button class="category-btn" style="border-left: 5px solid ${cat.color};" onclick="filterBySpecificCategory('${cat.id}')">
                    <span>${cat.icon}</span> ${cat.name}
                </button>
            `;
        });
    }

    if (mockSettingsContainer) {
        const settings = mockExamSettings[selectedLevel];
        if (settings) {
            mockSettingsContainer.innerHTML = `
                <h5>📋 모의고사 스펙</h5>
                <ul class="details-list" style="padding-left:15px; margin:0;">
                    <li><strong>시험 시간:</strong> ${settings.timeLimit / 60}분</li>
                    <li><strong>문항 수:</strong> ${settings.totalQuestions}문항</li>
                    <li><strong>합격 기준:</strong> ${settings.passingScore}점 이상</li>
                </ul>
            `;
        }
    }
}

function renderConcepts() {
    const conceptContainer = document.getElementById("conceptList");
    if (!conceptContainer) return;

    conceptContainer.innerHTML = "";
    const filteredConcepts = electricianData.concepts.filter(con => {
        const isLevelMatch = con.levels.includes(selectedLevel);
        const categoryObj = electricianData.categories.find(c => c.id === con.category);
        const isModeMatch = categoryObj && categoryObj.mode === currentMode;
        const isCategoryMatch = selectedCategory === 'all' || con.category === selectedCategory;
        return isLevelMatch && isModeMatch && isCategoryMatch;
    });

    if (filteredConcepts.length === 0) {
        conceptContainer.innerHTML = "<p class='no-data'>조건에 맞는 마스터 개념 데이터가 존재하지 않습니다.</p>";
        return;
    }

    filteredConcepts.forEach(con => {
        /* 🚨 공식 박스 상하 패딩 및 글자 크기 콤팩트 조절 인라인 스타일 반영 */
        conceptContainer.innerHTML += `
            <div class="concept-card" id="concept-${con.id}">
                <div class="card-header">
                    <span class="freq-badge freq-${con.frequency}">빈도: ${con.frequency}</span>
                    <h4 class="concept-title">${con.title}</h4>
                </div>
                <p class="concept-def">${con.definition}</p>
               ${con.formula ? `<div class="formula-box" style="background:var(--primary-light); padding:4px 15px; border-radius:8px; text-align:center; margin-top:4px; font-size:1rem; --mjx-margin: 0 !important;"><style>.formula-box mjx-container{margin:0 !important; padding:0 !important;}</style>${con.formula.replace(/\\n/g, '<br/>')}</div>` : ''}
            </div>
        `;
    });
    
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
    }
}

function filterBySpecificCategory(categoryId) {
    selectedCategory = categoryId;
    renderConcepts();
}

function initMockExamCore(gradeKey) {
    const config = mockExamSettings[gradeKey];
    if (!config) return;

    const matchPool = electricianData.concepts.filter(c => config.subjects.includes(c.category));
    const finalCount = Math.min(config.totalQuestions, matchPool.length, 20);

    mockQuestions = matchPool.sort(() => 0.5 - Math.random()).slice(0, finalCount);
    currentMockIdx = 0;
    mockScore = 0;
    mockTimeLeft = config.timeLimit;

    mockTimerInterval = setInterval(() => {
        mockTimeLeft--;
        if (mockTimeLeft <= 0) {
            clearInterval(mockTimerInterval);
            alert('시험 제한시간이 만료되었습니다. 즉시 답안지를 회수합니다.');
            renderMockResultScreen();
        }
        updateMockTimerUI();
    }, 1000);

    renderMockQuestionScreen();
}

function updateMockTimerUI() {
    const el = document.getElementById('mockClock');
    if (!el) return;
    const min = Math.floor(mockTimeLeft / 60);
    const sec = mockTimeLeft % 60;
    el.innerText = `⏳ 남은 시간: ${min}분 ${sec}초`;
}

function renderMockQuestionScreen() {
    const container = document.getElementById('mockExamContainer');
    const q = mockQuestions[currentMockIdx];
    if (!container || !q) return;

    const pool = electricianData.concepts.filter(c => c.id !== q.id);
    const wrongAnswers = pool.sort(() => 0.5 - Math.random()).slice(0, 3).map(c => c.title);
    const shuffledOptions = [...wrongAnswers, q.title].sort(() => 0.5 - Math.random());
    const numberIcons = ['①', '②', '③', '④'];

    const min = Math.floor(mockTimeLeft / 60);
    const sec = mockTimeLeft % 60;

    /* 🚨 모의고사 버튼 컴팩트 패딩 디자인 속성 일괄 일치 반영 */
    container.innerHTML = `
        <div class="mock-paper-box">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #e2e8f0; padding-bottom:15px; margin-bottom:20px;">
                <span style="font-weight:bold; color:var(--primary); font-size:1.2rem;"><i class="fas fa-edit"></i> CBT 국가기술자격 실전 모의고사 수험실</span>
                <span id="mockClock" style="font-weight:bold; color:#e53e3e; background:#fff5f5; padding:6px 12px; border-radius:6px;">⏳ 남은 시간: ${min}분 ${sec}초</span>
            </div>
            
            <div style="color:var(--text-sub); font-weight:bold; margin-bottom:8px; font-size:0.9rem;">문항 번호: ${currentMockIdx + 1} / ${mockQuestions.length}</div>
            <div style="font-size:1.3rem; font-weight:bold; line-height:1.6; color:var(--text-main); margin-bottom:30px; word-break:keep-all;">
                ${q.definition}
            </div>
            
            <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
                ${shuffledOptions.map((opt, index) => `
                    <button class="mock-opt-btn" data-answer="${opt}">
                        <span style="font-weight:bold; color:var(--primary); margin-right:12px; font-size:1.1rem;">${numberIcons[index]}</span>
                        <span style="font-weight:500; color:var(--text-main);">${opt}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    container.querySelectorAll('.mock-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const userChoice = btn.getAttribute('data-answer');
            if (userChoice === q.title) mockScore++;

            currentMockIdx++;
            if (currentMockIdx < mockQuestions.length) {
                renderMockQuestionScreen();
            } else {
                clearInterval(mockTimerInterval);
                renderMockResultScreen();
            }
        });
    });
}

function renderMockResultScreen() {
    const container = document.getElementById('mockExamContainer');
    const scorePct = Math.round((mockScore / mockQuestions.length) * 100);
    const isPass = scorePct >= 60;

    container.innerHTML = `
        <div class="mock-paper-box" style="text-align:center; padding:50px 20px;">
            <div style="font-size:4.5rem; margin-bottom:15px;">${isPass ? '🎉' : '😰'}</div>
            <h2 style="font-size:1.8rem; font-weight:bold; color:var(--text-main); margin-bottom:10px;">
                ${isPass ? '모의고사 합격 기준 충족!' : '불합격 (커트라인 미달)'}
            </h2>
            <p style="font-size:1.2rem; color:var(--text-sub); margin-bottom:30px;">
                최종 백분율 점수: <strong style="font-size:1.5rem; color:${isPass ? '#2f855a' : '#c53030'}">${scorePct}점</strong> (${mockQuestions.length}문항 중 ${mockScore}개 취득)
            </p>
            <button onclick="location.reload()" style="background:var(--primary); color:white; border:none; padding:12px 28px; border-radius:6px; font-size:1rem; font-weight:bold; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                답안지 반납 및 초기 화면으로 리로드
            </button>
        </div>
    `;
}

window.addEventListener('resize', () => {
    const mainLayoutStructure = document.getElementById("mainLayoutStructure");
    if (mainLayoutStructure && currentMode !== 'mockexam') {
        mainLayoutStructure.style.gridTemplateColumns = window.innerWidth <= 768 ? '1fr' : '320px 1fr';
    }
});
