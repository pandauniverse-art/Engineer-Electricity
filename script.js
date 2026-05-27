// 상태 관리 객체
let currentMode = 'written'; // 'written', 'practical', 'requirements'
let selectedCategory = 'all';
let searchQuery = '';
let freqFilter = 'all';
let viewFilter = 'all';
let currentSort = 'default';

// 로컬스토리지 데이터 로드 변수
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
let progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress)) || [];

// DOM 요소들
const modeButtons = document.querySelectorAll('.mode-btn');
const conceptsGrid = document.getElementById('conceptsGrid');
const requirementsSection = document.getElementById('requirementsSection');
const searchSection = document.querySelector('.search-section');
const statsSection = document.querySelector('.stats-section');
const categoryTabs = document.getElementById('categoryTabs');
const quizBtn = document.getElementById('startQuizBtn');
const resultCountEl = document.getElementById('resultCount');
const noResultsEl = document.getElementById('noResults');

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initEventListeners();
    renderTabs();
    updateStats();
    renderConcepts();
});

// 다크모드 초기화
function initDarkMode() {
    const isDark = localStorage.getItem(STORAGE_KEYS.darkMode) === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 이벤트 리스너 등록
function initEventListeners() {
    // 1. 다크모드 토글
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEYS.darkMode, isDark);
        document.getElementById('darkModeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // 2. 모드 변경 (필기, 실기, 자격요건)
    modeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentMode = btn.getAttribute('data-mode');
            selectedCategory = 'all'; // 카테고리 초기화
            
            // UI 모드 제어
            if (currentMode === 'requirements') {
                // 자격요건일 때 모든 기존 검색/문제 레이아웃 숨김
                if(conceptsGrid) conceptsGrid.style.display = 'none';
                if(searchSection) searchSection.style.display = 'none';
                if(statsSection) statsSection.style.display = 'none';
                if(categoryTabs) categoryTabs.style.display = 'none';
                if(quizBtn) quizBtn.style.display = 'none';
                if(resultCountEl) resultCountEl.style.display = 'none';
                if(noResultsEl) noResultsEl.style.display = 'none';
                
                if(requirementsSection) {
                    requirementsSection.style.display = 'block';
                    renderRequirements();
                }
            } else {
                // 필기/실기 모드일 때 메인 UI 레이아웃 노출 및 리랜더링
                if(requirementsSection) requirementsSection.style.display = 'none';
                
                if(conceptsGrid) conceptsGrid.style.display = 'grid';
                if(searchSection) searchSection.style.display = 'block';
                if(statsSection) statsSection.style.display = 'flex';
                if(categoryTabs) categoryTabs.style.display = 'flex';
                if(quizBtn) quizBtn.style.display = 'inline-flex';
                if(resultCountEl) resultCountEl.style.display = 'block';
                
                renderTabs();
                renderConcepts();
            }
        });
    });

    // 3. 검색 창 입력 이벤트
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

    // 4. 필터 엘리먼트 변경 이벤트
    document.getElementById('frequencyFilter').addEventListener('change', (e) => {
        freqFilter = e.target.value;
        renderConcepts();
    });

    document.getElementById('viewFilter').addEventListener('change', (e) => {
        viewFilter = e.target.value;
        renderConcepts();
    });

    // 5. 정렬 버튼 이벤트
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            renderConcepts();
        });
    });

    // 6. 개념 상세 모달 닫기 이벤트
    document.getElementById('modalClose').addEventListener('click', closeConceptModal);
    document.getElementById('modalOverlay').addEventListener('click', closeConceptModal);

    // 7. 퀴즈 실행/닫기 이벤트
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('quizModalClose').addEventListener('click', closeQuizModal);
    document.getElementById('quizModalOverlay').addEventListener('click', closeQuizModal);
    document.getElementById('quizEndBtn').addEventListener('click', closeQuizModal);
}

