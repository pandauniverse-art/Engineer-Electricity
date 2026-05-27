// 상태 관리 변수들
let currentMode = 'written'; // 'written', 'practical', 'requirements', 'mockexam'
let selectedCategory = 'all';
let searchQuery = '';
let freqFilter = 'all';
let viewFilter = 'all';
let currentSort = 'default';

// 모의고사 제어 변수
let isMockExamActive = false;
let mockTimerInterval = null;
let mockTimeLeft = 0;
let currentMockGrade = '';

// 로컬 스토리지
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
let progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress)) || [];

// DOM 객체 바인딩
const modeButtons = document.querySelectorAll('.mode-btn');
const conceptsGrid = document.getElementById('conceptsGrid');
const requirementsSection = document.getElementById('requirementsSection');
const mockExamSection = document.getElementById('mockExamSection');
const searchSection = document.querySelector('.search-section');
const statsSection = document.querySelector('.stats-section');
const categoryTabs = document.getElementById('categoryTabs');
const quizBtn = document.getElementById('startQuizBtn');
const resultCountEl = document.getElementById('resultCount');
const noResultsEl = document.getElementById('noResults');

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initEventListeners();
    renderTabs();
    updateStats();
    renderConcepts();
});

function initDarkMode() {
    const isDark = localStorage.getItem(STORAGE_KEYS.darkMode) === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function initEventListeners() {
    // 다크모드 토글
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEYS.darkMode, isDark);
        document.getElementById('darkModeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // 상단 대메뉴 탭 토글 분기 제어
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentMode = btn.getAttribute('data-mode');
            selectedCategory = 'all';
            
            // 모든 특수 컨테이너 초기 초기화 숨김
            if(requirementsSection) requirementsSection.style.display = 'none';
            if(mockExamSection) mockExamSection.style.display = 'none';
            
            if (currentMode === 'requirements') {
                toggleMainLayout(false);
                if(requirementsSection) {
                    requirementsSection.style.display = 'block';
                    renderRequirements();
                }
            } else if (currentMode === 'mockexam') {
                toggleMainLayout(false);
                if(mockExamSection) {
                    mockExamSection.style.display = 'block';
                    renderMockExamDashboard();
                }
            } else {
                toggleMainLayout(true);
                renderTabs();
                renderConcepts();
            }
        });
    });

    // 레이아웃 스위칭 보조함수
    function toggleMainLayout(show) {
        const displayState = show ? 'block' : 'none';
        if(conceptsGrid) conceptsGrid.style.display = show ? 'grid' : 'none';
        if(searchSection) searchSection.style.display = displayState;
        if(statsSection) statsSection.style.display = show ? 'flex' : 'none';
        if(categoryTabs) categoryTabs.style.display = show ? 'flex' : 'none';
        if(quizBtn) quizBtn.style.display = show ? 'inline-flex' : 'none';
        if(resultCountEl) resultCountEl.style.display = displayState;
        if(!show && noResultsEl) noResultsEl.style.display = 'none';
    }

    // 검색 창 연동
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        clearSearch.style.display = searchQuery ? 'block' : 'none';
        renderConcepts();
    });

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearch.style.display = 'none';
        renderConcepts();
    });

    // 필터 박스 제어
    document.getElementById('frequencyFilter').addEventListener('change', (e) => {
        freqFilter = e.target.value;
        renderConcepts();
    });

    document.getElementById('viewFilter').addEventListener('change', (e) => {
        viewFilter = e.target.value;
        renderConcepts();
    });

    // 가나다 정렬 제어
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            renderConcepts();
        });
    });

    // 모달창 닫기 연동 (모의고사 타이머 리셋 예외 공통처리)
    document.getElementById('modalClose').addEventListener('click', closeConceptModal);
    document.getElementById('modalOverlay').addEventListener('click', closeConceptModal);

    document.getElementById('startQuizBtn').addEventListener('click', () => startQuiz(false));
    document.getElementById('quizModalClose').addEventListener('click', closeQuizModal);
    document.getElementById('quizModalOverlay').addEventListener('click', closeQuizModal);
    document.getElementById('quizEndBtn').addEventListener('click', closeQuizModal);
}

