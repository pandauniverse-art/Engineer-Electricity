class ElectricianApp {
    constructor() {
        this.concepts = electricianData.concepts;
        this.categories = electricianData.categories;
        
        this.currentMode = 'written'; 
        this.currentCategory = 'all';
        this.currentFrequency = 'all';
        this.currentView = 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
        
        this.favorites = this.loadFromStorage('electrician_favorites') || [];
        this.progress = this.loadFromStorage('electrician_progress') || [];
        this.darkMode = this.loadFromStorage('electrician_darkmode') || false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyDarkMode();
        this.renderCategoryTabs();
        this.filterConcepts();
    }

    setupEventListeners() {
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

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.darkMode = !this.darkMode;
            this.applyDarkMode();
            this.saveToStorage('electrician_darkmode', this.darkMode);
        });
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
    }

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

        // ★ 수식(MathJax) 렌더링 실행
        if (concept.formula && window.MathJax) {
            MathJax.typesetPromise([document.getElementById('modalFormula')]).catch(function (err) {
                console.log('MathJax error: ', err.message);
            });
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
