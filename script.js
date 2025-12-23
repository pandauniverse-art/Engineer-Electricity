// ============================================
// 전기기사 학습 플랫폼 JavaScript
// 검색, 필터, 즐겨찾기, 진도 추적 기능
// ============================================

class ElectricianApp {
    constructor() {
        this.concepts = electricianData.concepts;
        this.categories = electricianData.categories;
        this.filteredConcepts = [...this.concepts];
        this.currentCategory = 'all';
        this.currentFrequency = 'all';
        this.currentView = 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
        this.favorites = this.loadFromStorage(STORAGE_KEYS.favorites) || [];
        this.progress = this.loadFromStorage(STORAGE_KEYS.progress) || [];
        this.darkMode = this.loadFromStorage(STORAGE_KEYS.darkMode) || false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyDarkMode();
        this.renderCategoryTabs();
        this.renderCategoryFilter();
        this.renderConcepts();
        this.updateStats();
    }

    // ============================================
    // 이벤트 리스너 설정
    // ============================================
    setupEventListeners() {
        // 검색
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce((e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterConcepts();
            this.updateClearButton();
        }, 300));

        // 검색 초기화
        document.getElementById('clearSearch').addEventListener('click', () => {
            searchInput.value = '';
            this.searchQuery = '';
            this.filterConcepts();
            this.updateClearButton();
        });

