const electricianData = {
  categories: [
    { id: 'foundation', name: '기초전기·수학', icon: '📐', color: '#64748b' },
    { id: 'electromagnetics', name: '전기자기학', icon: '🧲', color: '#8B5CF6' },
    { id: 'power', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', name: '회로이론', icon: '🔄', color: '#3B82F6' },
    { id: 'control', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', name: '전기설비기술기준', icon: '📋', color: '#EF4444' }
  ],
  
  concepts: [
    // ===== 기초 전기 및 수학 =====
    {
      id: 1, category: 'foundation', title: '피타고라스 정리와 삼각함수',
      definition: '직각삼각형에서 빗변, 밑변, 높이의 관계. 피상전력, 유효전력, 무효전력 계산의 절대적인 기초.',
      formula: 'sinθ = 높이/빗변, cosθ = 밑변/빗변, tanθ = 높이/밑변',
      frequency: '상', relatedConcepts: ['역률', '피상전력', '복소수'],
      example: '유효전력 8kW, 무효전력 6kVar일 때 피상전력은 10kVA'
    },
    {
      id: 2, category: 'foundation', title: '복소수 (Complex Number)',
      definition: '실수부와 허수부(j)로 이루어진 수. 교류 회로에서 크기와 위상을 동시에 표현하기 위해 사용한다.',
      formula: 'Z = R + jX = |Z|∠θ',
      frequency: '상', relatedConcepts: ['임피던스', '위상각'],
      example: '저항 3Ω, 유도리액턴스 4Ω 직렬회로 임피던스는 3 + j4 Ω'
    },
    {
      id: 3, category: 'foundation', title: '전기 단위와 접두어',
      definition: '전기량을 표현하는 기본 단위 및 크기를 나타내는 접두어.',
      formula: 'M(메가)=10^6, k(킬로)=10^3, m(밀리)=10^-3, μ(마이크로)=10^-6',
      frequency: '상', relatedConcepts: ['정전용량', '인덕턴스'],
      example: '1000W = 1kW, 0.001A = 1mA'
    },

    // ===== 전기자기학 =====
    {
      id: 11, category: 'electromagnetics', title: '쿨롱의 법칙 (Coulomb\'s Law)',
      definition: '두 점전하 사이에 작용하는 정전기력은 전하량의 곱에 비례하고 거리의 제곱에 반비례한다.',
      formula: 'F = (1 / 4πε) × (Q1·Q2 / r²)',
      frequency: '상', relatedConcepts: ['전계의 세기', '유전율'],
      example: '거리가 2배 멀어지면 힘은 1/4로 감소한다.'
    },
    {
      id: 12, category: 'electromagnetics', title: '전계의 세기 (Electric Field Intensity)',
      definition: '전계 내의 임의의 점에 단위 정전하(+1C)를 놓았을 때 작용하는 힘.',
      formula: 'E = F / Q = V / d',
      frequency: '상', relatedConcepts: ['전위', '전기력선'],
      example: '전위차 100V, 거리 2m 평행판 사이 전계는 50V/m'
    },
    {
      id: 13, category: 'electromagnetics', title: '비오-사바르의 법칙',
      definition: '임의의 도선에 전류가 흐를 때, 주변 공간의 특정 점에 발생하는 자계의 세기를 구하는 법칙.',
      formula: 'dH = (I·dl·sinθ) / (4πr²)',
      frequency: '상', relatedConcepts: ['암페어의 주회적분 법칙', '자계의 세기'],
      example: '무한장 직선 도선의 자계 H = I / 2πr'
    },

    // ===== 전력공학 =====
    {
      id: 21, category: 'power', title: '페란티 현상 (Ferranti Effect)',
      definition: '경부하 또는 무부하 시 선로의 정전용량으로 인해 수전단 전압이 송전단 전압보다 높아지는 현상.',
      formula: '대책: 수전단에 분로리액터(Shunt Reactor) 설치',
      frequency: '상', relatedConcepts: ['정전용량', '분로리액터', '충전전류'],
      example: '밤낮의 부하 차이가 클 때 심야에 주로 발생'
    },
    {
      id: 22, category: 'power', title: '%임피던스 (%Z)',
      definition: '정격전압과 정격전류에 의한 임피던스 강하를 기준 전압에 대한 백분율로 나타낸 값.',
      formula: '%Z = (P·Z / 10V²) × 100',
      frequency: '상', relatedConcepts: ['단락전류', '차단용량'],
      example: '단락전류(Is) = (100 / %Z) × 정격전류(In)'
    },
    {
      id: 23, category: 'power', title: '역률 개선 (Power Factor Correction)',
      definition: '부하에 병렬로 전력용 콘덴서를 설치하여 진상 무효전력을 공급해 역률을 1에 가깝게 만드는 것.',
      formula: 'Qc = P(tanθ1 - tanθ2)',
      frequency: '상', relatedConcepts: ['유효전력', '무효전력', '전력용 콘덴서'],
      example: '전력손실 경감, 전압강하 감소 효과'
    },

    // ===== 전기기기 =====
    {
      id: 31, category: 'machine', title: '직류발전기 유기기전력',
      definition: '전기자가 자속을 끊으며 회전할 때 발생하는 전압.',
      formula: 'E = (P·Z / 60·a) × Φ·N',
      frequency: '상', relatedConcepts: ['직류발전기', '전기자 반작용'],
      example: '자속(Φ)이나 회전수(N)를 늘리면 전압 상승'
    },
    {
      id: 32, category: 'machine', title: '변압기 권수비 (Turns Ratio)',
      definition: '1차 권선과 2차 권선의 감은 횟수 비. 전압, 전류, 임피던스 변환의 기준.',
      formula: 'a = N1/N2 = V1/V2 = I2/I1 = √(Z1/Z2)',
      frequency: '상', relatedConcepts: ['변압기', '임피던스 정합'],
      example: '권수비가 10이면 2차 전압은 1차의 1/10'
    },
    {
      id: 33, category: 'machine', title: '유도전동기 동기속도와 슬립',
      definition: '회전자기장의 속도(동기속도)와 실제 회전자 속도의 차이 비율.',
      formula: 'Ns = 120f / P, s = (Ns - N) / Ns',
      frequency: '상', relatedConcepts: ['동기속도', '유도전동기'],
      example: '슬립 0은 무부하, 슬립 1은 기동 시를 의미'
    },

    // ===== 회로이론 =====
    {
      id: 41, category: 'circuit', title: '테브난의 정리 (Thevenin\'s Theorem)',
      definition: '복잡한 선형 회로망을 하나의 등가 전압원(Vth)과 직렬 등가 저항(Rth)으로 단순화하는 정리.',
      formula: 'Vth: 개방단 전압, Rth: 전압원 단락 후 바라본 저항',
      frequency: '상', relatedConcepts: ['노턴의 정리', '중첩의 원리'],
      example: '부하 저항이 변할 때 전류 계산을 매우 쉽게 만들어 줌'
    },
    {
      id: 42, category: 'circuit', title: 'RLC 직렬 공진 (Series Resonance)',
      definition: '직렬 회로에서 유도성 리액턴스와 용량성 리액턴스의 크기가 같아져 허수부가 0이 되는 상태.',
      formula: '공진 주파수 f = 1 / (2π√LC)',
      frequency: '상', relatedConcepts: ['임피던스 최소', '전류 최대'],
      example: '공진 시 임피던스는 최소가 되고 전류는 최대가 됨'
    },

    // ===== 제어공학 =====
    {
      id: 51, category: 'control', title: '라플라스 변환 (Laplace Transform)',
      definition: '시간 영역(t)의 미분/적분 방정식을 복소 주파수 영역(s)의 대수 방정식으로 변환하는 도구.',
      formula: 'L[f(t)] = F(s) = ∫ f(t)·e^(-st) dt',
      frequency: '상', relatedConcepts: ['전달함수', '블록선도'],
      example: 'L[1] = 1/s, L[e^(-at)] = 1/(s+a)'
    },
    {
      id: 52, category: 'control', title: '전달함수 (Transfer Function)',
      definition: '초기값을 0으로 한 상태에서 시스템의 출력 라플라스 변환과 입력 라플라스 변환의 비.',
      formula: 'G(s) = C(s) / R(s)',
      frequency: '상', relatedConcepts: ['블록선도', '주파수 응답'],
      example: '전달함수의 분모가 0이 되는 s값을 극점이라 함'
    },

    // ===== 전기설비기술기준 (KEC) =====
    {
      id: 61, category: 'regulation', title: '전압의 종별 (KEC 기준)',
      definition: '전기설비에서 직류와 교류의 전압 크기에 따른 저압, 고압, 특고압의 분류.',
      formula: '저압: AC 1kV, DC 1.5kV 이하 / 특고압: 7kV 초과',
      frequency: '상', relatedConcepts: ['고압', '특고압'],
      example: '배전선로 22.9kV는 특고압에 해당'
    },
    {
      id: 62, category: 'regulation', title: '절연저항 기준 (KEC)',
      definition: '전로와 대지 간, 또는 전선 상호 간에 누설전류를 막기 위해 유지해야 하는 최소 저항값.',
      formula: '500V 이하 설비: 1.0MΩ 이상',
      frequency: '상', relatedConcepts: ['누전차단기', '메거 측정'],
      example: '일반적인 220V/380V 설비는 1.0MΩ 이상 유지해야 함'
    }
  ]
};

const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
