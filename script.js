class ElectricianApp {
    constructor() {
        this.concepts = electricianData.concepts;
        this.categories = electricianData.categories;
        
        this.currentMode = 'written'; // 기본: 필기모드
        this.currentCategory = 'all';
        this.currentFrequency = 'all';
        this.currentView = 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
        
        this.favorites = this.loadFromStorage('electrician_favorites') || [];
        this.progress = this.loadFromStorage('electrician_progress') || [];
        this.darkMode = this.loadFromStorage('electrician_darkmode') || false;
        
        // 퀴즈용 상태 변수
        this.quizList = [];
        this.currentQuizIndex = 0;
        this.quizScore = 0;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyDarkMode();
        this.renderCategoryTabs();
        this.filterConcepts();
    }

    setupEventListeners() {
        // 모드 전환 (필기/실기)
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.currentCategory = 'all'; 
                this.renderCategoryTabs(); 
                this.filterConcepts();     
            });
        });

        // 퀴즈 시작 버튼
        document.getElementById('startQuizBtn').addEventListener('click', () => this.startQuiz());
        document.getElementById('quizModalClose').addEventListener('click', () => this.closeQuizModal());
        document.getElementById('quizModalOverlay').addEventListener('click', () => this.closeQuizModal());
        document.getElementById('quizNextBtn').addEventListener('click', () => this.nextQuizQuestion());
        document.getElementById('quizRetryBtn').addEventListener('click', () => this.startQuiz());
        document.getElementById('quizEndBtn').addEventListener('click', () => this.closeQuizModal());

        // 검색
        document.getElementById('searchInput').addEventListener('input', this.debounce((e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterConcepts();
            this.updateClearButton();
        }, 300));

        document.getElementById('clearSearch').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            this.searchQuery = '';
            this.filterConcepts();
            this.updateClearButton();
        });

        // 필터 및 정렬
        document.getElementById('frequencyFilter').addEventListener('change', (e) => {
            this.currentFrequency = e.target.value; this.filterConcepts();
        });
        document.getElementById('viewFilter').addEventListener('change', (e) => {
            this.currentView = e.target.value; this.filterConcepts();
        });
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentSort = e.target.dataset.sort;
                this.sortConcepts();
                this.renderConcepts();
            });
        });

        // 기타 UI
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.darkMode = !this.darkMode;
            this.applyDarkMode();
            this.saveToStorage('electrician_darkmode', this.darkMode);
        });
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
    }

    /* =======================================
       퀴즈 기능 로직
       ======================================= */
    startQuiz() {
        // 현재 모드(필기 or 실기)에 해당하는 전체 개념만 추출
        const modeConcepts = this.concepts.filter(c => {
            const cat = this.categories.find(cat => cat.id === c.category);
            return cat && cat.mode === this.currentMode;
        });

        if(modeConcepts.length < 4) {
            alert("퀴즈를 진행하기엔 문제 수가 너무 부족합니다.");
            return;
        }

        // 10개를 랜덤하게 뽑아 퀴즈 목록 생성
        this.quizList = this.shuffleArray([...modeConcepts]).slice(0, 10);
        this.currentQuizIndex = 0;
        this.quizScore = 0;

        // UI 전환 (결과창 숨기고 퀴즈창 표시)
        document.getElementById('quizActiveScreen').style.display = 'block';
        document.getElementById('quizResultScreen').style.display = 'none';
        document.getElementById('quizModal').classList.add('active');
        document.body.style.overflow = 'hidden';

        this.loadQuizQuestion();
    }

    loadQuizQuestion() {
        const currentConcept = this.quizList[this.currentQuizIndex];
        
        // 문제 진행도 표시
        document.getElementById('quizProgressText').textContent = `문제 ${this.currentQuizIndex + 1} / ${this.quizList.length}`;
        
        // 문제 텍스트(정의) 세팅
        document.getElementById('quizQuestionText').textContent = currentConcept.definition;
        
        // 오답 3개 무작위 추출
        const modeConcepts = this.concepts.filter(c => {
            const cat = this.categories.find(cat => cat.id === c.category);
            return cat && cat.mode === this.currentMode;
        });
        const distractors = this.shuffleArray(modeConcepts.filter(c => c.id !== currentConcept.id)).slice(0, 3);
        
        // 정답 1개 + 오답 3개 섞기
        const options = this.shuffleArray([currentConcept, ...distractors]);

        // 객관식 버튼 생성
        const optionsContainer = document.getElementById('quizOptionsContainer');
        optionsContainer.innerHTML = '';
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = opt.title;
            btn.onclick = () => this.checkQuizAnswer(btn, opt.id === currentConcept.id, optionsContainer);
            optionsContainer.appendChild(btn);
        });

        document.getElementById('quizNextBtn').style.display = 'none';
    }

    checkQuizAnswer(selectedBtn, isCorrect, container) {
        // 모든 버튼 비활성화 (재클릭 방지)
        const allBtns = container.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(btn => btn.disabled = true);

        if (isCorrect) {
            selectedBtn.classList.add('correct');
            selectedBtn.innerHTML += ' <i class="fas fa-check-circle" style="float:right;"></i>';
            this.quizScore++;
        } else {
            selectedBtn.classList.add('wrong');
            selectedBtn.innerHTML += ' <i class="fas fa-times-circle" style="float:right;"></i>';
            // 진짜 정답 표시해주기
            const currentConcept = this.quizList[this.currentQuizIndex];
            allBtns.forEach(btn => {
                if(btn.textContent === currentConcept.title) {
                    btn.classList.add('correct');
                }
            });
        }
        
        // 다음 문제 버튼 표시
        const nextBtn = document.getElementById('quizNextBtn');
        nextBtn.style.display = 'block';
        if (this.currentQuizIndex === this.quizList.length - 1) {
            nextBtn.innerHTML = '결과 확인 <i class="fas fa-flag-checkered"></i>';
        } else {
            nextBtn.innerHTML = '다음 문제로 <i class="fas fa-arrow-right"></i>';
        }
    }

    nextQuizQuestion() {
        this.currentQuizIndex++;
        if (this.currentQuizIndex < this.quizList.length) {
            this.loadQuizQuestion();
        } else {
            this.showQuizResult();
        }
    }

    showQuizResult() {
        document.getElementById('quizActiveScreen').style.display = 'none';
        document.getElementById('quizResultScreen').style.display = 'block';
        
        document.getElementById('quizScoreText').textContent = this.quizScore;
        const icon = document.getElementById('quizResultIcon');
        
        if(this.quizScore === 10) icon.textContent = '🎉';
        else if(this.quizScore >= 7) icon.textContent = '👍';
        else if(this.quizScore >= 4) icon.textContent = '🤔';
        else icon.textContent = '🥲';
    }

    closeQuizModal() {
        document.getElementById('quizModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    // 배열 섞기 유틸리티 함수 (Fisher-Yates)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /* =======================================
       기존 리스트 및 모달 로직 (수정 없음)
       ======================================= */
    renderCategoryTabs() {
        const tabsContainer = document.getElementById('categoryTabs');
        tabsContainer.innerHTML = '';
        
        const allTab = document.createElement('div');
        allTab.className = 'category-tab active';
        allTab.dataset.category = 'all';
        allTab.innerHTML = `전체보기`;
        allTab.addEventListener('click', () => this.selectCategory('all'));
        tabsContainer.appendChild(allTab);

        const modeCategories = this.categories.filter(cat => cat.mode === this.currentMode);
        modeCategories.forEach(cat => {
            const tab = document.createElement('div');
            tab.className = 'category-tab';
            tab.dataset.category = cat.id;
            tab.innerHTML = `${cat.icon} ${cat.name}`;
            tab.addEventListener('click', () => this.selectCategory(cat.id));
            tabsContainer.appendChild(tab);
        });
    }

    selectCategory(categoryId) {
        this.currentCategory = categoryId;
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === categoryId);
        });
        this.filterConcepts();
    }

    filterConcepts() {
        this.filteredConcepts = this.concepts.filter(concept => {
            const cat = this.categories.find(c => c.id === concept.category);
            if (!cat || cat.mode !== this.currentMode) return false;

            const categoryMatch = this.currentCategory === 'all' || concept.category === this.currentCategory;
            const frequencyMatch = this.currentFrequency === 'all' || concept.frequency === this.currentFrequency;
            
            let viewMatch = true;
            if (this.currentView === 'favorites') viewMatch = this.favorites.includes(concept.id);
            else if (this.currentView === 'learned') viewMatch = this.progress.includes(concept.id);
            else if (this.currentView === 'unlearned') viewMatch = !this.progress.includes(concept.id);
            
            const searchMatch = !this.searchQuery || 
                concept.title.toLowerCase().includes(this.searchQuery) ||
                concept.definition.toLowerCase().includes(this.searchQuery);
            
            return categoryMatch && frequencyMatch && viewMatch && searchMatch;
        });

        this.sortConcepts();
        this.renderConcepts();
        this.updateStats();
    }

    sortConcepts() {
        if (this.currentSort === 'title') {
            this.filteredConcepts.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
        } else if (this.currentSort === 'frequency') {
            const freqOrder = { '상': 0, '중': 1, '하': 2 };
            this.filteredConcepts.sort((a, b) => freqOrder[a.frequency] - freqOrder[b.frequency]);
        } else {
            this.filteredConcepts.sort((a, b) => a.id - b.id);
        }
    }

    renderConcepts() {
        const grid = document.getElementById('conceptsGrid');
        const noResults = document.getElementById('noResults');
        document.getElementById('resultCount').textContent = `총 ${this.filteredConcepts.length}개`;

        grid.innerHTML = '';
        if (this.filteredConcepts.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';

        this.filteredConcepts.forEach(concept => {
            const category = this.categories.find(c => c.id === concept.category);
            const isFav = this.favorites.includes(concept.id);
            const isLearned = this.progress.includes(concept.id);
            
            const card = document.createElement('div');
            card.className = 'concept-card';
            card.innerHTML = `
                <div class="concept-card-header">
                    <span class="concept-badge" style="background:${category.color}">${category.name}</span>
                    <div class="concept-actions">
                        <button class="action-btn ${isFav ? 'active' : ''}" data-action="fav"><i class="fas fa-heart"></i></button>
                        <button class="action-btn ${isLearned ? 'learned' : ''}" data-action="learn"><i class="fas fa-check"></i></button>
                    </div>
                </div>
                <h3 class="concept-title">${concept.title}</h3>
                <p class="concept-definition">${concept.definition}</p>
                <div class="concept-footer">
                    <span class="concept-frequency">출제빈도: ${concept.frequency}</span>
                    <span class="concept-more">학습하기 <i class="fas fa-chevron-right"></i></span>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if(e.target.closest('.action-btn')) {
                    e.stopPropagation();
                    const action = e.target.closest('.action-btn').dataset.action;
                    if(action === 'fav') this.toggleFavorite(concept.id);
                    if(action === 'learn') this.toggleLearned(concept.id);
                    return;
                }
                this.openModal(concept);
            });
            grid.appendChild(card);
        });
    }

    openModal(concept) {
        const category = this.categories.find(c => c.id === concept.category);
        document.getElementById('modalCategory').textContent = category.name;
        document.getElementById('modalCategory').style.background = category.color;
        document.getElementById('modalFrequency').textContent = `빈도: ${concept.frequency}`;
        document.getElementById('modalTitle').textContent = concept.title;
        document.getElementById('modalDefinition').textContent = concept.definition;
        
        const formulaSec = document.getElementById('modalFormulaSection');
        if(concept.formula) {
            formulaSec.style.display = 'block';
            document.getElementById('modalFormula').innerText = concept.formula;
        } else {
            formulaSec.style.display = 'none';
        }

        const favBtn = document.getElementById('modalFavoriteBtn');
        const learnBtn = document.getElementById('modalLearnedBtn');
        const newFavBtn = favBtn.cloneNode(true);
        const newLearnBtn = learnBtn.cloneNode(true);
        favBtn.parentNode.replaceChild(newFavBtn, favBtn);
        learnBtn.parentNode.replaceChild(newLearnBtn, learnBtn);

        const isFav = this.favorites.includes(concept.id);
        const isLearned = this.progress.includes(concept.id);
        
        newFavBtn.classList.toggle('active', isFav);
        newLearnBtn.classList.toggle('active', isLearned);

        newFavBtn.addEventListener('click', () => {
            this.toggleFavorite(concept.id);
            this.openModal(concept); 
        });
        newLearnBtn.addEventListener('click', () => {
            this.toggleLearned(concept.id);
            this.openModal(concept); 
        });

        document.getElementById('conceptModal').classList.add('active');
        document.body.style.overflow = 'hidden';

        // MathJax 수식 렌더링
        if (concept.formula && window.MathJax) {
            MathJax.typesetPromise([document.getElementById('modalFormula')]).catch(err => console.log(err));
        }
    }

    closeModal() {
        document.getElementById('conceptModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleFavorite(id) {
        const idx = this.favorites.indexOf(id);
        idx > -1 ? this.favorites.splice(idx, 1) : this.favorites.push(id);
        this.saveToStorage('electrician_favorites', this.favorites);
        this.renderConcepts();
        this.updateStats();
    }

    toggleLearned(id) {
        const idx = this.progress.indexOf(id);
        idx > -1 ? this.progress.splice(idx, 1) : this.progress.push(id);
        this.saveToStorage('electrician_progress', this.progress);
        this.renderConcepts();
        this.updateStats();
    }

    updateStats() {
        const modeConcepts = this.concepts.filter(c => {
            const cat = this.categories.find(cat => cat.id === c.category);
            return cat && cat.mode === this.currentMode;
        });

        const modeFavs = modeConcepts.filter(c => this.favorites.includes(c.id)).length;
        const modeLearned = modeConcepts.filter(c => this.progress.includes(c.id)).length;

        document.getElementById('totalConcepts').textContent = modeConcepts.length;
        document.getElementById('favoritesCount').textContent = modeFavs;
        document.getElementById('learnedCount').textContent = modeLearned;
    }

    applyDarkMode() {
        const icon = document.querySelector('#darkModeToggle i');
        document.body.classList.toggle('dark-mode', this.darkMode);
        icon.className = this.darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    updateClearButton() {
        document.getElementById('clearSearch').style.display = this.searchQuery ? 'block' : 'none';
    }

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    saveToStorage(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){} }
    loadFromStorage(key) { try { return JSON.parse(localStorage.getItem(key)); } catch(e){ return null; } }
}

document.addEventListener('DOMContentLoaded', () => window.app = new ElectricianApp());