        // 필터
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.filterConcepts();
        });

        document.getElementById('frequencyFilter').addEventListener('change', (e) => {
            this.currentFrequency = e.target.value;
            this.filterConcepts();
        });

        document.getElementById('viewFilter').addEventListener('change', (e) => {
            this.currentView = e.target.value;
            this.filterConcepts();
        });

        // 정렬
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentSort = e.target.dataset.sort;
                this.sortConcepts();
                this.renderConcepts();
            });
        });

        // 다크모드
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.darkMode = !this.darkMode;
            this.applyDarkMode();
            this.saveToStorage(STORAGE_KEYS.darkMode, this.darkMode);
        });

        // 모달
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());

        // 맨 위로 버튼
        const scrollTopBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // ============================================
    // 카테고리 렌더링
    // ============================================
    renderCategoryTabs() {
        const tabsContainer = document.getElementById('categoryTabs');
        
        // 전체 탭
        const allTab = document.createElement('div');
        allTab.className = 'category-tab active';
        allTab.dataset.category = 'all';
        allTab.innerHTML = `
            <span class="icon">📚</span>
            <span>전체</span>
        `;
        allTab.addEventListener('click', () => this.selectCategory('all'));
        tabsContainer.appendChild(allTab);

        // 각 카테고리 탭
        this.categories.forEach(cat => {
            const tab = document.createElement('div');
            tab.className = 'category-tab';
            tab.dataset.category = cat.id;
            tab.innerHTML = `
                <span class="icon">${cat.icon}</span>
                <span>${cat.name}</span>
            `;
            tab.addEventListener('click', () => this.selectCategory(cat.id));
            tabsContainer.appendChild(tab);
        });
    }

    renderCategoryFilter() {
        const select = document.getElementById('categoryFilter');
        this.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = `${cat.icon} ${cat.name}`;
            select.appendChild(option);
        });
    }

    selectCategory(categoryId) {
        this.currentCategory = categoryId;
        
        // 탭 활성화
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === categoryId);
        });

        // 필터 동기화
        document.getElementById('categoryFilter').value = categoryId === 'all' ? 'all' : categoryId;
        
        this.filterConcepts();
    }

    // ============================================
    // 필터링 및 정렬
    // ============================================
    filterConcepts() {
        this.filteredConcepts = this.concepts.filter(concept => {
            // 카테고리 필터
            const categoryMatch = this.currentCategory === 'all' || concept.category === this.currentCategory;
            
            // 빈도 필터
            const frequencyMatch = this.currentFrequency === 'all' || concept.frequency === this.currentFrequency;
            
            // 보기 필터
            let viewMatch = true;
            if (this.currentView === 'favorites') {
                viewMatch = this.favorites.includes(concept.id);
            } else if (this.currentView === 'learned') {
                viewMatch = this.progress.includes(concept.id);
            } else if (this.currentView === 'unlearned') {
                viewMatch = !this.progress.includes(concept.id);
            }
            
            // 검색 필터
            const searchMatch = !this.searchQuery || 
                concept.title.toLowerCase().includes(this.searchQuery) ||
                concept.definition.toLowerCase().includes(this.searchQuery) ||
                concept.formula.toLowerCase().includes(this.searchQuery) ||
                (concept.relatedConcepts && concept.relatedConcepts.some(rc => 
                    rc.toLowerCase().includes(this.searchQuery)
                ));
            
            return categoryMatch && frequencyMatch && viewMatch && searchMatch;
        });

        this.sortConcepts();
        this.renderConcepts();
    }

    sortConcepts() {
        switch (this.currentSort) {
            case 'title':
                this.filteredConcepts.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
                break;
            case 'frequency':
                const freqOrder = { '상': 0, '중': 1, '하': 2 };
                this.filteredConcepts.sort((a, b) => freqOrder[a.frequency] - freqOrder[b.frequency]);
                break;
            case 'default':
            default:
                this.filteredConcepts.sort((a, b) => a.id - b.id);
                break;
        }
    }

    // ============================================
    // 개념 카드 렌더링
    // ============================================
    renderConcepts() {
        const grid = document.getElementById('conceptsGrid');
        const noResults = document.getElementById('noResults');
        const resultCount = document.getElementById('resultCount');

        grid.innerHTML = '';

        if (this.filteredConcepts.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            resultCount.textContent = '';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';
        resultCount.textContent = `${this.filteredConcepts.length}개의 개념`;

        this.filteredConcepts.forEach(concept => {
            const card = this.createConceptCard(concept);
            grid.appendChild(card);
        });
    }

    createConceptCard(concept) {
        const card = document.createElement('div');
        card.className = 'concept-card';
        
        const category = this.categories.find(cat => cat.id === concept.category);
        const isFavorite = this.favorites.includes(concept.id);
        const isLearned = this.progress.includes(concept.id);
        
        // 빈도 아이콘
        const frequencyIcons = {
            '상': '⭐⭐⭐',
            '중': '⭐⭐',
            '하': '⭐'
        };

        card.innerHTML = `
            <div class="concept-card-header">
                <div class="concept-badge" style="background-color: ${category.color}">
                    ${category.icon} ${category.name}
                </div>
                <div class="concept-actions">
                    <button class="action-btn ${isFavorite ? 'active' : ''}" 
                            data-id="${concept.id}" 
                            data-action="favorite"
                            title="즐겨찾기">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-star"></i>
                    </button>
                    <button class="action-btn ${isLearned ? 'learned' : ''}" 
                            data-id="${concept.id}" 
                            data-action="learn"
                            title="학습완료">
                        <i class="${isLearned ? 'fas' : 'far'} fa-check-circle"></i>
                    </button>
                </div>
            </div>
            <h3 class="concept-title">${concept.title}</h3>
            <p class="concept-definition">${concept.definition}</p>
            <div class="concept-footer">
                <div class="concept-frequency frequency-${concept.frequency === '상' ? 'high' : concept.frequency === '중' ? 'medium' : 'low'}">
                    <span>${frequencyIcons[concept.frequency]}</span>
                    <span>출제빈도: ${concept.frequency}</span>
                </div>
                <div class="concept-more">
                    자세히 보기 <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `;

        // 카드 클릭 이벤트
        card.addEventListener('click', (e) => {
            // 액션 버튼 클릭 시 모달 열지 않음
            if (e.target.closest('.action-btn')) {
                return;
            }
            this.openModal(concept);
        });

        // 액션 버튼 이벤트
        card.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const id = parseInt(btn.dataset.id);
                
                if (action === 'favorite') {
                    this.toggleFavorite(id);
                } else if (action === 'learn') {
                    this.toggleLearned(id);
                }
            });
        });

        return card;
    }

    // ============================================
    // 모달
    // ============================================
    openModal(concept) {
        const modal = document.getElementById('conceptModal');
        const category = this.categories.find(cat => cat.id === concept.category);
        
        document.getElementById('modalTitle').textContent = concept.title;
        document.getElementById('modalCategory').style.backgroundColor = category.color;
        document.getElementById('modalCategory').innerHTML = `${category.icon} ${category.name}`;
        
        const frequencyIcons = { '상': '⭐⭐⭐', '중': '⭐⭐', '하': '⭐' };
        document.getElementById('modalFrequency').innerHTML = `${frequencyIcons[concept.frequency]} 출제빈도: ${concept.frequency}`;
        
        document.getElementById('modalDefinition').textContent = concept.definition;
        
        // 공식
        const formulaSection = document.getElementById('modalFormulaSection');
        if (concept.formula && concept.formula.trim()) {
            formulaSection.style.display = 'block';
            document.getElementById('modalFormula').textContent = concept.formula;
        } else {
            formulaSection.style.display = 'none';
        }
        
        // 예시
        const exampleSection = document.getElementById('modalExampleSection');
        if (concept.example) {
            exampleSection.style.display = 'block';
            document.getElementById('modalExample').textContent = concept.example;
        } else {
            exampleSection.style.display = 'none';
        }
        
        // 관련 개념
        const relatedSection = document.getElementById('modalRelatedSection');
        if (concept.relatedConcepts && concept.relatedConcepts.length > 0) {
            relatedSection.style.display = 'block';
            const relatedContainer = document.getElementById('modalRelated');
            relatedContainer.innerHTML = '';
            concept.relatedConcepts.forEach(related => {
                const tag = document.createElement('span');
                tag.className = 'related-tag';
                tag.textContent = related;
                tag.addEventListener('click', () => {
                    // 관련 개념 검색
                    document.getElementById('searchInput').value = related;
                    this.searchQuery = related.toLowerCase();
                    this.closeModal();
                    this.filterConcepts();
                    this.updateClearButton();
                });
                relatedContainer.appendChild(tag);
            });
        } else {
            relatedSection.style.display = 'none';
        }
        
        // 즐겨찾기/학습완료 버튼
        const favoriteBtn = document.getElementById('modalFavoriteBtn');
        const learnedBtn = document.getElementById('modalLearnedBtn');
        
        const isFavorite = this.favorites.includes(concept.id);
        const isLearned = this.progress.includes(concept.id);
        
        favoriteBtn.classList.toggle('active', isFavorite);
        favoriteBtn.querySelector('i').className = isFavorite ? 'fas fa-star' : 'far fa-star';
        
        learnedBtn.classList.toggle('active', isLearned);
        learnedBtn.querySelector('i').className = isLearned ? 'fas fa-check-circle' : 'far fa-check-circle';
        
        // 버튼 이벤트 (이전 이벤트 제거 후 새로 추가)
        const newFavoriteBtn = favoriteBtn.cloneNode(true);
        const newLearnedBtn = learnedBtn.cloneNode(true);
        favoriteBtn.parentNode.replaceChild(newFavoriteBtn, favoriteBtn);
        learnedBtn.parentNode.replaceChild(newLearnedBtn, learnedBtn);
        
        newFavoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(concept.id);
            this.openModal(concept); // 모달 새로고침
        });
        
        newLearnedBtn.addEventListener('click', () => {
            this.toggleLearned(concept.id);
            this.openModal(concept); // 모달 새로고침
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('conceptModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // 즐겨찾기 및 학습완료
    // ============================================
    toggleFavorite(conceptId) {
        const index = this.favorites.indexOf(conceptId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(conceptId);
        }
        this.saveToStorage(STORAGE_KEYS.favorites, this.favorites);
        this.renderConcepts();
        this.updateStats();
    }

    toggleLearned(conceptId) {
        const index = this.progress.indexOf(conceptId);
        if (index > -1) {
            this.progress.splice(index, 1);
        } else {
            this.progress.push(conceptId);
        }
        this.saveToStorage(STORAGE_KEYS.progress, this.progress);
        this.renderConcepts();
        this.updateStats();
    }

    // ============================================
    // 통계 업데이트
    // ============================================
    updateStats() {
        document.getElementById('totalConcepts').textContent = this.concepts.length;
        document.getElementById('favoritesCount').textContent = this.favorites.length;
        document.getElementById('learnedCount').textContent = this.progress.length;
        
        const progressPercent = Math.round((this.progress.length / this.concepts.length) * 100);
        document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    }

    // ============================================
    // 다크모드
    // ============================================
    applyDarkMode() {
        const icon = document.querySelector('#darkModeToggle i');
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            icon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('dark-mode');
            icon.className = 'fas fa-moon';
        }
    }

    // ============================================
    // 유틸리티
    // ============================================
    updateClearButton() {
        const clearBtn = document.getElementById('clearSearch');
        clearBtn.style.display = this.searchQuery ? 'block' : 'none';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('로컬 스토리지 저장 실패:', e);
        }
    }

    loadFromStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('로컬 스토리지 로드 실패:', e);
            return null;
        }
    }
}

// ============================================
// 앱 초기화
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ElectricianApp();
});
