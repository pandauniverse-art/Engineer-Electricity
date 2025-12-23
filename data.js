// 전기기사 시험 학습 데이터
const electricianData = {
  categories: [
    { id: 'theory', name: '전기이론', icon: '⚡', color: '#3B82F6' },
    { id: 'power', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', name: '회로이론', icon: '🔄', color: '#8B5CF6' },
    { id: 'control', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', name: '전기설비기술기준', icon: '📋', color: '#EF4444' }
  ],
  
  concepts: [
    // ===== 전기이론 =====
    {
      id: 1,
      category: 'theory',
      title: '옴의 법칙 (Ohm\'s Law)',
      definition: '전압(V), 전류(I), 저항(R)의 관계를 나타내는 법칙. 도체에 흐르는 전류는 전압에 비례하고 저항에 반비례한다.',
      formula: 'V = I × R, I = V/R, R = V/I',
      frequency: '상',
      relatedConcepts: ['저항', '전압', '전류'],
      example: '12V 전압에서 4Ω 저항에 흐르는 전류는 3A'
    },
    {
      id: 2,
      category: 'theory',
      title: '키르히호프의 전류 법칙 (KCL)',
      definition: '회로의 한 점(노드)에 들어오는 전류의 합은 나가는 전류의 합과 같다는 법칙. 전하 보존 법칙에 기반한다.',
      formula: 'ΣI(in) = ΣI(out) 또는 ΣI = 0',
      frequency: '상',
      relatedConcepts: ['키르히호프의 전압 법칙', '노드 해석'],
      example: '노드에 2A, 3A가 들어오면 5A가 나간다'
    },
    {
      id: 3,
      category: 'theory',
      title: '키르히호프의 전압 법칙 (KVL)',
      definition: '폐회로에서 전압강하의 합은 전압상승의 합과 같다. 에너지 보존 법칙에 기반한다.',
      formula: 'ΣV = 0 (폐회로)',
      frequency: '상',
      relatedConcepts: ['키르히호프의 전류 법칙', '메쉬 해석'],
      example: '직렬회로에서 전압강하의 합 = 전원전압'
    },
    {
      id: 4,
      category: 'theory',
      title: '전력 (Electric Power)',
      definition: '단위 시간당 소비되거나 발생하는 전기 에너지. 단위는 와트(W).',
      formula: 'P = V × I = I²R = V²/R',
      frequency: '상',
      relatedConcepts: ['전력량', '역률', '피상전력'],
      example: '220V, 10A 회로의 전력은 2200W'
    },
    {
      id: 5,
      category: 'theory',
      title: '전력량 (Electric Energy)',
      definition: '일정 시간 동안 소비된 전력의 총합. 단위는 와트시(Wh) 또는 킬로와트시(kWh).',
      formula: 'W = P × t = V × I × t',
      frequency: '중',
      relatedConcepts: ['전력', '전력량계'],
      example: '2kW 히터를 3시간 사용하면 6kWh'
    },
    {
      id: 6,
      category: 'theory',
      title: '저항의 직렬연결',
      definition: '여러 저항이 일렬로 연결된 형태. 전체 저항은 각 저항의 합이다.',
      formula: 'R_total = R₁ + R₂ + R₃ + ...',
      frequency: '상',
      relatedConcepts: ['저항의 병렬연결', '분압'],
      example: '3Ω, 5Ω 직렬연결 시 합성저항 8Ω'
    },
    {
      id: 7,
      category: 'theory',
      title: '저항의 병렬연결',
      definition: '여러 저항이 나란히 연결된 형태. 컨덕턴스의 합으로 계산한다.',
      formula: '1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...',
      frequency: '상',
      relatedConcepts: ['저항의 직렬연결', '분류'],
      example: '6Ω, 3Ω 병렬연결 시 합성저항 2Ω'
    },
    {
      id: 8,
      category: 'theory',
      title: '전류밀도',
      definition: '도체의 단위 단면적당 흐르는 전류. 도체의 발열과 관련이 있다.',
      formula: 'J = I/A [A/m²]',
      frequency: '중',
      relatedConcepts: ['전류', '도체 단면적'],
      example: '10A가 5mm² 도선에 흐르면 2A/mm²'
    },
    {
      id: 9,
      category: 'theory',
      title: '도전율 (Conductivity)',
      definition: '물질이 전류를 잘 흐르게 하는 정도. 저항률의 역수.',
      formula: 'σ = 1/ρ [S/m]',
      frequency: '중',
      relatedConcepts: ['저항률', '도체', '부도체'],
      example: '구리의 도전율은 약 5.8×10⁷ S/m'
    },
    {
      id: 10,
      category: 'theory',
      title: '저항률 (Resistivity)',
      definition: '물질 고유의 전기 저항 특성. 길이 1m, 단면적 1m²당 저항값.',
      formula: 'ρ = R × A / L [Ω·m]',
      frequency: '중',
      relatedConcepts: ['도전율', '저항', '온도계수'],
      example: '구리의 저항률은 약 1.7×10⁻⁸ Ω·m'
    },

    // ===== 전력공학 =====
    {
      id: 11,
      category: 'power',
      title: '3상 교류 (Three-phase AC)',
      definition: '시간적으로 120° 위상차를 가진 세 개의 교류 전압. 효율적인 전력 전송이 가능하다.',
      formula: 'P = √3 × V_L × I_L × cosθ',
      frequency: '상',
      relatedConcepts: ['Y결선', 'Δ결선', '선간전압'],
      example: '380V 3상 전원은 각상 220V'
    },
    {
      id: 12,
      category: 'power',
      title: 'Y결선 (Wye Connection)',
      definition: '3상 권선을 별 모양으로 연결한 방식. 중성점이 존재한다.',
      formula: 'V_L = √3 × V_p, I_L = I_p',
      frequency: '상',
      relatedConcepts: ['Δ결선', '선간전압', '상전압'],
      example: '상전압 220V → 선간전압 380V'
    },
    {
      id: 13,
      category: 'power',
      title: 'Δ결선 (Delta Connection)',
      definition: '3상 권선을 삼각형으로 연결한 방식. 중성점이 없다.',
      formula: 'V_L = V_p, I_L = √3 × I_p',
      frequency: '상',
      relatedConcepts: ['Y결선', '순환전류'],
      example: '상전류 10A → 선전류 17.3A'
    },
    {
      id: 14,
      category: 'power',
      title: '역률 (Power Factor)',
      definition: '피상전력에 대한 유효전력의 비. 전력 사용 효율을 나타낸다.',
      formula: 'cosθ = P / S = P / (√3 × V × I)',
      frequency: '상',
      relatedConcepts: ['유효전력', '무효전력', '피상전력'],
      example: '역률 0.8은 80%의 전력만 유효하게 사용'
    },
    {
      id: 15,
      category: 'power',
      title: '유효전력 (Active Power)',
      definition: '실제로 일을 하는데 사용되는 전력. 단위는 W 또는 kW.',
      formula: 'P = V × I × cosθ [W]',
      frequency: '상',
      relatedConcepts: ['무효전력', '피상전력', '역률'],
      example: '유효전력이 높을수록 효율적'
    },
    {
      id: 16,
      category: 'power',
      title: '무효전력 (Reactive Power)',
      definition: '자기장이나 전기장을 형성하는데 사용되는 전력. 단위는 Var 또는 kVar.',
      formula: 'Q = V × I × sinθ [Var]',
      frequency: '상',
      relatedConcepts: ['유효전력', '진상/지상', '역률개선'],
      example: '모터, 변압기에서 발생'
    },
    {
      id: 17,
      category: 'power',
      title: '피상전력 (Apparent Power)',
      definition: '전압과 전류의 곱으로 나타낸 전력. 단위는 VA 또는 kVA.',
      formula: 'S = V × I = √(P² + Q²) [VA]',
      frequency: '상',
      relatedConcepts: ['유효전력', '무효전력'],
      example: '변압기 용량은 피상전력으로 표시'
    },
    {
      id: 18,
      category: 'power',
      title: '송전손실',
      definition: '전력을 송전할 때 전선의 저항으로 인해 발생하는 손실.',
      formula: 'P_loss = 3 × I² × R (3상)',
      frequency: '상',
      relatedConcepts: ['전압강하', '전선 굵기', '고압송전'],
      example: '전압을 높이면 전류가 줄어 손실 감소'
    },
    {
      id: 19,
      category: 'power',
      title: '전압강하',
      definition: '전선의 저항으로 인해 부하단 전압이 낮아지는 현상.',
      formula: 'e = 2 × I × (R×cosθ + X×sinθ)',
      frequency: '상',
      relatedConcepts: ['송전손실', '전압변동률', '허용전압강하'],
      example: '전압강하율 = (송전단전압-수전단전압)/송전단전압'
    },
    {
      id: 20,
      category: 'power',
      title: '중성점 접지',
      definition: '변압기나 발전기의 중성점을 대지에 접속하는 것. 안전과 보호를 위해 필요.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['직접접지', '저항접지', '소호리액터'],
      example: '지락사고 시 안전을 위한 필수 조치'
    },

    // ===== 전기기기 =====
    {
      id: 21,
      category: 'machine',
      title: '변압기 (Transformer)',
      definition: '전자기 유도 작용을 이용하여 교류 전압을 변환하는 기기. 승압 또는 강압에 사용.',
      formula: 'V₁/V₂ = N₁/N₂ = I₂/I₁',
      frequency: '상',
      relatedConcepts: ['권수비', '변압비', '철손'],
      example: '1차 220V, 권수비 1:2 → 2차 440V'
    },
    {
      id: 22,
      category: 'machine',
      title: '변압기 효율',
      definition: '변압기의 출력전력과 입력전력의 비. 일반적으로 97~99%.',
      formula: 'η = (출력/입력) × 100 = P₂/(P₂+손실) × 100',
      frequency: '상',
      relatedConcepts: ['철손', '동손', '무부하손'],
      example: '최대효율은 철손=동손일 때'
    },
    {
      id: 23,
      category: 'machine',
      title: '유도전동기 (Induction Motor)',
      definition: '회전자기장에 의해 유도전류가 발생하여 회전하는 전동기. 가장 널리 사용됨.',
      formula: 's = (Ns - N) / Ns (슬립)',
      frequency: '상',
      relatedConcepts: ['슬립', '동기속도', '농형', '권선형'],
      example: '3상 유도전동기는 산업용으로 가장 많이 사용'
    },
    {
      id: 24,
      category: 'machine',
      title: '동기속도 (Synchronous Speed)',
      definition: '회전자기장이 회전하는 속도. 주파수와 극수에 의해 결정된다.',
      formula: 'Ns = 120f / P [rpm]',
      frequency: '상',
      relatedConcepts: ['슬립', '극수', '주파수'],
      example: '60Hz, 4극 → 동기속도 1800rpm'
    },
    {
      id: 25,
      category: 'machine',
      title: '슬립 (Slip)',
      definition: '동기속도와 실제 회전속도의 차이. 유도전동기의 중요한 특성.',
      formula: 's = (Ns - N) / Ns × 100%',
      frequency: '상',
      relatedConcepts: ['동기속도', '회전자저항', '토크'],
      example: '정격부하 시 슬립 3~5%'
    },
    {
      id: 26,
      category: 'machine',
      title: '토크 (Torque)',
      definition: '회전력. 전동기의 출력을 나타내는 중요한 특성.',
      formula: 'T = 9.55 × P / N [N·m]',
      frequency: '상',
      relatedConcepts: ['출력', '회전수', '기동토크'],
      example: '10kW, 1500rpm → 토크 63.7N·m'
    },
    {
      id: 27,
      category: 'machine',
      title: '동기발전기 (Synchronous Generator)',
      definition: '계자를 동기속도로 회전시켜 교류를 발생시키는 발전기. 발전소에서 사용.',
      formula: 'f = PN / 120 [Hz]',
      frequency: '중',
      relatedConcepts: ['여자', '동기 임피던스', '단락비'],
      example: '대부분의 발전소는 동기발전기 사용'
    },
    {
      id: 28,
      category: 'machine',
      title: '직류전동기 (DC Motor)',
      definition: '직류 전원으로 동작하는 전동기. 속도 제어가 용이하다.',
      formula: 'N ∝ (V - IaRa) / Φ',
      frequency: '중',
      relatedConcepts: ['타여자', '분권', '직권'],
      example: '엘리베이터, 전철 등에 사용'
    },
    {
      id: 29,
      category: 'machine',
      title: '단상 유도전동기',
      definition: '단상 교류로 동작하는 소형 전동기. 기동장치가 필요하다.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['콘덴서형', '반발형', '세이딩코일형'],
      example: '선풍기, 세탁기 등 가전제품에 사용'
    },
    {
      id: 30,
      category: 'machine',
      title: '철손 (Iron Loss)',
      definition: '변압기나 전동기의 철심에서 발생하는 손실. 히스테리시스손과 와류손의 합.',
      formula: 'Pi = Ph + Pe (히스테리시스손 + 와류손)',
      frequency: '중',
      relatedConcepts: ['동손', '무부하손', '규소강판'],
      example: '철손은 전압에 비례, 부하와 무관'
    },

    // ===== 회로이론 =====
    {
      id: 31,
      category: 'circuit',
      title: '임피던스 (Impedance)',
      definition: '교류회로에서 전압과 전류의 비. 저항, 리액턴스의 복소수 합.',
      formula: 'Z = R + jX = |Z|∠θ [Ω]',
      frequency: '상',
      relatedConcepts: ['저항', '리액턴스', '어드미턴스'],
      example: 'Z = 3 + j4 = 5∠53.1° Ω'
    },
    {
      id: 32,
      category: 'circuit',
      title: '유도 리액턴스 (Inductive Reactance)',
      definition: '인덕터(코일)가 교류에 대해 나타내는 저항. 주파수에 비례한다.',
      formula: 'XL = 2πfL = ωL [Ω]',
      frequency: '상',
      relatedConcepts: ['인덕턴스', '용량 리액턴스', '임피던스'],
      example: '60Hz, 0.1H 코일 → XL = 37.7Ω'
    },
    {
      id: 33,
      category: 'circuit',
      title: '용량 리액턴스 (Capacitive Reactance)',
      definition: '커패시터(축전기)가 교류에 대해 나타내는 저항. 주파수에 반비례한다.',
      formula: 'Xc = 1/(2πfC) = 1/(ωC) [Ω]',
      frequency: '상',
      relatedConcepts: ['정전용량', '유도 리액턴스', '임피던스'],
      example: '60Hz, 100μF → Xc = 26.5Ω'
    },
    {
      id: 34,
      category: 'circuit',
      title: '공진 (Resonance)',
      definition: 'RLC 회로에서 유도 리액턴스와 용량 리액턴스가 같아지는 상태.',
      formula: 'f0 = 1/(2π√LC) [Hz]',
      frequency: '상',
      relatedConcepts: ['직렬공진', '병렬공진', 'Q값'],
      example: '공진 시 임피던스 최소(직렬) 또는 최대(병렬)'
    },
    {
      id: 35,
      category: 'circuit',
      title: '테브난 정리 (Thevenin\'s Theorem)',
      definition: '복잡한 회로를 등가 전압원과 직렬 저항으로 단순화할 수 있다.',
      formula: 'Vth = 개방전압, Rth = 내부저항',
      frequency: '중',
      relatedConcepts: ['노턴 정리', '중첩의 정리'],
      example: '복잡한 회로 해석을 간단하게 만듦'
    },
    {
      id: 36,
      category: 'circuit',
      title: '노턴 정리 (Norton\'s Theorem)',
      definition: '복잡한 회로를 등가 전류원과 병렬 저항으로 단순화할 수 있다.',
      formula: 'In = 단락전류, Rn = 내부저항',
      frequency: '중',
      relatedConcepts: ['테브난 정리', '등가회로'],
      example: '테브난 정리와 쌍대 관계'
    },
    {
      id: 37,
      category: 'circuit',
      title: '중첩의 정리 (Superposition Theorem)',
      definition: '여러 전원이 있는 회로에서 각 전원의 효과를 따로 계산하여 합산할 수 있다.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['선형회로', '전원', '독립성'],
      example: '하나씩 전원을 고려하여 계산 후 합산'
    },
    {
      id: 38,
      category: 'circuit',
      title: 'RC 회로 시정수',
      definition: 'RC 회로에서 전압이나 전류가 최종값의 약 63%에 도달하는 시간.',
      formula: 'τ = RC [초]',
      frequency: '중',
      relatedConcepts: ['과도현상', '충전', '방전'],
      example: '1MΩ, 1μF → 시정수 1초'
    },
    {
      id: 39,
      category: 'circuit',
      title: 'RL 회로 시정수',
      definition: 'RL 회로에서 전류가 최종값의 약 63%에 도달하는 시간.',
      formula: 'τ = L/R [초]',
      frequency: '중',
      relatedConcepts: ['과도현상', '전류 증가', '전류 감소'],
      example: '1H, 100Ω → 시정수 0.01초'
    },
    {
      id: 40,
      category: 'circuit',
      title: '대역폭 (Bandwidth)',
      definition: '공진회로에서 전력이 최대값의 1/2이 되는 주파수 범위.',
      formula: 'BW = f2 - f1 = f0/Q [Hz]',
      frequency: '중',
      relatedConcepts: ['공진', 'Q값', '선택도'],
      example: 'Q값이 클수록 대역폭이 좁아짐'
    },

    // ===== 제어공학 =====
    {
      id: 41,
      category: 'control',
      title: '전달함수 (Transfer Function)',
      definition: '제어시스템의 입력과 출력의 관계를 라플라스 변환으로 나타낸 함수.',
      formula: 'G(s) = Y(s) / X(s)',
      frequency: '상',
      relatedConcepts: ['라플라스 변환', '블록선도', '극점'],
      example: '시스템의 동특성을 주파수 영역에서 분석'
    },
    {
      id: 42,
      category: 'control',
      title: '개루프 제어 (Open Loop Control)',
      definition: '출력을 입력으로 피드백하지 않는 제어 방식. 간단하지만 외란에 약하다.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['폐루프 제어', '피드백', '외란'],
      example: '전자레인지 타이머 제어'
    },
    {
      id: 43,
      category: 'control',
      title: '폐루프 제어 (Closed Loop Control)',
      definition: '출력을 측정하여 입력으로 피드백하는 제어 방식. 정밀하고 외란에 강하다.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['피드백', '오차신호', '안정도'],
      example: '에어컨 온도 제어'
    },
    {
      id: 44,
      category: 'control',
      title: 'PID 제어',
      definition: '비례(P), 적분(I), 미분(D) 제어를 조합한 제어 방식. 산업현장에서 가장 많이 사용.',
      formula: 'u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt',
      frequency: '상',
      relatedConcepts: ['비례제어', '적분제어', '미분제어'],
      example: 'P: 빠른 응답, I: 정상편차 제거, D: 오버슈트 감소'
    },
    {
      id: 45,
      category: 'control',
      title: '라플라스 변환 (Laplace Transform)',
      definition: '시간 영역의 함수를 복소수 영역으로 변환하는 수학적 도구.',
      formula: 'F(s) = ∫[0→∞] f(t)e^(-st)dt',
      frequency: '중',
      relatedConcepts: ['전달함수', 's영역', '역변환'],
      example: '미분방정식을 대수방정식으로 변환'
    },
    {
      id: 46,
      category: 'control',
      title: '보드 선도 (Bode Plot)',
      definition: '주파수 응답을 나타내는 그래프. 이득선도와 위상선도로 구성.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['주파수 응답', '이득여유', '위상여유'],
      example: '시스템 안정도 판별에 사용'
    },
    {
      id: 47,
      category: 'control',
      title: '나이퀴스트 선도 (Nyquist Plot)',
      definition: '개루프 전달함수의 주파수 응답을 복소평면에 나타낸 선도.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['안정도 판별', '임계점', '궤적'],
      example: '(-1, j0)점을 둘러싸는 횟수로 안정도 판별'
    },
    {
      id: 48,
      category: 'control',
      title: '시퀀스 제어',
      definition: '미리 정해진 순서에 따라 제어 동작을 진행하는 제어 방식.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['PLC', '래더 다이어그램', '타이머'],
      example: '자동 세차기, 신호등 제어'
    },
    {
      id: 49,
      category: 'control',
      title: 'PLC (Programmable Logic Controller)',
      definition: '프로그램 가능한 논리 제어기. 시퀀스 제어를 디지털화한 장치.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['래더 다이어그램', 'I/O 모듈', '시퀀스'],
      example: '생산 라인 자동화에 필수'
    },
    {
      id: 50,
      category: 'control',
      title: '오버슈트 (Overshoot)',
      definition: '제어 시스템의 출력이 목표값을 초과하는 정도.',
      formula: 'Mp = (최대값 - 정상값) / 정상값 × 100%',
      frequency: '중',
      relatedConcepts: ['응답특성', '정착시간', '감쇠비'],
      example: '오버슈트가 클수록 시스템이 불안정'
    },

    // ===== 전기설비기술기준 =====
    {
      id: 51,
      category: 'regulation',
      title: '접지공사 종류',
      definition: '전기설비의 안전을 위한 접지. 제1종~제3종, 특별 제3종으로 구분.',
      formula: '제1종: 10Ω 이하, 제2종: 저압용, 제3종: 100Ω 이하',
      frequency: '상',
      relatedConcepts: ['접지저항', '보호접지', '누전차단기'],
      example: '고압: 제1종, 저압: 제3종'
    },
    {
      id: 52,
      category: 'regulation',
      title: '과전류차단기',
      definition: '과전류 발생 시 회로를 자동으로 차단하는 보호장치.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['배선용차단기', '누전차단기', '퓨즈'],
      example: 'MCCB, ELB, NFB 등'
    },
    {
      id: 53,
      category: 'regulation',
      title: '누전차단기 (ELB)',
      definition: '누전 전류를 감지하여 자동으로 전로를 차단하는 장치.',
      formula: '동작시간: 0.03초 이내, 정격감도전류: 15mA 또는 30mA',
      frequency: '상',
      relatedConcepts: ['접지', '감전사고', '영상변류기'],
      example: '욕실, 주방 등 물기 있는 곳 필수'
    },
    {
      id: 54,
      category: 'regulation',
      title: '전선의 허용전류',
      definition: '전선이 안전하게 흘릴 수 있는 최대 전류.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['전선 굵기', '온도상승', '절연열화'],
      example: '2.5mm² 단선: 약 35A'
    },
    {
      id: 55,
      category: 'regulation',
      title: '저압 전로의 절연저항',
      definition: '저압 전로가 갖추어야 할 최소 절연저항값.',
      formula: '대지전압 150V 이하: 0.1MΩ 이상, 300V 이하: 0.2MΩ 이상',
      frequency: '상',
      relatedConcepts: ['절연내력', '메거', '누설전류'],
      example: '절연저항 측정은 메거로 실시'
    },
    {
      id: 56,
      category: 'regulation',
      title: '옥내배선 공사 방법',
      definition: '건물 내부의 전선을 설치하는 방법. 합성수지관, 금속관 등.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['애자공사', '금속관공사', '합성수지관공사'],
      example: 'PVC관, EMT관, CD관 등'
    },
    {
      id: 57,
      category: 'regulation',
      title: '고압 가공전선로',
      definition: '고압 전선을 공중에 시설하는 전선로. 안전거리 확보 필요.',
      formula: '지표상 높이: 5m 이상',
      frequency: '중',
      relatedConcepts: ['지지물', '완금', '애자'],
      example: '도로 횡단 시 6m 이상'
    },
    {
      id: 58,
      category: 'regulation',
      title: '특고압 전로의 절연내력',
      definition: '특고압 전로가 견디어야 할 최대 전압.',
      formula: '최대사용전압의 1.5배 (최소 10,000V) 10분간',
      frequency: '중',
      relatedConcepts: ['절연저항', '내전압시험', '연면방전'],
      example: '22.9kV 전로: 34.35kV에서 10분간 견딜 것'
    },
    {
      id: 59,
      category: 'regulation',
      title: '피뢰기 (Arrester)',
      definition: '낙뢰로 인한 이상 전압으로부터 전기설비를 보호하는 장치.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['서지흡수기', '피뢰침', '접지'],
      example: '변전소, 주상변압기에 필수 설치'
    },
    {
      id: 60,
      category: 'regulation',
      title: '전기사용 장소의 시설',
      definition: '전기를 사용하는 장소의 안전을 위한 시설 기준.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['배전반', '분전반', '접지'],
      example: '습윤 장소는 방수형 기구 사용'
    },

    // 추가 핵심 개념들...
    {
      id: 61,
      category: 'theory',
      title: '쿨롱의 법칙 (Coulomb\'s Law)',
      definition: '두 전하 사이에 작용하는 힘은 전하량의 곱에 비례하고 거리의 제곱에 반비례한다.',
      formula: 'F = k × q₁q₂ / r²',
      frequency: '중',
      relatedConcepts: ['전기장', '전하', '유전율'],
      example: '정전기력의 기본 법칙'
    },
    {
      id: 62,
      category: 'theory',
      title: '전기장 (Electric Field)',
      definition: '전하 주위의 공간에 형성되는 힘의 장. 단위 전하당 받는 힘.',
      formula: 'E = F/q = V/d [V/m]',
      frequency: '중',
      relatedConcepts: ['전위', '등전위면', '전기력선'],
      example: '전기장의 방향은 양전하가 받는 힘의 방향'
    },
    {
      id: 63,
      category: 'theory',
      title: '정전용량 (Capacitance)',
      definition: '도체가 전하를 축적할 수 있는 능력. 단위는 F(패럿).',
      formula: 'C = Q/V = εA/d [F]',
      frequency: '상',
      relatedConcepts: ['축전기', '유전체', '유전율'],
      example: '평행판 축전기의 정전용량'
    },
    {
      id: 64,
      category: 'theory',
      title: '플레밍의 왼손법칙',
      definition: '자기장 속의 도체에 흐르는 전류가 받는 힘의 방향을 나타낸다.',
      formula: '엄지: 힘, 검지: 자기장, 중지: 전류',
      frequency: '중',
      relatedConcepts: ['플레밍의 오른손법칙', '전자력', '모터'],
      example: '전동기의 회전 원리'
    },
    {
      id: 65,
      category: 'theory',
      title: '플레밍의 오른손법칙',
      definition: '도체가 자기장을 끊을 때 발생하는 유도 기전력의 방향을 나타낸다.',
      formula: '엄지: 운동, 검지: 자기장, 중지: 전류(기전력)',
      frequency: '중',
      relatedConcepts: ['전자유도', '발전기', '렌츠의 법칙'],
      example: '발전기의 발전 원리'
    },
    {
      id: 66,
      category: 'power',
      title: '수력발전',
      definition: '물의 위치 에너지를 이용하여 발전하는 방식.',
      formula: 'P = 9.8 × Q × H × η [kW]',
      frequency: '중',
      relatedConcepts: ['댐', '수차', '조속기'],
      example: 'Q: 유량(m³/s), H: 낙차(m)'
    },
    {
      id: 67,
      category: 'power',
      title: '화력발전',
      definition: '화석연료를 연소시켜 발생한 열로 증기를 만들어 발전하는 방식.',
      formula: '열효율 = 출력/입력 × 100%',
      frequency: '중',
      relatedConcepts: ['보일러', '터빈', '복수기'],
      example: '석탄, LNG를 주로 사용'
    },
    {
      id: 68,
      category: 'power',
      title: '변전소',
      definition: '전압을 변성하고 전력을 분배하는 시설.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['송전', '배전', '차단기'],
      example: '송전 → 1차 변전소 → 2차 변전소 → 배전'
    },
    {
      id: 69,
      category: 'power',
      title: '차단기 (Circuit Breaker)',
      definition: '전로를 개폐하고 고장 시 자동으로 차단하는 장치.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['차단용량', '소호', 'ACB', 'VCB'],
      example: '유입식, 가스식, 진공식 등'
    },
    {
      id: 70,
      category: 'power',
      title: '배전 방식',
      definition: '수용가에 전력을 공급하는 방식. 단상, 3상 등.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['방사상', '환상', '네트워크'],
      example: '주택: 단상 220V, 공장: 3상 380V'
    },
    {
      id: 71,
      category: 'machine',
      title: '권수비',
      definition: '변압기 1차 권선과 2차 권선의 감은 횟수 비.',
      formula: 'a = N₁/N₂ = V₁/V₂ = I₂/I₁',
      frequency: '상',
      relatedConcepts: ['변압비', '변압기', '이상변압기'],
      example: '권수비가 변압비와 같음'
    },
    {
      id: 72,
      category: 'machine',
      title: '변압기 결선',
      definition: '3상 변압기를 연결하는 방법. Y-Y, Δ-Δ, Y-Δ, Δ-Y 등.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['Y결선', 'Δ결선', 'V결선'],
      example: 'Y-Δ: 송전용, Δ-Y: 배전용'
    },
    {
      id: 73,
      category: 'machine',
      title: '무부하손 (No-load Loss)',
      definition: '변압기가 무부하 상태일 때 발생하는 손실. 주로 철손.',
      formula: 'Pi = Ph + Pe',
      frequency: '중',
      relatedConcepts: ['철손', '히스테리시스손', '와류손'],
      example: '부하와 무관하게 일정'
    },
    {
      id: 74,
      category: 'machine',
      title: '동손 (Copper Loss)',
      definition: '권선의 저항으로 인한 손실. 부하전류의 제곱에 비례.',
      formula: 'Pc = I²R',
      frequency: '중',
      relatedConcepts: ['철손', '부하손', '권선저항'],
      example: '부하가 클수록 증가'
    },
    {
      id: 75,
      category: 'machine',
      title: '기동법 (Starting Method)',
      definition: '전동기를 기동하는 방법. 직입, Y-Δ, 기동보상기 등.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['기동전류', '기동토크', '유도전동기'],
      example: 'Y-Δ 기동: 기동전류 1/3로 감소'
    },
    {
      id: 76,
      category: 'machine',
      title: '속도 제어',
      definition: '전동기의 회전속도를 조절하는 방법.',
      formula: 'N ∝ f/P (동기전동기)',
      frequency: '중',
      relatedConcepts: ['극수 변환', '주파수 변환', '전압 제어'],
      example: '인버터로 주파수 변환하여 제어'
    },
    {
      id: 77,
      category: 'machine',
      title: '제동법 (Braking Method)',
      definition: '전동기를 정지시키는 방법. 회생, 발전, 역상, 직류 제동 등.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['회생제동', '발전제동', '역상제동'],
      example: '엘리베이터는 회생제동 사용'
    },
    {
      id: 78,
      category: 'machine',
      title: '역률 개선',
      definition: '무효전력을 줄여 역률을 향상시키는 방법.',
      formula: '진상 콘덴서 병렬 연결',
      frequency: '상',
      relatedConcepts: ['역률', '무효전력', '콘덴서'],
      example: '역률이 낮으면 전기요금 할증'
    },
    {
      id: 79,
      category: 'machine',
      title: '정류기 (Rectifier)',
      definition: '교류를 직류로 변환하는 장치.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['다이오드', '사이리스터', '반파정류', '전파정류'],
      example: '배터리 충전기, DC 전원장치'
    },
    {
      id: 80,
      category: 'machine',
      title: '인버터 (Inverter)',
      definition: '직류를 교류로 변환하거나 주파수를 변환하는 장치.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['VVVF', '속도제어', 'PWM'],
      example: '전동기 속도 제어에 필수'
    },
    {
      id: 81,
      category: 'circuit',
      title: '맥스웰 방정식',
      definition: '전자기학의 기본 법칙을 나타내는 4개의 방정식.',
      formula: '가우스 법칙, 자기 가우스 법칙, 패러데이 법칙, 앙페르-맥스웰 법칙',
      frequency: '하',
      relatedConcepts: ['전자기파', '전기장', '자기장'],
      example: '전자기학의 기초'
    },
    {
      id: 82,
      category: 'circuit',
      title: 'RLC 직렬회로',
      definition: '저항, 인덕터, 커패시터가 직렬로 연결된 회로.',
      formula: 'Z = R + j(XL - Xc)',
      frequency: '상',
      relatedConcepts: ['공진', '임피던스', 'Q값'],
      example: '공진주파수에서 Z = R (최소)'
    },
    {
      id: 83,
      category: 'circuit',
      title: 'RLC 병렬회로',
      definition: '저항, 인덕터, 커패시터가 병렬로 연결된 회로.',
      formula: 'Y = G + j(Bc - BL)',
      frequency: '중',
      relatedConcepts: ['어드미턴스', '공진', '탱크회로'],
      example: '공진주파수에서 Z = 최대'
    },
    {
      id: 84,
      category: 'circuit',
      title: 'Q값 (Quality Factor)',
      definition: '공진회로의 예리함을 나타내는 값. 선택도와 관련.',
      formula: 'Q = f0/(f2-f1) = ωL/R = 1/(ωCR)',
      frequency: '중',
      relatedConcepts: ['공진', '대역폭', '선택도'],
      example: 'Q가 클수록 선택도가 좋음'
    },
    {
      id: 85,
      category: 'circuit',
      title: '필터 (Filter)',
      definition: '특정 주파수 대역을 통과시키거나 차단하는 회로.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['저역통과', '고역통과', '대역통과', '대역저지'],
      example: 'RC 저역통과 필터, LC 고역통과 필터'
    },
    {
      id: 86,
      category: 'circuit',
      title: '과도현상 (Transient Response)',
      definition: '회로의 상태가 급격히 변할 때 나타나는 일시적인 현상.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['시정수', '정상상태', 'RC회로', 'RL회로'],
      example: '스위치 on/off 시 발생'
    },
    {
      id: 87,
      category: 'circuit',
      title: '푸리에 급수 (Fourier Series)',
      definition: '주기 함수를 정현파의 합으로 표현하는 방법.',
      formula: 'f(t) = a₀ + Σ(an·cos(nωt) + bn·sin(nωt))',
      frequency: '중',
      relatedConcepts: ['고조파', '파형 분석', '주파수 스펙트럼'],
      example: '비정현파를 정현파로 분해'
    },
    {
      id: 88,
      category: 'circuit',
      title: '4단자 회로망',
      definition: '입력단과 출력단을 가진 회로망. Z, Y, h, ABCD 파라미터로 표현.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['임피던스 파라미터', '어드미턴스 파라미터'],
      example: '증폭기, 필터 해석에 사용'
    },
    {
      id: 89,
      category: 'circuit',
      title: '대칭 좌표법',
      definition: '불평형 3상 회로를 정상분, 역상분, 영상분으로 분해하는 방법.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['정상분', '역상분', '영상분', '불평형'],
      example: '고장 해석에 필수'
    },
    {
      id: 90,
      category: 'circuit',
      title: '%임피던스',
      definition: '변압기나 발전기의 임피던스를 정격값 기준 백분율로 표시.',
      formula: '%Z = (Z/Z_base) × 100',
      frequency: '중',
      relatedConcepts: ['단락전류', '전압변동률'],
      example: '단락전류 = 정격전류 × 100/%Z'
    },
    {
      id: 91,
      category: 'control',
      title: '안정도 (Stability)',
      definition: '제어시스템이 외란이나 초기 조건에도 원래 상태로 돌아오는 성질.',
      formula: '특성방정식의 모든 근이 좌반평면에 존재',
      frequency: '상',
      relatedConcepts: ['라우스 판별법', '나이퀴스트 판별법', '근궤적'],
      example: '불안정하면 발산 또는 진동'
    },
    {
      id: 92,
      category: 'control',
      title: '라우스 판별법 (Routh Criterion)',
      definition: '특성방정식의 계수로부터 안정도를 판별하는 방법.',
      formula: '라우스 배열표의 첫 열 부호 변화 횟수 = 우반평면 근의 개수',
      frequency: '중',
      relatedConcepts: ['안정도', '특성방정식', '근의 위치'],
      example: '부호 변화 0회 → 안정'
    },
    {
      id: 93,
      category: 'control',
      title: '근궤적법 (Root Locus)',
      definition: '시스템의 이득이 변할 때 특성방정식의 근이 이동하는 궤적.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['극점', '영점', '안정도'],
      example: '이득 증가 시 근의 이동 경로'
    },
    {
      id: 94,
      category: 'control',
      title: '정상편차 (Steady-state Error)',
      definition: '제어 시스템이 정상상태에 도달했을 때의 목표값과 실제값의 차이.',
      formula: 'ess = 목표값 - 실제값',
      frequency: '상',
      relatedConcepts: ['적분제어', '형별', '오차상수'],
      example: '적분제어로 정상편차 제거'
    },
    {
      id: 95,
      category: 'control',
      title: '과도응답 특성',
      definition: '계단입력에 대한 시스템의 응답 특성.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['상승시간', '오버슈트', '정착시간', '감쇠비'],
      example: '빠르고 안정적인 응답이 이상적'
    },
    {
      id: 96,
      category: 'control',
      title: '주파수 응답 (Frequency Response)',
      definition: '정현파 입력에 대한 시스템의 정상상태 출력 특성.',
      formula: 'G(jω)',
      frequency: '중',
      relatedConcepts: ['보드선도', '나이퀴스트선도', '이득', '위상'],
      example: '주파수에 따른 이득과 위상 변화'
    },
    {
      id: 97,
      category: 'control',
      title: '제어기 튜닝',
      definition: 'PID 제어기의 매개변수를 최적화하는 과정.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['지글러-니콜스', 'PID 게인', '응답특성'],
      example: 'Ziegler-Nichols 방법이 대표적'
    },
    {
      id: 98,
      category: 'control',
      title: '상태공간 표현',
      definition: '시스템을 1차 미분방정식 형태로 표현하는 방법.',
      formula: 'ẋ = Ax + Bu, y = Cx + Du',
      frequency: '중',
      relatedConcepts: ['상태변수', '가관측성', '가제어성'],
      example: '다변수 시스템 해석에 유리'
    },
    {
      id: 99,
      category: 'control',
      title: '최적제어 (Optimal Control)',
      definition: '성능지수를 최소화하는 제어 입력을 구하는 제어 방법.',
      formula: '',
      frequency: '하',
      relatedConcepts: ['LQR', '칼만필터', '성능지수'],
      example: '최소 에너지, 최소 시간 제어'
    },
    {
      id: 100,
      category: 'control',
      title: '적응제어 (Adaptive Control)',
      definition: '시스템의 변화에 따라 제어기 파라미터를 자동으로 조정하는 제어.',
      formula: '',
      frequency: '하',
      relatedConcepts: ['파라미터 추정', '자기동조', 'MRAC'],
      example: '환경 변화에 적응'
    },
    {
      id: 101,
      category: 'regulation',
      title: '전압의 종류',
      definition: '전기설비기술기준에 따른 전압의 분류.',
      formula: '저압: 1kV 이하, 고압: 1kV~7kV, 특고압: 7kV 초과',
      frequency: '상',
      relatedConcepts: ['공칭전압', '사용전압', '최대사용전압'],
      example: '22.9kV는 특고압'
    },
    {
      id: 102,
      category: 'regulation',
      title: '전선의 종류',
      definition: '용도와 구조에 따른 전선의 분류.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['나전선', '절연전선', 'CV케이블', 'ACSR'],
      example: 'HIV: 600V 비닐절연전선'
    },
    {
      id: 103,
      category: 'regulation',
      title: '안전거리',
      definition: '전로와 다른 시설물 사이에 확보해야 할 최소 거리.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['이격거리', '접근한계거리'],
      example: '저압 전로와 건조물: 0.3m 이상'
    },
    {
      id: 104,
      category: 'regulation',
      title: '보호계전기',
      definition: '전력계통의 이상 상태를 검출하여 차단기를 동작시키는 장치.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['OCR', 'OCGR', 'SGR', 'DGR'],
      example: 'OCR: 과전류계전기'
    },
    {
      id: 105,
      category: 'regulation',
      title: '전기재해 예방',
      definition: '감전, 화재, 폭발 등 전기재해를 예방하기 위한 조치.',
      formula: '',
      frequency: '상',
      relatedConcepts: ['감전방지', '접지', '절연', '보호구'],
      example: '정전작업, 활선작업 시 안전수칙'
    },
    {
      id: 106,
      category: 'regulation',
      title: '폭발위험장소',
      definition: '가연성 가스, 증기, 분진이 존재하여 폭발 위험이 있는 장소.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['방폭구조', '0종, 1종, 2종 장소'],
      example: '주유소, 도장실, 석유화학공장'
    },
    {
      id: 107,
      category: 'regulation',
      title: '전기공사의 종류',
      definition: '전기설비를 시설하는 공사의 종류.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['합성수지관공사', '금속관공사', '케이블공사'],
      example: '공사 종류에 따라 사용 재료와 방법 다름'
    },
    {
      id: 108,
      category: 'regulation',
      title: '특수장소의 시설',
      definition: '욕실, 사우나 등 특수한 장소의 전기설비 시설 기준.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['방수형', '방습형', '방폭형'],
      example: '욕실: 방수형 기구, 누전차단기 필수'
    },
    {
      id: 109,
      category: 'regulation',
      title: '전기사업법',
      definition: '전기사업의 운영과 전기설비의 안전 관리에 관한 법률.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['전기안전관리자', '자가용전기설비'],
      example: '전기기사는 전기안전관리자로 선임 가능'
    },
    {
      id: 110,
      category: 'regulation',
      title: '전기설비 점검',
      definition: '전기설비의 안전을 확보하기 위한 정기적인 점검.',
      formula: '',
      frequency: '중',
      relatedConcepts: ['일상점검', '정기점검', '정밀점검'],
      example: '자가용전기설비는 연 1회 이상 정기점검'
    }
  ]
};

// 로컬스토리지 키
const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
