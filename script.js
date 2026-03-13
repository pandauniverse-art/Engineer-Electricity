class ElectricianApp {
    constructor() {
        this.concepts = electricianData.concepts;
        this.categories = electricianData.categories;
        this.favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
        this.progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress)) || [];
        this.init();
    }

    init() {
        this.renderConcepts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 다크모드, 검색 필터 로직 (기존과 동일)
    }

    renderConcepts() {
        const grid = document.getElementById('conceptsGrid');
        grid.innerHTML = '';
        
        this.concepts.forEach(concept => {
            const card = this.createCard(concept);
            grid.appendChild(card);
        });
    }

    createCard(concept) {
        const category = this.categories.find(c => c.id === concept.category);
        const card = document.createElement('div');
        card.className = `concept-card ${concept.isPractical ? 'practical' : ''}`;
        
        let contentHtml = `
            <div class="concept-badge" style="background:${category.color}">${category.name}</div>
            <h3 style="margin:10px 0">${concept.title}</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem">${concept.definition}</p>
        `;

        // 실기 데이터일 경우 답변 버튼 추가
        if (concept.isPractical && concept.answers) {
            contentHtml += `
                <div class="answer-section">
                    <button class="toggle-answer-btn">정답 확인하기</button>
                    <div class="answer-list">
                        ${concept.answers.map(a => `<p style="margin-bottom:5px">${a}</p>`).join('')}
                    </div>
                </div>
            `;
        } else if (concept.formula) {
            contentHtml += `<div style="margin-top:10px; font-weight:bold; color:var(--primary-color)">${concept.formula}</div>`;
        }

        card.innerHTML = contentHtml;

        // 버튼 이벤트 바인딩
        const btn = card.querySelector('.toggle-answer-btn');
        if (btn) {
            btn.onclick = (e) => {
                e.stopPropagation();
                const list = card.querySelector('.answer-list');
                const isShow = list.classList.toggle('show');
                btn.innerText = isShow ? '정답 가리기' : '정답 확인하기';
            };
        }

        return card;
    }
}

document.addEventListener('DOMContentLoaded', () => new ElectricianApp());