// 카테고리 탭 렌더링
function renderTabs() {
    const filteredCats = electricianData.categories.filter(c => c.mode === currentMode);
    
    let html = `<button class="tab-btn ${selectedCategory === 'all' ? 'active' : ''}" data-id="all">전체</button>`;
    filteredCats.forEach(cat => {
        html += `<button class="tab-btn ${selectedCategory === cat.id ? 'active' : ''}" data-id="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });
    
    categoryTabs.innerHTML = html;

    // 탭 클릭 이벤트 바인딩
    categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.getAttribute('data-id');
            renderConcepts();
        });
    });
}

// 통계 지표 업데이트
function updateStats() {
    const activeConcepts = electricianData.concepts.filter(c => {
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);
        return cat && cat.mode === currentMode;
    });

    document.getElementById('totalConcepts').innerText = activeConcepts.length;
    document.getElementById('favoritesCount').innerText = favorites.filter(id => activeConcepts.some(c => c.id === id)).length;
    document.getElementById('learnedCount').innerText = progress.filter(id => activeConcepts.some(c => c.id === id)).length;
}

// 데이터 필터링 및 정렬 처리 함수
function getFilteredConcepts() {
    // 1. 모드 및 카테고리 선택 필터링
    let items = electricianData.concepts.filter(c => {
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);
        if (!cat || cat.mode !== currentMode) return false;
        if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
        return true;
    });

    // 2. 출제빈도 검색 필터
    if (freqFilter !== 'all') {
        items = items.filter(c => c.frequency === freqFilter);
    }

    // 3. 상태(즐겨찾기, 학습완료) 필터
    if (viewFilter === 'favorites') {
        items = items.filter(c => favorites.includes(c.id));
    } else if (viewFilter === 'learned') {
        items = items.filter(c => progress.includes(c.id));
    } else if (viewFilter === 'unlearned') {
        items = items.filter(c => !progress.includes(c.id));
    }

    // 4. 입력 검색창 필터
    if (searchQuery) {
        items = items.filter(c => c.title.toLowerCase().includes(searchQuery) || c.definition.toLowerCase().includes(searchQuery));
    }

    // 5. 정렬 기준 처리
    if (currentSort === 'title') {
        items.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    } else if (currentSort === 'frequency') {
        const score = { '상': 3, '중': 2, '하': 1 };
        items.sort((a, b) => score[b.frequency] - score[a.frequency]);
    }

    return items;
}

// 개념 카드 렌더링 함수
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

    // 카드 내부 개별 클릭 바인딩
    conceptsGrid.querySelectorAll('.concept-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-action-btn')) return; // 하단 버튼 클릭 무시
            const id = parseInt(card.getAttribute('data-id'));
            openConceptModal(id);
        });
    });

    // 즐겨찾기 토글 버튼 이벤트
    conceptsGrid.querySelectorAll('.fav-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            toggleFavorite(id);
        });
    });

    // 학습 완료 토글 버튼 이벤트
    conceptsGrid.querySelectorAll('.check-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            toggleProgress(id);
        });
    });
}

// 자격 요건 렌더링 함수
function renderRequirements() {
    requirementsSection.innerHTML = `
        <h2 style="margin-bottom: 20px; font-weight:700; color:var(--text-main); font-size:1.5rem; letter-spacing:-0.5px;">📋 국가기술자격 응시 자격 요건 안내</h2>
        <div class="req-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            ${qualificationRequirements.map(req => `
                <div class="stat-card" style="flex-direction: column; align-items: flex-start; padding: 25px; height: auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <span style="font-size: 2rem;">${req.icon}</span>
                        <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0; color:var(--text-main);">${req.grade}</h3>
                    </div>
                    <p style="font-weight: 600; color: var(--primary, #ea580c); margin-bottom: 18px; font-size: 0.95rem; background: var(--primary-light); padding: 4px 10px; border-radius: 6px;">${req.summary}</p>
                    <ul style="padding-left: 20px; margin: 0; color: var(--text-sub); font-size: 0.9rem; line-height: 1.7; width:100%; box-sizing:border-box;">
                        ${req.details.map(detail => `<li style="margin-bottom: 10px; word-break: keep-all; list-style-type: disc;">${detail}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

// 데이터 제어 로직 함수들
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(fId => fId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    renderConcepts();
}

function toggleProgress(id) {
    if (progress.includes(id)) {
        progress = progress.filter(pId => pId !== id);
    } else {
        progress.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
    renderConcepts();
}

// 개념 상세 보기 모달 오픈
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
        // \n 줄바꿈 문자 정규식 처리
        formulaBox.innerHTML = concept.formula.replace(/\\n/g, '<br/>');
    } else {
        document.getElementById('modalFormulaSection').style.display = 'none';
    }

    // 모달 버튼 디자인 동기화
    updateModalButtons();

    document.getElementById('conceptModal').classList.add('active');

    // 수식 변환 적용
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([formulaBox]).catch(err => console.log(err));
    }

    // 모달 전용 클릭 바인딩 초기화 보완
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

// 퀴즈 모듈 전용 변수 및 로직
let quizQuestions = [];
let currentQuizIdx = 0;
let quizScore = 0;

function startQuiz() {
    // 현재 필터링된 모드의 전체 문제 추출
    const activePool = electricianData.concepts.filter(c => {
        const cat = electricianData.categories.find(catItem => catItem.id === c.category);
        return cat && cat.mode === currentMode;
    });

    if (activePool.length < 4) {
        alert('퀴즈를 생성하기 위한 문제 풀이 데이터가 부족합니다.');
        return;
    }

    // 10문제 무작위 셔플 추출
    const shuffled = [...activePool].sort(() => 0.5 - Math.random());
    quizQuestions = shuffled.slice(0, Math.min(10, shuffled.length));

    currentQuizIdx = 0;
    quizScore = 0;

    document.getElementById('quizActiveScreen').style.display = 'block';
    document.getElementById('quizResultScreen').style.display = 'none';
    document.getElementById('quizModal').classList.add('active');

    showQuizQuestion();
}

function showQuizQuestion() {
    const q = quizQuestions[currentQuizIdx];
    document.getElementById('quizProgressText').innerText = `문제 ${currentQuizIdx + 1} / ${quizQuestions.length}`;
    document.getElementById('quizQuestionText').innerText = q.definition;
    document.getElementById('quizNextBtn').style.display = 'none';

    // 선지 생성용 셔플 오답 추출
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
    buttons.forEach(btn => btn.style.pointerEvents = 'none'); // 클릭 잠금

    if (chosen === correct) {
        selectedBtn.style.background = '#dcfce7';
        selectedBtn.style.borderColor = '#22c55e';
        selectedBtn.style.color = '#15803d';
        quizScore++;
    } else {
        selectedBtn.style.background = '#fee2e2';
        selectedBtn.style.borderColor = '#ef4444';
        selectedBtn.style.color = '#b91c1c';

        // 정답 시각화 표시
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
            showQuizResult();
        }
    };
}

function showQuizResult() {
    document.getElementById('quizActiveScreen').style.display = 'none';
    document.getElementById('quizResultScreen').style.display = 'block';
    document.getElementById('quizScoreText').innerText = quizScore;
    document.getElementById('quizResultIcon').innerText = quizScore >= 7 ? '🏆' : '📁';

    document.getElementById('quizRetryBtn').onclick = startQuiz;
}

function closeQuizModal() {
    document.getElementById('quizModal').classList.remove('active');
}
