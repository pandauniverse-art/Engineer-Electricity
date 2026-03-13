const electricianData = {
  categories: [
    // 필기 모드 과목들
    { id: 'foundation', mode: 'written', name: '기초전기·수학', icon: '📐', color: '#64748b' },
    { id: 'electromagnetics', mode: 'written', name: '전기자기학', icon: '🧲', color: '#8B5CF6' },
    { id: 'power', mode: 'written', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', mode: 'written', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', mode: 'written', name: '회로이론', icon: '🔄', color: '#3B82F6' },
    { id: 'control', mode: 'written', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', mode: 'written', name: '전기설비기준', icon: '📋', color: '#EF4444' },

    // 실기 모드 과목들
    { id: 'prac_short', mode: 'practical', name: '단답·수변전', icon: '📝', color: '#f43f5e' },
    { id: 'prac_sequence', mode: 'practical', name: '시퀀스·PLC', icon: '🔀', color: '#0ea5e9' },
    { id: 'prac_table', mode: 'practical', name: '테이블스펙', icon: '📊', color: '#d946ef' }
  ],
  
  concepts: [
    /* ==========================================
       [필기 모드] 데이터 파트
       ========================================== */
    
    // --- 0. 기초전기·수학 ---
    {
      id: 1, category: 'foundation', title: '옴의 법칙 (Ohm\'s Law)',
      definition: '전류는 전압에 비례하고 저항에 반비례한다. 전기공학의 가장 기본적인 법칙.',
      formula: 'V = I × R\nI = V / R\nR = V / I',
      frequency: '상', relatedConcepts: ['키르히호프의 법칙', '임피던스']
    },
    {
      id: 2, category: 'foundation', title: '피타고라스 정리와 삼각함수',
      definition: '직각삼각형에서 빗변, 밑변, 높이의 관계. 피상전력, 유효전력, 무효전력 및 역률 계산의 절대적인 기초.',
      formula: 'sinθ = 높이 / 빗변 (무효율)\ncosθ = 밑변 / 빗변 (역률)\ntanθ = 높이 / 밑변',
      frequency: '상', relatedConcepts: ['역률', '피상전력']
    },
    
    // --- 1. 전기자기학 ---
    {
      id: 11, category: 'electromagnetics', title: '쿨롱의 법칙 (Coulomb\'s Law)',
      definition: '두 점전하 사이에 작용하는 정전기력은 전하량의 곱에 비례하고 거리의 제곱에 반비례한다.',
      formula: 'F = (1 / 4πε) × (Q1·Q2 / r²) [N]',
      frequency: '상', relatedConcepts: ['전계의 세기', '유전율']
    },
    {
      id: 12, category: 'electromagnetics', title: '패러데이-렌츠의 전자유도 법칙',
      definition: '코일을 관통하는 자속이 변화할 때, 그 변화를 방해하는 방향으로 유도 기전력이 발생한다.',
      formula: 'e = -N · (dΦ / dt) [V]',
      frequency: '상', relatedConcepts: ['인덕턴스', '플레밍의 오른손 법칙']
    },

    // --- 2. 전력공학 ---
    {
      id: 21, category: 'power', title: '페란티 현상 (Ferranti Effect)',
      definition: '경부하 또는 무부하 시 선로의 정전용량(C)으로 인해 수전단 전압이 송전단 전압보다 높아지는 현상.',
      formula: '원인: 선로의 정전용량 (충전전류)\n대책: 수전단에 분로리액터(Shunt Reactor) 설치',
      frequency: '상', relatedConcepts: ['분로리액터', '충전전류']
    },
    {
      id: 22, category: 'power', title: '코로나 현상 (Corona)',
      definition: '초고압 송전선로 주변의 공기 절연이 국부적으로 파괴되어 빛과 소리를 내며 방전하는 현상.',
      formula: '영향: 코로나 손실 발생, 통신선 유도장해, 전선 부식\n대책: 굵은 전선 사용, 복도체(다도체) 방식 채용',
      frequency: '중', relatedConcepts: ['복도체', '코로나 임계전압']
    },

    // --- 3. 전기기기 ---
    {
      id: 31, category: 'machine', title: '유도전동기의 동기속도와 슬립',
      definition: '고정자의 회전자기장 속도(동기속도)와 실제 회전자 속도의 차이 비율.',
      formula: '동기속도(Ns) = 120f / P [rpm]\n슬립(s) = (Ns - N) / Ns',
      frequency: '상', relatedConcepts: ['유도전동기', '회전자 속도']
    },
    {
      id: 32, category: 'machine', title: '변압기 권수비 (Turns Ratio)',
      definition: '1차 권선과 2차 권선의 감은 횟수 비. 전압, 전류, 임피던스 변환의 기준이 된다.',
      formula: '권수비(a) = N1/N2 = V1/V2 = I2/I1 = √(Z1/Z2)',
      frequency: '상', relatedConcepts: ['변압기', '임피던스 정합']
    },

    // --- 4. 회로이론 ---
    {
      id: 41, category: 'circuit', title: '유효전력, 무효전력, 피상전력',
      definition: '교류 회로에서 실제로 일을 하는 전력, 일을 하지 않는 전력, 그리고 이 둘의 벡터 합.',
      formula: '유효전력(P) = VI cosθ [W]\n무효전력(Pr) = VI sinθ [Var]\n피상전력(Pa) = VI [VA]',
      frequency: '상', relatedConcepts: ['역률', '삼각함수']
    },
    {
      id: 42, category: 'circuit', title: '테브난의 정리 (Thevenin\'s Theorem)',
      definition: '복잡한 선형 회로망을 하나의 등가 전압원(Vth)과 직렬 등가 저항(Rth)으로 단순화하는 정리.',
      formula: 'Vth: 개방단 전압\nRth: 전압원 단락 후 바라본 저항',
      frequency: '상', relatedConcepts: ['노턴의 정리', '중첩의 원리']
    },

    // --- 5. 제어공학 ---
    {
      id: 51, category: 'control', title: '전달함수 (Transfer Function)',
      definition: '초기값을 0으로 한 상태에서 시스템의 출력 라플라스 변환과 입력 라플라스 변환의 비.',
      formula: 'G(s) = C(s) / R(s)\n(입력에 대한 출력의 비율)',
      frequency: '상', relatedConcepts: ['라플라스 변환', '블록선도']
    },
    {
      id: 52, category: 'control', title: 'PID 제어',
      definition: '비례(P), 적분(I), 미분(D) 동작을 결합하여 오차를 줄이고 시스템의 응답성과 안정성을 높이는 제어.',
      formula: 'P (비례): 잔류편차 발생\nI (적분): 잔류편차 제거, 응답 느려짐\nD (미분): 오버슈트 억제, 응답속도 개선',
      frequency: '상', relatedConcepts: ['잔류편차', '오버슈트']
    },

    // --- 6. 전기설비기준 (KEC) ---
    {
      id: 61, category: 'regulation', title: '전압의 종별 (KEC 기준)',
      definition: '전기설비에서 직류와 교류의 전압 크기에 따른 저압, 고압, 특고압의 분류.',
      formula: '저압: AC 1kV 이하, DC 1.5kV 이하\n고압: 저압 초과 ~ 7kV 이하\n특고압: 7kV 초과',
      frequency: '상', relatedConcepts: ['특별고압']
    },
    {
      id: 62, category: 'regulation', title: '접지 시스템의 분류 (TN, TT, IT)',
      definition: '전원측과 기기 노출도전부의 접지 연결 방식에 따른 국제 표준 분류.',
      formula: 'TN: 전원 1점 접지, 기기는 보호도체(PE)로 전원 접지에 연결\nTT: 전원 1점 접지, 기기는 독립 접지\nIT: 전원 비접지(또는 고임피던스 접지), 기기 독립 접지',
      frequency: '상', relatedConcepts: ['보호도체(PE)', '누전차단기']
    },


    /* ==========================================
       [실기 모드] 데이터 파트
       ========================================== */
       
    // --- 7. 실기: 단답·수변전 ---
    {
      id: 201, category: 'prac_short', title: '역률 개선의 이점 4가지',
      definition: '부하에 병렬로 전력용 콘덴서를 설치하여 진상 무효전력을 공급, 역률을 개선했을 때 얻는 이점.',
      formula: '1. 전력 손실 감소\n2. 전압 강하 감소\n3. 설비 용량의 여력 증가\n4. 전기 요금 절감',
      frequency: '상', relatedConcepts: ['전력용 콘덴서', '무효전력']
    },
    {
      id: 202, category: 'prac_short', title: '피뢰기 (LA)의 구비조건 4가지',
      definition: '이상 전압(낙뢰 등) 내습 시 대지로 방전시키고 속류를 차단하는 피뢰기가 갖춰야 할 조건.',
      formula: '1. 충격 방전 개시 전압이 낮을 것\n2. 제한 전압이 낮을 것\n3. 상용 주파 방전 개시 전압이 높을 것\n4. 속류 차단 능력이 클 것',
      frequency: '상', relatedConcepts: ['피뢰기', '속류', '제한전압']
    },
    {
      id: 203, category: 'prac_short', title: '변압기 호흡작용과 대책',
      definition: '변압기 외부 온도와 내부 열에 의해 절연유가 수축/팽창하며 외부 공기가 출입하는 현상.',
      formula: '영향: 절연유의 열화(산화) 및 절연내력 저하\n대책: 호흡기(흡습기) 설치, 콘서베이터 설치',
      frequency: '중', relatedConcepts: ['절연유 열화', '콘서베이터']
    },

    // --- 8. 실기: 시퀀스·PLC ---
    {
      id: 211, category: 'prac_sequence', title: '자기유지 회로 (Self-Holding Circuit)',
      definition: '푸시버튼을 눌렀다 떼어도 릴레이 접점에 의해 동작 상태를 계속 유지하는 가장 기본적인 시퀀스 회로.',
      formula: '시작 버튼(a접점)과 릴레이 보조접점(a접점)을 병렬로 연결.\n정지 버튼(b접점)을 직렬로 연결하여 회로 차단.',
      frequency: '상', relatedConcepts: ['a접점', 'b접점', '전자접촉기(MC)']
    },
    {
      id: 212, category: 'prac_sequence', title: '인터록 회로 (Interlock Circuit)',
      definition: '기기의 동시 투입을 방지하기 위해, 한 기기가 동작 중일 때 다른 기기가 동작하지 못하도록 잠그는 회로.',
      formula: '상대방 릴레이의 b접점을 자신의 조작 회로에 직렬로 연결.\n적용: 전동기 정역 회전, Y-Δ 기동 회로 등',
      frequency: '상', relatedConcepts: ['동시투입 방지', '정역회전']
    },

    // --- 9. 실기: 테이블스펙 ---
    {
      id: 221, category: 'prac_table', title: '전선 굵기 선정의 3요소',
      definition: '설비 설계 시 전선의 굵기를 결정할 때 반드시 고려해야 하는 가장 중요한 세 가지 조건.',
      formula: '1. 허용 전류 (가장 중요)\n2. 전압 강하\n3. 기계적 강도',
      frequency: '상', relatedConcepts: ['허용전류', '전압강하']
    },
    {
      id: 222, category: 'prac_table', title: '간선의 허용전류 계산 (전동기 부하)',
      definition: '전동기 부하가 있을 때 간선의 최소 허용전류를 구하는 기준식.',
      formula: '전동기 정격전류 합(Im) ≤ 50A 인 경우: 1.25 × Im\n전동기 정격전류 합(Im) > 50A 인 경우: 1.1 × Im',
      frequency: '상', relatedConcepts: ['간선', '과전류 차단기']
    }
  ]
};

const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
