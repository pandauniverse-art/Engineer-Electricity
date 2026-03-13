const electricianData = {
  categories: [
    { id: 'foundation', mode: 'written', name: '기초전기·수학', icon: '📐', color: '#64748b' },
    { id: 'electromagnetics', mode: 'written', name: '전기자기학', icon: '🧲', color: '#8B5CF6' },
    { id: 'power', mode: 'written', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', mode: 'written', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', mode: 'written', name: '회로이론', icon: '🔄', color: '#3B82F6' },
    { id: 'control', mode: 'written', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', mode: 'written', name: '전기설비기준', icon: '📋', color: '#EF4444' },

    { id: 'prac_short', mode: 'practical', name: '단답·수변전', icon: '📝', color: '#f43f5e' },
    { id: 'prac_sequence', mode: 'practical', name: '시퀀스·PLC', icon: '🔀', color: '#0ea5e9' },
    { id: 'prac_table', mode: 'practical', name: '테이블스펙', icon: '📊', color: '#d946ef' }
  ],
  
  concepts: [
    /* ==========================================
       [필기 모드] 0. 기초전기·수학
       ========================================== */
    { id: 101, category: 'foundation', title: '옴의 법칙 (Ohm\'s Law)', definition: '전류는 전압에 비례하고 저항에 반비례한다.', formula: '$$V = I \\times R$$ $$I = \\frac{V}{R}$$ $$R = \\frac{V}{I}$$', frequency: '상' },
    { id: 102, category: 'foundation', title: '저항의 병렬 연결 합성저항', definition: '병렬로 연결된 저항은 역수의 합을 다시 역수 취한다.', formula: '$$R_t = \\frac{R_1 \\times R_2}{R_1 + R_2}$$', frequency: '상' },
    { id: 103, category: 'foundation', title: '삼각함수 (역률과 무효율)', definition: '피상, 유효, 무효전력의 벡터 계산을 위한 필수 수학.', formula: '$$\\sin\\theta = \\frac{\\text{높이}}{\\text{빗변}} = \\frac{\\text{무효전력}}{\\text{피상전력}}$$ $$\\cos\\theta = \\frac{\\text{밑변}}{\\text{빗변}} = \\text{역률}$$', frequency: '상' },
    { id: 104, category: 'foundation', title: '복소수 임피던스의 크기', definition: '직류의 저항(R) 개념을 교류로 확장한 것. 실수부와 허수부로 구성.', formula: '$$Z = R + jX$$ $$|Z| = \\sqrt{R^2 + X^2}$$', frequency: '상' },
    { id: 105, category: 'foundation', title: '각주파수 (ω)', definition: '교류 파형이 1초 동안 회전한 각도(라디안).', formula: '$$\\omega = 2\\pi f \\text{ [rad/s]}$$', frequency: '중' },
    { id: 106, category: 'foundation', title: '파고율과 파형율', definition: '파형의 날카로움과 평활도를 나타내는 비율.', formula: '$$\\text{파고율} = \\frac{\\text{최대값}}{\\text{실효값}}$$ $$\\text{파형율} = \\frac{\\text{실효값}}{\\text{평균값}}$$', frequency: '중' },

    /* ==========================================
       [필기 모드] 1. 전기자기학
       ========================================== */
    { id: 201, category: 'electromagnetics', title: '쿨롱의 법칙 (정전기력)', definition: '두 점전하 사이에 작용하는 정전기력.', formula: '$$F = \\frac{1}{4\\pi\\varepsilon} \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} \\text{ [N]}$$', frequency: '상' },
    { id: 202, category: 'electromagnetics', title: '전계의 세기 (E)', definition: '단위 전하(+1C)가 받는 힘.', formula: '$$E = \\frac{F}{Q} = \\frac{V}{d} \\text{ [V/m]}$$', frequency: '상' },
    { id: 203, category: 'electromagnetics', title: '평행판 콘덴서 정전용량 (C)', definition: '도체가 전하를 축적할 수 있는 능력.', formula: '$$C = \\varepsilon \\frac{A}{d} \\text{ [F]}$$', frequency: '상' },
    { id: 204, category: 'electromagnetics', title: '비오-사바르의 법칙', definition: '미소 전류가 만드는 자계 세기.', formula: '$$dH = \\frac{I \\cdot dl \\cdot \\sin\\theta}{4\\pi r^2}$$', frequency: '상' },
    { id: 205, category: 'electromagnetics', title: '무한직선 도선의 자계', definition: '전류가 흐르는 무한직선 도선 주변의 자계 세기.', formula: '$$H = \\frac{I}{2\\pi r} \\text{ [AT/m]}$$', frequency: '상' },
    { id: 206, category: 'electromagnetics', title: '패러데이-렌츠 전자유도 법칙', definition: '자속의 변화를 방해하는 방향으로 유도기전력 발생.', formula: '$$e = -N \\frac{d\\Phi}{dt} \\text{ [V]}$$', frequency: '상' },
    { id: 207, category: 'electromagnetics', title: '인덕턴스 (L)', definition: '전류 변화에 대해 유도기전력이 발생하는 정도.', formula: '$$L = \\frac{N \\cdot \\Phi}{I} \\text{ [H]}$$', frequency: '상' },
    { id: 208, category: 'electromagnetics', title: '전자파 속도 (빛의 속도)', definition: '진공 중 전자파의 전파 속도.', formula: '$$v = \\frac{1}{\\sqrt{\\varepsilon_0 \\mu_0}} = 3 \\times 10^8 \\text{ [m/s]}$$', frequency: '중' },
    { id: 209, category: 'electromagnetics', title: '정전계의 에너지 체적밀도', definition: '콘덴서 등에 축적되는 정전에너지.', formula: '$$W = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V \\text{ [J]}$$', frequency: '상' },
    { id: 210, category: 'electromagnetics', title: '자기저항 (Rm)', definition: '자속의 흐름을 방해하는 정도.', formula: '$$R_m = \\frac{L}{\\mu A} \\text{ [AT/Wb]}$$', frequency: '상' },

    /* ==========================================
       [필기 모드] 2. 전력공학
       ========================================== */
    { id: 301, category: 'power', title: '이도 (Sag) 계산식', definition: '지지물 사이에 전선이 늘어진 정도.', formula: '$$D = \\frac{W \\cdot S^2}{8 \\cdot T} \\text{ [m]}$$', frequency: '상' },
    { id: 302, category: 'power', title: '%임피던스 (%Z)', definition: '정격전류가 흐를 때의 임피던스 강하를 백분율로 표시.', formula: '$$\\%Z = \\frac{P \\cdot Z}{10 V^2} \\times 100$$ (P: kVA, V: kV)', frequency: '상' },
    { id: 303, category: 'power', title: '단락전류 (Is)', definition: '단락 사고 시 흐르는 엄청난 전류. 차단기 용량 결정의 기준.', formula: '$$I_s = \\frac{100}{\\%Z} \\times I_n$$', frequency: '상' },
    { id: 304, category: 'power', title: '송전 용량 계산 (Still의 식)', definition: '경제적인 송전 전압을 결정하는 경험식.', formula: '$$V = 5.5 \\sqrt{0.6L + \\frac{P}{100}} \\text{ [kV]}$$', frequency: '중' },
    { id: 305, category: 'power', title: '수용률 (Demand Factor)', definition: '설비 용량에 대한 최대 수용 전력의 비.', formula: '$$\\text{수용률} = \\frac{\\text{최대수용전력}}{\\text{총 설비용량}} \\times 100 \\text{ [\\%]}$$', frequency: '상' },
    { id: 306, category: 'power', title: '부등률 (Diversity Factor)', definition: '각 부하의 최대전력 발생 시간이 엇갈리는 정도. 항상 1보다 크다.', formula: '$$\\text{부등률} = \\frac{\\sum(\\text{각 부하의 최대수용전력})}{\\text{합성 최대수용전력}}$$', frequency: '상' },

    /* ==========================================
       [필기 모드] 3. 전기기기
       ========================================== */
    { id: 401, category: 'machine', title: '직류발전기 유기기전력', definition: '전기자가 자속을 끊으며 회전할 때 발생하는 전압.', formula: '$$E = \\frac{P \\cdot Z}{60 \\cdot a} \\cdot \\Phi \\cdot N \\text{ [V]}$$', frequency: '상' },
    { id: 402, category: 'machine', title: '직류전동기 토크 (T)', definition: '전동기의 회전력.', formula: '$$T = 0.975 \\frac{P}{N} \\text{ [kg}\\cdot\\text{m]}$$', frequency: '상' },
    { id: 403, category: 'machine', title: '변압기 권수비 (a)', definition: '1차 권선과 2차 권선의 횟수 비. 전압, 전류, 임피던스 변환의 기준.', formula: '$$a = \\frac{N_1}{N_2} = \\frac{V_1}{V_2} = \\frac{I_2}{I_1} = \\sqrt{\\frac{Z_1}{Z_2}}$$', frequency: '상' },
    { id: 404, category: 'machine', title: '유도전동기 동기속도 (Ns)', definition: '회전자기장의 속도.', formula: '$$N_s = \\frac{120 f}{P} \\text{ [rpm]}$$', frequency: '상' },
    { id: 405, category: 'machine', title: '유도전동기 슬립 (s)', definition: '동기속도와 실제 회전자 속도의 차이 비율.', formula: '$$s = \\frac{N_s - N}{N_s}$$', frequency: '상' },
    { id: 406, category: 'machine', title: '동기발전기 단락비 (K)', definition: '무부하 정격전압을 만드는 계자전류와 3상 단락 정격전류를 만드는 계자전류의 비.', formula: '$$K = \\frac{100}{\\%Z_s}$$', frequency: '중' },

    /* ==========================================
       [필기 모드] 4. 회로이론
       ========================================== */
    { id: 501, category: 'circuit', title: 'RLC 직렬 공진 주파수', definition: '유도성 리액턴스와 용량성 리액턴스의 크기가 같아져 허수부가 0이 되는 주파수.', formula: '$$f = \\frac{1}{2\\pi\\sqrt{LC}} \\text{ [Hz]}$$', frequency: '상' },
    { id: 502, category: 'circuit', title: 'RC 직렬 과도현상 시정수 (τ)', definition: '콘덴서에 전압이 충전되는 지연 현상 (63.2% 도달 시간).', formula: '$$\\tau = R \\cdot C \\text{ [sec]}$$', frequency: '상' },
    { id: 503, category: 'circuit', title: 'RL 직렬 과도현상 시정수 (τ)', definition: '코일에 전류가 흐르는 데 걸리는 지연 현상.', formula: '$$\\tau = \\frac{L}{R} \\text{ [sec]}$$', frequency: '상' },
    { id: 504, category: 'circuit', title: '비정현파의 실효값', definition: '직류분, 기본파, 각 고조파가 섞인 파형의 전체 실효값.', formula: '$$V_{rms} = \\sqrt{V_0^2 + V_1^2 + V_2^2 + \\cdots}$$', frequency: '중' },
    { id: 505, category: 'circuit', title: '분포정수 특성 임피던스', definition: '장거리 송전선로의 특성을 나타내는 고유 임피던스.', formula: '$$Z_0 = \\sqrt{\\frac{Z}{Y}} = \\sqrt{\\frac{R + j\\omega L}{G + j\\omega C}}$$', frequency: '중' },

    /* ==========================================
       [실기 모드] 9. 테이블스펙 (분수가 많은 계산식)
       ========================================== */
    { id: 1001, category: 'prac_table', title: '단상 2선식 전압강하 단면적', definition: '거리와 전류에 따른 전선의 최소 굵기(A) 계산식.', formula: '$$A = \\frac{35.6 \\cdot L \\cdot I}{1000 \\cdot e} \\text{ [mm}^2\\text{]}$$', frequency: '상' },
    { id: 1002, category: 'prac_table', title: '3상 3선식 전압강하 단면적', definition: '3상 동력 설비의 전선 굵기 계산.', formula: '$$A = \\frac{30.8 \\cdot L \\cdot I}{1000 \\cdot e} \\text{ [mm}^2\\text{]}$$', frequency: '상' },
    { id: 1003, category: 'prac_table', title: '실지수 (Room Index)', definition: '조명 설계 시 방의 크기와 높이에 따른 조명 효율 계수.', formula: '$$RI = \\frac{X \\cdot Y}{H(X + Y)}$$ (X: 가로, Y: 세로, H: 작업면에서 광원까지 높이)', frequency: '중' },
    { id: 1004, category: 'prac_table', title: '분기회로 수 (N) 계산', definition: '부하 상정에 따른 분기용 차단기 개수 산출.', formula: '$$N = \\frac{\\text{바닥면적} \\times \\text{부하밀도} + \\text{가산부하}}{\\text{전압} \\times 15\\text{A}}$$', frequency: '상' },
    { id: 1005, category: 'prac_table', title: '변압기 뱅크 용량 산정', definition: '수용률과 부등률을 고려한 변압기 전체 용량.', formula: '$$T_r = \\frac{\\sum(\\text{설비용량} \\times \\text{수용률})}{\\text{부등률} \\times \\text{종합역률}} \\text{ [kVA]}$$', frequency: '상' }
  ]
};

const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
