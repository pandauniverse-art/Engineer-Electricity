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

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce((e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterConcepts();
            this.updateClearButton();
        }, 300));

        document.getElementById('clearSearch').addEventListener('click', () => {
            searchInput.value = '';
            this.searchQuery = '';
            this.filterConcepts();
            this.updateClearButton();
        });

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

        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentSort = e.target.dataset.sort;
                this.sortConcepts();
                this.renderConcepts();
            });
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.darkMode = !this.darkMode;
            this.applyDarkMode();
            this.saveToStorage(STORAGE_KEYS.darkMode, this.darkMode);
        });

        document.getElementById('modalOverlay').addEventListener('click', () => this.closeModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());

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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    renderCategoryTabs() {
        const tabsContainer = document.getElementById('categoryTabs');
        
        const allTab = document.createElement('div');
        allTab.className = 'category-tab active';
        allTab.dataset.category = 'all';
        allTab.innerHTML = `<span class="icon">📚</span><span>전체</span>`;
        allTab.addEventListener('click', () => this.selectCategory('all'));
        tabsContainer.appendChild(allTab);

        this.categories.forEach(cat => {
            const tab = document.createElement('div');
            tab.className = 'category-tab';
            tab.dataset.category = cat.id;
            tab.innerHTML = `<span class="icon">${cat.icon}</span><span>${cat.name}</span>`;
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
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === categoryId);
        });
        document.getElementById('categoryFilter').value = categoryId === 'all' ? 'all' : categoryId;
        this.filterConcepts();
    }

    filterConcepts() {
        this.filteredConcepts = this.concepts.filter(concept => {
            const categoryMatch = this.currentCategory === 'all' || concept.category === this.currentCategory;
            const frequencyMatch = this.currentFrequency === 'all' || concept.frequency === this.currentFrequency;
            let viewMatch = true;
            if (this.currentView === 'favorites') {
                viewMatch = this.favorites.includes(concept.id);
            } else if (this.currentView === 'learned') {
                viewMatch = this.progress.includes(concept.id);
            } else if (this.currentView === 'unlearned') {
                viewMatch = !this.progress.includes(concept.id);
            }
            const searchMatch = !this.searchQuery || 
                concept.title.toLowerCase().includes(this.searchQuery) ||
                concept.definition.toLowerCase().includes(this.searchQuery) ||
                (concept.formula && concept.formula.toLowerCase().includes(this.searchQuery)) ||
                (concept.relatedConcepts && concept.relatedConcepts.some(rc => rc.toLowerCase().includes(this.searchQuery)));
            
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
        const frequencyIcons = { '상': '⭐⭐⭐', '중': '⭐⭐', '하': '⭐' };

        card.innerHTML = `
            <div class="concept-card-header">
                <div class="concept-badge" style="background-color: ${category.color}">
                    ${category.icon} ${category.name}
                </div>
                <div class="concept-actions">
                    <button class="action-btn ${isFavorite ? 'active' : ''}" data-id="${concept.id}" data-action="favorite" title="즐겨찾기">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-star"></i>
                    </button>
                    <button class="action-btn ${isLearned ? 'learned' : ''}" data-id="${concept.id}" data-action="learn" title="학습완료">
                        <i class="${isLearned ? 'fas' : 'far'} fa-check-circle"></i>
                    </button>
                </div>
            </div>
            <h3 class="concept-title">${concept.title}</h3>
            <p class="concept-definition">${concept.definition}</p>
            <div class="concept-footer">
                <div class="concept-frequency frequency-${concept.frequency === '상' ? 'high' : concept.frequency === '중' ? 'medium' : 'low'}">
                    <span>${frequencyIcons[concept.frequency] || '⭐'}</span>
                    <span>출제빈도: ${concept.frequency}</span>
                </div>
                <div class="concept-more">자세히 보기 <i class="fas fa-arrow-right"></i></div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) return;
            this.openModal(concept);
        });

        card.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const id = parseInt(btn.dataset.id);
                if (action === 'favorite') this.toggleFavorite(id);
                else if (action === 'learn') this.toggleLearned(id);
            });
        });

        return card;
    }

    openModal(concept) {
        const modal = document.getElementById('conceptModal');
        const category = this.categories.find(cat => cat.id === concept.category);
        
        document.getElementById('modalTitle').textContent = concept.title;
        document.getElementById('modalCategory').style.backgroundColor = category.color;
        document.getElementById('modalCategory').innerHTML = `${category.icon} ${category.name}`;
        
        const frequencyIcons = { '상': '⭐⭐⭐', '중': '⭐⭐', '하': '⭐' };
        document.getElementById('modalFrequency').innerHTML = `${frequencyIcons[concept.frequency] || '⭐'} 출제빈도: ${concept.frequency}`;
        document.getElementById('modalDefinition').textContent = concept.definition;
        
        const formulaSection = document.getElementById('modalFormulaSection');
        if (concept.formula && concept.formula.trim()) {
            formulaSection.style.display = 'block';
            document.getElementById('modalFormula').textContent = concept.formula;
        } else {
            formulaSection.style.display = 'none';
        }
        
        const exampleSection = document.getElementById('modalExampleSection');
        if (concept.example) {
            exampleSection.style.display = 'block';
            document.getElementById('modalExample').textContent = concept.example;
        } else {
            exampleSection.style.display = 'none';
        }
        
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
        
        const favoriteBtn = document.getElementById('modalFavoriteBtn');
        const learnedBtn = document.getElementById('modalLearnedBtn');
        const isFavorite = this.favorites.includes(concept.id);
        const isLearned = this.progress.includes(concept.id);
        
        favoriteBtn.classList.toggle('active', isFavorite);
        favoriteBtn.querySelector('i').className = isFavorite ? 'fas fa-star' : 'far fa-star';
        learnedBtn.classList.toggle('active', isLearned);
        learnedBtn.querySelector('i').className = isLearned ? 'fas fa-check-circle' : 'far fa-check-circle';
        
        const newFavoriteBtn = favoriteBtn.cloneNode(true);
        const newLearnedBtn = learnedBtn.cloneNode(true);
        favoriteBtn.parentNode.replaceChild(newFavoriteBtn, favoriteBtn);
        learnedBtn.parentNode.replaceChild(newLearnedBtn, learnedBtn);
        
        newFavoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(concept.id);
            this.openModal(concept);
        });
        newLearnedBtn.addEventListener('click', () => {
            this.toggleLearned(concept.id);
            this.openModal(concept);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('conceptModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleFavorite(conceptId) {
        const index = this.favorites.indexOf(conceptId);
        if (index > -1) this.favorites.splice(index, 1);
        else this.favorites.push(conceptId);
        this.saveToStorage(STORAGE_KEYS.favorites, this.favorites);
        this.renderConcepts();
        this.updateStats();
    }

    toggleLearned(conceptId) {
        const index = this.progress.indexOf(conceptId);
        if (index > -1) this.progress.splice(index, 1);
        else this.progress.push(conceptId);
        this.saveToStorage(STORAGE_KEYS.progress, this.progress);
        this.renderConcepts();
        this.updateStats();
    }

    updateStats() {
        document.getElementById('totalConcepts').textContent = this.concepts.length;
        document.getElementById('favoritesCount').textContent = this.favorites.length;
        document.getElementById('learnedCount').textContent = this.progress.length;
        const percent = this.concepts.length === 0 ? 0 : Math.round((this.progress.length / this.concepts.length) * 100);
        document.getElementById('progressPercent').textContent = `${percent}%`;
    }

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

    updateClearButton() {
        document.getElementById('clearSearch').style.display = this.searchQuery ? 'block' : 'none';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => { clearTimeout(timeout); func(...args); };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    saveToStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }

    loadFromStorage(key) {
        try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : null; } catch (e) { return null; }
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new ElectricianApp(); });