function renderTabs() {
    const filteredCats = electricianData.categories.filter(c => c.mode === currentMode);
    let html = `<button class="tab-btn ${selectedCategory === 'all' ? 'active' : ''}" data-id="all">전체</button>`;
    filteredCats.forEach(cat => {
        html += `<button class="tab-btn ${selectedCategory === cat.id ? 'active' : ''}" data-id="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });
    categoryTabs.innerHTML = html;

    categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.getAttribute('data-id');
            renderConcepts();
        });
    });
}

function updateStats() {
    const activeConcepts = electricianData.concepts.filter(c => {
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);
        return cat && cat.mode === currentMode;
    });
    document.getElementById('totalConcepts').innerText = activeConcepts.length;
    document.getElementById('favoritesCount').innerText = favorites.filter(id => activeConcepts.some(c => c.id === id)).length;
    document.getElementById('learnedCount').innerText = progress.filter(id => activeConcepts.some(c => c.id === id)).length;
}

function getFilteredConcepts() {
    let items = electricianData.concepts.filter(c => {
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);
        if (!cat || cat.mode !== currentMode) return false;
        if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
        return true;
    });

    if (freqFilter !== 'all') items = items.filter(c => c.frequency === freqFilter);

    if (viewFilter === 'favorites') items = items.filter(c => favorites.includes(c.id));
    else if (viewFilter === 'learned') items = items.filter(c => progress.includes(c.id));
    else if (viewFilter === 'unlearned') items = items.filter(c => !progress.includes(c.id));

    if (searchQuery) {
        items = items.filter(c => c.title.toLowerCase().includes(searchQuery) || c.definition.toLowerCase().includes(searchQuery));
    }

    if (currentSort === 'title') {
        items.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    } else if (currentSort === 'frequency') {
        const score = { '상': 3, '중': 2, '하': 1 };
        items.sort((a, b) => score[b.frequency] - score[a.frequency]);
    }
    return items;
}

function renderConcepts() {
    const list = getFilteredConcepts();
    resultCountEl.innerText = `검색 결과: ${list.length}건`;

    if (list.length === 0) {
        conceptsGrid.innerHTML = '';
        noResultsEl.style.display = 'block';
        return;
    }
    noResultsEl.style.display = 'none';

    let html = '';
    list.forEach(c => {
        const isFav = favorites.includes(c.id);
        const isLearned = progress.includes(c.id);
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);

        html += `
            <div class="concept-card ${isLearned ? 'learned' : ''}" data-id="${c.id}">
                <div class="card-header">
                    <span class="badge" style="background:${cat ? cat.color : '#ccc'}">${cat ? cat.name : ''}</span>
                    <span class="freq">빈도:${c.frequency}</span>
                </div>
                <h3 class="card-title">${c.title}</h3>
                <p class="card-desc">${c.definition.length > 50 ? c.definition.substring(0, 50) + '...' : c.definition}</p>
                <div class="card-footer">
                    <button class="card-action-btn fav-toggle-btn ${isFav ? 'active' : ''}" data-id="${c.id}">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="card-action-btn check-toggle-btn ${isLearned ? 'active' : ''}" data-id="${c.id}">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </div>
        `;
    });

    conceptsGrid.innerHTML = html;
    updateStats();

    conceptsGrid.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-action-btn')) return;
            openConceptModal(parseInt(card.getAttribute('data-id')));
        });
    });

    conceptsGrid.querySelectorAll('.fav-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.getAttribute('data-id')));
        });
    });

    conceptsGrid.querySelectorAll('.check-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProgress(parseInt(btn.getAttribute('data-id')));
        });
    });
}

function renderRequirements() {
    requirementsSection.innerHTML = `
        <h2 style="margin-bottom: 20px; font-weight:700; color:var(--text-main); font-size:1.5rem;">📋 국가기술자격 응시 자격 요건 안내</h2>
        <div class="req-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            ${qualificationRequirements.map(req => `
                <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 25px; height: auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <span style="font-size: 2rem;">${req.icon}</span>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0; color:var(--text-main);">${req.grade}</h3>
                    </div>
                    <p style="font-weight: 600; color: var(--primary, #ea580c); margin-bottom: 18px; font-size: 0.95rem; background: var(--primary-light); padding: 4px 10px; border-radius: 6px;">${req.summary}</p>
                    <ul style="padding-left: 20px; margin: 0; color: var(--text-sub); font-size: 0.9rem; line-height: 1.7; box-sizing:border-box;">
                        ${req.details.map(detail => `<li style="margin-bottom: 10px; word-break: keep-all; list-style-type: disc;">${detail}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

// 모의고사 전용 허브 대시보드 출력
function renderMockExamDashboard() {
    mockExamSection.innerHTML = `
        <h2 style="margin-bottom: 10px; font-weight:700; color:var(--text-main); font-size:1.5rem;"><i class="fas fa-graduation-cap"></i> 실전 기출 모의고사 시스템</h2>
        <p style="color:var(--text-sub); margin-bottom: 30px; font-size:0.95rem;">실제 한국산업인력공단(CBT) 시험 규정에 따른 문항 구성과 과목 제한시간 타이머가 활성화됩니다.</p>
        
        <div class="mock-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 25px; height: auto;">
                <h3>⚡ 전기기능사 모의고사</h3>
                <p style="color:var(--text-sub); font-size:0.85rem; margin: 8px 0 15px 0;">이론 / 기기 / 설비 혼합형 범위</p>
                <ul style="font-size:0.9rem; color:var(--text-main); margin-bottom:20px; padding-left:15px; line-height:1.6;">
                    <li>문항 수: 60문항</li>
                    <li>시험 시간: 60분</li>
                    <li>합격 기준: 60점 이상 (36문항)</li>
                </ul>
                <button class="btn" id="btnMockCraftsman" style="width:100%; background:var(--primary); color:white; font-weight:600;">시험 시작</button>
            </div>
            
            <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 25px; height: auto;">
                <h3>⚙️ 전기산업기사 모의고사</h3>
                <p style="color:var(--text-sub); font-size:0.85rem; margin: 8px 0 15px 0;">5개 과목별 정형 추출 패키지</p>
                <ul style="font-size:0.9rem; color:var(--text-main); margin-bottom:20px; padding-left:15px; line-height:1.6;">
                    <li>문항 수: 100문항</li>
                    <li>시험 시간: 150분 (2시간 30분)</li>
                    <li>합격 기준: 평균 60점 (과락 주의)</li>
                </ul>
                <button class="btn" id="btnMockIndustrial" style="width:100%; background:#8B5CF6; color:white; font-weight:600;">시험 시작</button>
            </div>

            <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 25px; height: auto;">
                <h3>🏆 전기기사 모의고사</h3>
                <p style="color:var(--text-sub); font-size:0.85rem; margin: 8px 0 15px 0;">제어공학 포함 종합 100문항 세트</p>
                <ul style="font-size:0.9rem; color:var(--text-main); margin-bottom:20px; padding-left:15px; line-height:1.6;">
                    <li>문항 수: 100문항</li>
                    <li>시험 시간: 150분 (2시간 30분)</li>
                    <li>합격 기준: 평균 60점 (과락 주의)</li>
                </ul>
                <button class="btn" id="btnMockEngineer" style="width:100%; background:#10B981; color:white; font-weight:600;">시험 시작</button>
            </div>
        </div>
    `;

    document.getElementById('btnMockCraftsman').onclick = () => startQuiz(true, 'craftsman');
    document.getElementById('btnMockIndustrial').onclick = () => startQuiz(true, 'industrial');
    document.getElementById('btnMockEngineer').onclick = () => startQuiz(true, 'engineer');
}

function toggleFavorite(id) {
    if (favorites.includes(id)) favorites = favorites.filter(fId => fId !== id);
    else favorites.push(id);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    renderConcepts();
}

function toggleProgress(id) {
    if (progress.includes(id)) progress = progress.filter(pId => pId !== id);
    else progress.push(id);
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
    renderConcepts();
}

let activeModalId = null;
function openConceptModal(id) {
    activeModalId = id;
    const concept = electricianData.concepts.find(c => c.id === id);
    if (!concept) return;
    const cat = electricianData.categories.find(catItem => catItem.id === concept.category);

    document.getElementById('modalCategory').innerText = cat ? cat.name : '';
    document.getElementById('modalCategory').style.background = cat ? cat.color : '#ccc';
    document.getElementById('modalFrequency').innerText = `출제빈도: ${concept.frequency}`;
    document.getElementById('modalTitle').innerText = concept.title;
    document.getElementById('modalDefinition').innerText = concept.definition;

    const formulaBox = document.getElementById('modalFormula');
    if (concept.formula) {
        document.getElementById('modalFormulaSection').style.display = 'block';
        formulaBox.innerHTML = concept.formula.replace(/\\n/g, '<br/>');
    } else {
        document.getElementById('modalFormulaSection').style.display = 'none';
    }

    updateModalButtons();
    document.getElementById('conceptModal').classList.add('active');

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([formulaBox]).catch(err => console.log(err));
    }

    document.getElementById('modalFavoriteBtn').onclick = () => { toggleFavorite(activeModalId); updateModalButtons(); };
    document.getElementById('modalLearnedBtn').onclick = () => { toggleProgress(activeModalId); updateModalButtons(); };
}

function updateModalButtons() {
    if (!activeModalId) return;
    const isFav = favorites.includes(activeModalId);
    const isLearned = progress.includes(activeModalId);
    const fBtn = document.getElementById('modalFavoriteBtn');
    const lBtn = document.getElementById('modalLearnedBtn');

    fBtn.className = `btn btn-favorite ${isFav ? 'active' : ''}`;
    fBtn.querySelector('i').className = isFav ? 'fas fa-heart' : 'far fa-heart';
    lBtn.className = `btn btn-learned ${isLearned ? 'active' : ''}`;
    lBtn.querySelector('i').className = isLearned ? 'fas fa-check-circle' : 'far fa-check-circle';
}

function closeConceptModal() {
    document.getElementById('conceptModal').classList.remove('active');
    activeModalId = null;
}

// 퀴즈 및 실전 모의고사 코어 시스템 엔진
let quizQuestions = [];
let currentQuizIdx = 0;
let quizScore = 0;

function startQuiz(isMock = false, grade = '') {
    isMockExamActive = isMock;
    currentMockGrade = grade;
    clearInterval(mockTimerInterval);

    const badgeEl = document.getElementById('quizBadgeType');

    if (!isMock) {
        // 일반 랜덤 10문항 퀴즈 모드
        badgeEl.innerHTML = '<i class="fas fa-brain"></i> 실전 퀴즈';
        badgeEl.style.background = '#ea580c';
        
        const activePool = electricianData.concepts.filter(c => {
            const cat = electricianData.categories.find(catItem => catItem.id === c.category);
            return cat && cat.mode === currentMode;
        });

        if (activePool.length < 4) {
            alert('퀴즈용 풀이 데이터가 부족합니다.');
            return;
        }
        quizQuestions = [...activePool].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
        // 실전형 모의고사 모드 진입
        const config = mockExamSettings[grade];
        badgeEl.innerHTML = `<i class="fas fa-stopwatch"></i> ${config.name}`;
        badgeEl.style.background = '#1e3a8a';

        let examPool = [];
        if (grade === 'craftsman') {
            // 기능사: 해당 대과목 풀 60선 무작위 표본 추출
            const filteredPool = electricianData.concepts.filter(c => config.subjects.includes(c.category));
            examPool = filteredPool.sort(() => 0.5 - Math.random()).slice(0, config.totalQuestions);
        } else {
            // 기사/산업기사: 과목 밸런싱 유지형 동등 분할 추출 (각 과목당 최대 균등 선별)
            config.subjects.forEach(subId => {
                const subPool = electricianData.concepts.filter(c => c.category === subId);
                const countPerSubject = Math.ceil(config.totalQuestions / config.subjects.length);
                const sampled = subPool.sort(() => 0.5 - Math.random()).slice(0, countPerSubject);
                examPool = [...examPool, ...sampled];
            });
            examPool = examPool.slice(0, config.totalQuestions); // 오차 보정 오버플로우 절삭
        }

        if (examPool.length === 0) {
            alert('선택 종목에 매핑되는 문항 데이터베이스가 부족합니다.');
            return;
        }

        quizQuestions = examPool.sort(() => 0.5 - Math.random());
        mockTimeLeft = config.timeLimit;
        
        // 타이머 시동 연동
        mockTimerInterval = setInterval(() => {
            mockTimeLeft--;
            const min = Math.floor(mockTimeLeft / 60);
            const sec = mockTimeLeft % 60;
            document.getElementById('quizProgressText').innerText = `남은시간 [ ${min}분 ${sec}초 ] | 문항 ${currentQuizIdx + 1}/${quizQuestions.length}`;
            
            if(mockTimeLeft <= 0) {
                clearInterval(mockTimerInterval);
                alert('제한 시간이 만료되었습니다. 시험지를 회수하고 자동 채점을 개시합니다.');
                showQuizResult();
            }
        }, 1000);
    }

    currentQuizIdx = 0;
    quizScore = 0;

    document.getElementById('quizActiveScreen').style.display = 'block';
    document.getElementById('quizResultScreen').style.display = 'none';
    document.getElementById('quizModal').classList.add('active');

    showQuizQuestion();
}

function showQuizQuestion() {
    const q = quizQuestions[currentQuizIdx];
    
    if(!isMockExamActive) {
        document.getElementById('quizProgressText').innerText = `문제 ${currentQuizIdx + 1} / ${quizQuestions.length}`;
    } else {
        const min = Math.floor(mockTimeLeft / 60);
        const sec = mockTimeLeft % 60;
        document.getElementById('quizProgressText').innerText = `남은시간 [ ${min}분 ${sec}초 ] | 문항 ${currentQuizIdx + 1}/${quizQuestions.length}`;
    }
    
    document.getElementById('quizQuestionText').innerText = q.definition;
    document.getElementById('quizNextBtn').style.display = 'none';

    // 4지 선지 난수 풀 구성
    const pool = electricianData.concepts.filter(c => c.id !== q.id);
    const wrongOptions = pool.sort(() => 0.5 - Math.random()).slice(0, 3).map(c => c.title);
    const options = [...wrongOptions, q.title].sort(() => 0.5 - Math.random());

    const container = document.getElementById('quizOptionsContainer');
    container.innerHTML = '';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.style.cssText = 'width:100%; display:block; text-align:left; margin-bottom:10px; padding:12px 15px; border:1px solid var(--border); border-radius:8px; background:var(--bg-main); color:var(--text-main); font-weight:500; cursor:pointer;';
        btn.innerText = opt;
        btn.addEventListener('click', () => handleQuizAnswer(btn, opt, q.title));
        container.appendChild(btn);
    });
}

function handleQuizAnswer(selectedBtn, chosen, correct) {
    const buttons = document.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    if (chosen === correct) {
        selectedBtn.style.background = '#dcfce7';
        selectedBtn.style.borderColor = '#22c55e';
        selectedBtn.style.color = '#15803d';
        quizScore++;
    } else {
        selectedBtn.style.background = '#fee2e2';
        selectedBtn.style.borderColor = '#ef4444';
        selectedBtn.style.color = '#b91c1c';

        buttons.forEach(btn => {
            if (btn.innerText === correct) {
                btn.style.background = '#dcfce7';
                btn.style.borderColor = '#22c55e';
                btn.style.color = '#15803d';
            }
        });
    }

    const nextBtn = document.getElementById('quizNextBtn');
    nextBtn.style.display = 'block';
    nextBtn.onclick = () => {
        currentQuizIdx++;
        if (currentQuizIdx < quizQuestions.length) {
            showQuizQuestion();
        } else {
            clearInterval(mockTimerInterval);
            showQuizResult();
        }
    };
}

function showQuizResult() {
    document.getElementById('quizActiveScreen').style.display = 'none';
    document.getElementById('quizResultScreen').style.display = 'block';
    
    const rTitle = document.getElementById('quizResultTitle');
    const rMeta = document.getElementById('quizResultMeta');
    const rIcon = document.getElementById('quizResultIcon');
    const rScoreText = document.getElementById('quizScoreText');

    if (!isMockExamActive) {
        // 일반 단발성 퀴즈 피드백
        rTitle.innerText = "퀴즈 완료!";
        rMeta.innerHTML = `총 ${quizQuestions.length}문제 중 <strong id="quizScoreText" style="color:var(--primary); font-size:1.5rem;">${quizScore}</strong>문제를 맞혔습니다.`;
        rIcon.innerText = quizScore >= 7 ? '🏆' : '📁';
        document.getElementById('quizRetryBtn').onclick = () => startQuiz(false);
    } else {
        // 국가시험 커트라인 판정 로직 변환 적용
        const pct = Math.round((quizScore / quizQuestions.length) * 100);
        const pass = pct >= 60;
        
        rTitle.innerText = pass ? "🎉 최종 합격!" : "📉 불합격 (과락 및 점수 미달)";
        rIcon.innerText = pass ? "🥇" : "❌";
        rMeta.innerHTML = `환산 점수: <strong style="font-size:1.6rem; color:${pass?'#10B981':'#EF4444'}">${pct}점</strong> (${quizQuestions.length}문항 중 ${quizScore}개 득점)<br/><span style="font-size:0.9rem; color:var(--text-sub);">합격 기준선: 60점 이상</span>`;
        
        document.getElementById('quizRetryBtn').onclick = () => startQuiz(true, currentMockGrade);
    }
}

function closeQuizModal() {
    clearInterval(mockTimerInterval);
    document.getElementById('quizModal').classList.remove('active');
}
