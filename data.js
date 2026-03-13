// ============================================
// 전기기사 스마트 학습 플랫폼 - 핵심 개념 데이터베이스 (100선)
// ============================================

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
       [필기 모드] 0. 기초전기·수학
       ========================================== */
    { id: 101, category: 'foundation', title: '옴의 법칙 (Ohm\'s Law)', definition: '전류는 전압에 비례하고 저항에 반비례한다.', formula: 'V = I × R\nI = V / R\nR = V / I', frequency: '상' },
    { id: 102, category: 'foundation', title: '키르히호프의 법칙 (KCL, KVL)', definition: '제1법칙(전류): 노드에 들어오는 전류 합 = 나가는 전류 합\n제2법칙(전압): 폐회로 내 전압강하 합 = 기전력 합', formula: 'ΣI = 0\nΣV = 0', frequency: '상' },
    { id: 103, category: 'foundation', title: '저항의 직렬과 병렬 연결', definition: '직렬은 저항을 더하고, 병렬은 역수를 더한 뒤 다시 역수를 취한다.', formula: '직렬: Rt = R1 + R2\n병렬: Rt = (R1·R2) / (R1 + R2)', frequency: '상' },
    { id: 104, category: 'foundation', title: '삼각함수와 피타고라스', definition: '피상, 유효, 무효전력의 벡터 계산을 위한 필수 수학.', formula: 'c² = a² + b²\nsinθ = 무효/피상\ncosθ = 유효/피상 (역률)', frequency: '상' },
    { id: 105, category: 'foundation', title: '복소수와 임피던스', definition: '직류의 저항(R) 개념을 교류로 확장한 것. 실수부(저항)와 허수부(리액턴스)로 구성.', formula: 'Z = R + jX\n|Z| = √(R² + X²)', frequency: '상' },
    { id: 106, category: 'foundation', title: '유효, 무효, 피상전력', definition: '교류회로에서 전력의 3가지 형태.', formula: '유효(P) = VI cosθ [W]\n무효(Pr) = VI sinθ [Var]\n피상(Pa) = VI [VA]', frequency: '상' },
    { id: 107, category: 'foundation', title: '각주파수 (ω)', definition: '교류 파형이 1초 동안 회전한 각도(라디안).', formula: 'ω = 2πf [rad/s]\n(f: 주파수)', frequency: '중' },
    { id: 108, category: 'foundation', title: '전기에너지와 전력량', definition: '일정 시간 동안 사용한 전력의 총합.', formula: 'W = P × t [J 또는 Ws]\n1kWh = 3.6 × 10^6 J', frequency: '상' },
    { id: 109, category: 'foundation', title: '줄의 법칙 (Joule\'s Law)', definition: '도체에 전류가 흐를 때 발생하는 열량.', formula: 'H = 0.24 I²Rt [cal]\n(1J = 0.24cal)', frequency: '중' },
    { id: 110, category: 'foundation', title: '플레밍의 법칙', definition: '왼손은 전동기(힘의 방향), 오른손은 발전기(유도기전력 방향)를 나타낸다.', formula: '엄지(F, v) - 검지(B) - 중지(I, e)', frequency: '상' },

    /* ==========================================
       [필기 모드] 1. 전기자기학
       ========================================== */
    { id: 201, category: 'electromagnetics', title: '쿨롱의 법칙', definition: '두 점전하 사이에 작용하는 정전기력.', formula: 'F = (1 / 4πε) × (Q1·Q2 / r²) [N]\n(진공 중 9×10^9)', frequency: '상' },
    { id: 202, category: 'electromagnetics', title: '전계의 세기 (E)', definition: '단위 전하(+1C)가 받는 힘.', formula: 'E = F / Q = V / d [V/m]', frequency: '상' },
    { id: 203, category: 'electromagnetics', title: '가우스의 정리', definition: '폐곡면을 통과하는 전기력선의 총 수는 폐곡면 내의 총 전하량을 유전율로 나눈 것과 같다.', formula: 'N = Q / ε', frequency: '상' },
    { id: 204, category: 'electromagnetics', title: '정전용량 (C)', definition: '도체가 전하를 축적할 수 있는 능력.', formula: 'C = Q / V [F]\n평행판: C = ε(A / d)', frequency: '상' },
    { id: 205, category: 'electromagnetics', title: '비오-사바르의 법칙', definition: '임의의 도선에 전류가 흐를 때 특정 점의 자계 세기.', formula: 'dH = (I·dl·sinθ) / (4πr²)', frequency: '상' },
    { id: 206, category: 'electromagnetics', title: '암페어의 주회적분 법칙', definition: '폐경로를 따라 자계를 적분한 값은 경로 내의 총 전류와 같다.', formula: '∮H·dl = ΣI\n무한직선 자계 H = I / 2πr', frequency: '상' },
    { id: 207, category: 'electromagnetics', title: '패러데이-렌츠 전자유도', definition: '자속의 변화를 방해하는 방향으로 유도기전력 발생.', formula: 'e = -N(dΦ / dt) [V]', frequency: '상' },
    { id: 208, category: 'electromagnetics', title: '인덕턴스 (L)', definition: '전류 변화에 대해 유도기전력이 발생하는 정도.', formula: 'L = (N·Φ) / I [H]', frequency: '상' },
    { id: 209, category: 'electromagnetics', title: '전자파 속도 (빛의 속도)', definition: '진공 중 전자파의 전파 속도.', formula: 'v = 1 / √(ε0·μ0) = 3 × 10^8 [m/s]', frequency: '중' },
    { id: 210, category: 'electromagnetics', title: '로렌츠의 힘', definition: '전계와 자계가 공존하는 공간에서 전하가 받는 힘.', formula: 'F = q(E + v × B) [N]', frequency: '중' },

    /* ==========================================
       [필기 모드] 2. 전력공학
       ========================================== */
    { id: 301, category: 'power', title: '전압강하 근사식', definition: '송전단 전압과 수전단 전압의 차이.', formula: '단상: e = 2I(R cosθ + X sinθ)\n3상: e = √3 I(R cosθ + X sinθ)', frequency: '상' },
    { id: 302, category: 'power', title: '켈빈의 법칙', definition: '가장 경제적인 전선의 굵기를 결정하는 법칙.', formula: '전선 연간 이자/상각비 = 연간 전력손실액', frequency: '중' },
    { id: 303, category: 'power', title: '이도 (Sag) 계산식', definition: '지지물 사이에 전선이 늘어진 정도.', formula: 'D = (W·S²) / (8·T) [m]\n(W:하중, S:경간, T:수평장력)', frequency: '상' },
    { id: 304, category: 'power', title: '코로나 현상', definition: '초고압 송전선 주변 공기 절연 파괴 현상.', formula: '대책: 굵은 전선 사용, 복도체(다도체) 채용', frequency: '상' },
    { id: 305, category: 'power', title: '페란티 현상', definition: '선로 정전용량으로 수전단 전압이 더 높아지는 현상.', formula: '대책: 수전단에 분로리액터 설치', frequency: '상' },
    { id: 306, category: 'power', title: '%임피던스 (%Z)', definition: '정격전류가 흐를 때의 임피던스 강하를 백분율로 표시.', formula: '%Z = (P·Z) / (10V²) × 100\n(P: kVA, V: kV)', frequency: '상' },
    { id: 307, category: 'power', title: '단락전류 계산', definition: '단락 사고 시 흐르는 엄청난 전류. 차단기 용량 결정의 기준.', formula: 'Is = (100 / %Z) × In', frequency: '상' },
    { id: 308, category: 'power', title: '수차의 출력 (수력발전)', definition: '낙차와 유량을 이용한 수력발전의 출력식.', formula: 'P = 9.8 × Q × H × η [kW]\n(Q: 유량, H: 유효낙차, η: 효율)', frequency: '중' },
    { id: 309, category: 'power', title: '중성점 접지 방식', definition: '지락 사고 시 전위 상승 억제 및 계전기 동작 확보.', formula: '비접지, 직접접지(유효접지), 저항접지, 소호리액터 접지', frequency: '상' },
    { id: 310, category: 'power', title: '피뢰기 (LA)', definition: '이상전압 내습 시 대지 방전 및 속류 차단.', formula: '제한전압: 피뢰기 방전 중 단자 간 남게 되는 전압 (낮을수록 좋음)', frequency: '상' },

    /* ==========================================
       [필기 모드] 3. 전기기기
       ========================================== */
    { id: 401, category: 'machine', title: '직류발전기 유기기전력', definition: '전기자가 자속을 끊으며 발생하는 전압.', formula: 'E = (P·Z / 60·a) × Φ·N [V]\n(P:극수, Z:도체수, a:병렬회로수)', frequency: '상' },
    { id: 402, category: 'machine', title: '전기자 반작용', definition: '전기자 전류에 의한 자속이 주자속을 찌그러뜨리는 현상.', formula: '영향: 중성축 이동, 정류 불량, 전압 강하\n대책: 보상권선(가장 효과적), 보극', frequency: '상' },
    { id: 403, category: 'machine', title: '직류전동기 토크 (T)', definition: '회전하는 힘.', formula: 'T = 0.975 × (P / N) [kg·m]\n(P: 출력[W], N: 회전수[rpm])', frequency: '상' },
    { id: 404, category: 'machine', title: '변압기 권수비 (a)', definition: '1, 2차 권선비 및 전압/전류 변환 비율.', formula: 'a = N1/N2 = V1/V2 = I2/I1 = √(Z1/Z2)', frequency: '상' },
    { id: 405, category: 'machine', title: '변압기 최대 효율 조건', definition: '손실이 가장 적어 효율이 극대화되는 시점.', formula: '철손(Pi) = 동손(Pc) 일 때 최대 효율 발생', frequency: '상' },
    { id: 406, category: 'machine', title: '유도전동기 동기속도', definition: '고정자가 만들어내는 회전자기장의 속도.', formula: 'Ns = 120f / P [rpm]', frequency: '상' },
    { id: 407, category: 'machine', title: '유도전동기 슬립 (s)', definition: '동기속도와 실제 회전자 속도 간의 미끄러짐 비율.', formula: 's = (Ns - N) / Ns\n회전자 속도 N = Ns(1 - s)', frequency: '상' },
    { id: 408, category: 'machine', title: '비례 추이', definition: '권선형 유도전동기에서 2차 저항을 늘리면 최대 토크 발생 슬립이 커지는 현상.', formula: '최대 토크의 크기 자체는 변하지 않음.', frequency: '중' },
    { id: 409, category: 'machine', title: '동기발전기 단락비', definition: '무부하 정격전압을 만드는 계자전류와 3상 단락 정격전류를 만드는 계자전류의 비.', formula: 'K = 100 / %Zs (단락비가 크면 동기임피던스 작고 기기가 큼)', frequency: '중' },
    { id: 410, category: 'machine', title: '동기전동기 V곡선', definition: '일정한 출력에서 계자전류 변화에 따른 전기자 전류 곡선.', formula: '과여자: 진상(콘덴서 작용)\n부족여자: 지상(리액터 작용)', frequency: '상' },

    /* ==========================================
       [필기 모드] 4. 회로이론
       ========================================== */
    { id: 501, category: 'circuit', title: '테브난의 정리', definition: '복잡한 회로를 단일 전압원(Vth)과 직렬 저항(Rth)으로 등가화.', formula: '개방단 전압과 내부 합성저항을 구한다.', frequency: '상' },
    { id: 502, category: 'circuit', title: '중첩의 원리', definition: '다수의 전원이 있는 선형 회로에서 각 전원이 단독으로 작용할 때의 응답 합.', formula: '전압원 제거: 단락 (Short)\n전류원 제거: 개방 (Open)', frequency: '상' },
    { id: 503, category: 'circuit', title: '최대 전력 전달 조건', definition: '전원에서 부하로 전력이 가장 많이 전달되는 조건.', formula: '내부 임피던스 = 부하 임피던스의 켤레복소수(공액)', frequency: '상' },
    { id: 504, category: 'circuit', title: 'RLC 직렬 공진', definition: 'XL과 Xc가 같아져 허수부가 0이 되고 전류가 최대가 되는 상태.', formula: '공진 주파수 f = 1 / (2π√LC)', frequency: '상' },
    { id: 505, category: 'circuit', title: 'RC 직렬 과도현상', definition: '콘덴서에 전압이 충전되는 데 걸리는 지연 현상.', formula: '시정수 τ = R·C [sec]\n(시정수가 클수록 충전이 느림)', frequency: '중' },
    { id: 506, category: 'circuit', title: 'RL 직렬 과도현상', definition: '코일에 전류가 흐르는 데 걸리는 지연 현상.', formula: '시정수 τ = L / R [sec]', frequency: '중' },
    { id: 507, category: 'circuit', title: '2전력계법', definition: '단상 전력계 2대로 3상 전력을 측정하는 방법.', formula: '유효전력 P = W1 + W2\n무효전력 Pr = √3(W1 - W2)', frequency: '상' },
    { id: 508, category: 'circuit', title: 'Y-Δ 등가 변환', definition: '저항 회로망의 결선 모양을 상호 변환.', formula: '저항값이 모두 같을 때: R_Y = R_Δ / 3', frequency: '상' },
    { id: 509, category: 'circuit', title: '비정현파의 실효값', definition: '직류분, 기본파, 각 고조파가 섞인 파형의 실효값.', formula: 'Vrms = √(V0² + V1² + V2² + ...)', frequency: '중' },
    { id: 510, category: 'circuit', title: '4단자 정수 (ABCD)', definition: '입력과 출력의 전압/전류 관계를 나타내는 행렬 정수.', formula: 'AD - BC = 1 (대칭 회로 조건: A=D)', frequency: '중' },

    /* ==========================================
       [필기 모드] 5. 제어공학
       ========================================== */
    { id: 601, category: 'control', title: '라플라스 변환 기본', definition: '시간 함수를 s영역으로 변환.', formula: 'L[1] = 1/s\nL[t] = 1/s²\nL[e^(-at)] = 1/(s+a)', frequency: '상' },
    { id: 602, category: 'control', title: '전달함수 G(s)', definition: '초기조건이 0일 때, 출력과 입력 라플라스 변환의 비.', formula: 'G(s) = C(s) / R(s)', frequency: '상' },
    { id: 603, category: 'control', title: '폐루프 전달함수', definition: '피드백이 있는 제어계의 전체 이득.', formula: 'T(s) = G(s) / (1 ± G(s)H(s))\n(부궤환 시 + 적용)', frequency: '상' },
    { id: 604, category: 'control', title: 'PID 제어 특성', definition: '제어계 응답을 개선하기 위한 비례-적분-미분 동작.', formula: '적분(I): 잔류편차 제거\n미분(D): 응답속도 개선 및 오버슈트 억제', frequency: '상' },
    { id: 605, category: 'control', title: '라우스 안정도 판별법', definition: '특성방정식 계수를 배열하여 안정도 판별.', formula: '라우스 배열 제1열의 부호 변화가 없어야 안정.', frequency: '상' },
    { id: 606, category: 'control', title: '나이퀴스트 안정도', definition: '개루프 전달함수의 주파수 응답 궤적으로 판별.', formula: '임계점 (-1, j0)을 감싸지 않아야 안정.', frequency: '중' },
    { id: 607, category: 'control', title: '정상상태 오차 (편차)', definition: '시간이 무한대일 때 목표값과 실제 출력의 오차.', formula: '위치오차상수(0형), 속도오차상수(1형), 가속도오차상수(2형)', frequency: '상' },
    { id: 608, category: 'control', title: '보드 선도 (Bode Plot)', definition: '주파수에 따른 이득(dB)과 위상각을 나타낸 그래프.', formula: '이득 여유(GM) > 0dB, 위상 여유(PM) > 0° 이면 안정.', frequency: '중' },
    { id: 609, category: 'control', title: '근궤적법 (Root Locus)', definition: '시스템 이득 K가 0~∞ 변할 때 특성근이 이동하는 궤적.', formula: '근궤적의 가지 수 = 극점(P)과 영점(Z) 중 큰 수', frequency: '중' },
    { id: 610, category: 'control', title: '상태공간 방정식', definition: '다입력 다출력 시스템의 상태를 행렬로 표현.', formula: 'x\'(t) = Ax(t) + Bu(t)\ny(t) = Cx(t) + Du(t)', frequency: '하' },

    /* ==========================================
       [필기 모드] 6. 전기설비기준 (KEC)
       ========================================== */
    { id: 701, category: 'regulation', title: '전압의 종별', definition: 'KEC 규정에 따른 전압 분류.', formula: '저압: AC 1kV 이하, DC 1.5kV 이하\n고압: 저압 초과 7kV 이하\n특고압: 7kV 초과', frequency: '상' },
    { id: 702, category: 'regulation', title: '저압 전로 절연저항', definition: '누전 방지를 위해 유지해야 할 최소 저항.', formula: 'SELV, PELV: 0.5MΩ 이상\n500V 이하: 1.0MΩ 이상', frequency: '상' },
    { id: 703, category: 'regulation', title: '절연내력 시험', definition: '전로가 일정 전압에 10분간 견디는지 확인.', formula: '7kV 이하: 최대사용전압의 1.5배 (최소 500V)\n22.9kV 다중접지: 최대사용전압의 0.92배', frequency: '상' },
    { id: 704, category: 'regulation', title: '접지 시스템 (TN, TT, IT)', definition: '전원과 기기의 접지 연결 방식.', formula: 'TN: 전원접지와 기기를 보호도체(PE)로 직접 연결\nTT: 기기는 전원과 별도로 독립 접지', frequency: '상' },
    { id: 705, category: 'regulation', title: '과전류 차단기 (MCCB) 정격', definition: '전선의 허용전류를 보호하기 위한 차단기 용량.', formula: '설계전류(Ib) ≤ 차단기정격(In) ≤ 전선허용전류(Iz)', frequency: '중' },
    { id: 706, category: 'regulation', title: '누전차단기 (ELB) 시설', definition: '감전 보호를 위해 필수 설치해야 하는 곳.', formula: '물이 있는 욕실, 습기 찬 장소, 금속제 외함 기기', frequency: '상' },
    { id: 707, category: 'regulation', title: '가공전선로 지표상 높이', definition: '안전을 위한 전선의 최소 설치 높이.', formula: '저고압 도로 횡단: 6m 이상\n철도 횡단: 6.5m 이상', frequency: '중' },
    { id: 708, category: 'regulation', title: '지중 전선로 매설 깊이', definition: '땅속에 케이블을 묻을 때의 깊이.', formula: '관로식/직매식 (차량 중량물 압력 O): 1.0m 이상\n중량물 압력 X: 0.6m 이상', frequency: '상' },
    { id: 709, category: 'regulation', title: '옥내배선 공사 방법', definition: '점검할 수 없는 은폐장소 등에 시공 가능한 공사.', formula: '합성수지관, 금속관, 가요전선관, 케이블 공사', frequency: '상' },
    { id: 710, category: 'regulation', title: '특수장소 방폭설비', definition: '가연성 가스/분진 위험 장소 시설.', formula: '방폭형 기기 사용, 금속관 또는 케이블 공사만 허용', frequency: '중' },

    /* ==========================================
       [실기 모드] 7. 단답·수변전
       ========================================== */
    { id: 801, category: 'prac_short', title: '역률 개선 효과 4가지', definition: '전력용 콘덴서 설치로 얻는 이점.', formula: '1. 전력 손실 감소\n2. 전압 강하 감소\n3. 설비 용량 여력 증가\n4. 전기 요금 절감', frequency: '상' },
    { id: 802, category: 'prac_short', title: '피뢰기 (LA) 구비조건', definition: '낙뢰 등 이상전압으로부터 설비 보호.', formula: '1. 충격 방전 개시전압이 낮을 것\n2. 제한 전압이 낮을 것\n3. 상용주파 방전 개시전압이 높을 것\n4. 속류 차단 능력이 클 것', frequency: '상' },
    { id: 803, category: 'prac_short', title: 'MOF (계기용 변성기)', definition: '수전설비 인입구에 설치되어 전력량계에 전원 공급.', formula: '역할: 고전압 대전류를 저전압 소전류로 변성하여 전력량계에 공급\n(PT와 CT를 한 함에 내장)', frequency: '상' },
    { id: 804, category: 'prac_short', title: '차단기(CB)와 단로기(DS) 조작 순서', definition: '아크 소호 능력이 없는 DS 보호.', formula: '투입 시: DS 먼저 ON → CB 나중 ON\n차단 시: CB 먼저 OFF → DS 나중 OFF', frequency: '상' },
    { id: 805, category: 'prac_short', title: '변압기 병렬운전 조건', definition: '두 대 이상의 변압기를 연결하여 운전할 때.', formula: '1. 극성이 일치할 것\n2. 정격전압, 권수비가 같을 것\n3. %임피던스 강하가 같을 것\n4. 내부 저항과 누설리액턴스 비가 같을 것', frequency: '상' },
    { id: 806, category: 'prac_short', title: 'CT (계기용 변류기) 2차측 개방 금지', definition: 'CT 운전 중 2차측을 절대 개방하면 안 되는 이유.', formula: '이유: 2차측에 고전압이 유기되어 절연 파괴 및 소손 위험\n조치: 계기 교체 시 반드시 2차측 먼저 단락(Short) 조치', frequency: '상' },
    { id: 807, category: 'prac_short', title: '지락 보호 계전기 종류', definition: '누전(지락) 사고 검출.', formula: 'OCGR (과전류 지락 계전기)\nSGR (선택 지락 계전기)\nDGR (방향 지락 계전기)', frequency: '상' },
    { id: 808, category: 'prac_short', title: '단락 용량 계산 방법', definition: '차단기의 정격 차단 용량 선정 기준.', formula: 'Ps = √3 × V × Is (오옴법)\nPs = (100 / %Z) × Pn (%Z법)', frequency: '상' },
    { id: 809, category: 'prac_short', title: '코로나 임계전압 향상 대책', definition: '코로나 방전이 시작되는 전압을 높여 방지.', formula: '1. 복도체(다도체) 사용\n2. 굵은 전선 사용\n3. 가선 금구류 개량', frequency: '중' },
    { id: 810, category: 'prac_short', title: '변압기 냉각 방식', definition: '명판에 적힌 냉각 방식 기호 해석.', formula: 'ONAN (OA): 유입 자냉식\nONAF (FA): 유입 풍냉식\nOFAF (FOA): 송유 풍냉식', frequency: '중' },

    /* ==========================================
       [실기 모드] 8. 시퀀스·PLC
       ========================================== */
    { id: 901, category: 'prac_sequence', title: '자기 유지 회로 (Self-Holding)', definition: '푸시버튼을 놓아도 동작을 계속 유지하는 시퀀스의 기본.', formula: '시작 버튼(a접점)에 릴레이의 보조 a접점을 병렬로 연결.', frequency: '상' },
    { id: 902, category: 'prac_sequence', title: '인터록 회로 (Interlock)', definition: '동시 투입에 의한 단락 사고 방지.', formula: '서로의 릴레이 b접점을 상대방 조작 회로에 직렬로 연결.', frequency: '상' },
    { id: 903, category: 'prac_sequence', title: 'Y-Δ (와이-델타) 기동 회로', definition: '유도전동기 기동 전류를 줄이기 위한 회로.', formula: '기동 시 Y결선으로 전압을 1/√3로 낮춰 기동전류 1/3 감소.\n타이머에 의해 일정 시간 후 Δ결선으로 운전.', frequency: '상' },
    { id: 904, category: 'prac_sequence', title: '타이머 접점 (한시동작 순시복귀)', definition: '가장 많이 쓰이는 타이머 접점 기호.', formula: '입력 ON → 설정시간 후 접점 ON (한시동작)\n입력 OFF → 즉시 접점 OFF (순시복귀)', frequency: '상' },
    { id: 905, category: 'prac_sequence', title: '정역 회전 제어 회로', definition: '전동기의 회전 방향을 바꾸는 회로.', formula: '3상 전원 3가닥 중 2가닥의 결선을 서로 바꾸어 줌.\n반드시 인터록 회로 적용 필수.', frequency: '상' },
    { id: 906, category: 'prac_sequence', title: '논리회로 (AND, OR, NOT)', definition: '유접점 시퀀스를 무접점 논리 게이트로 변환.', formula: 'AND (직렬, 곱)\nOR (병렬, 합)\nNOT (b접점, 반전)', frequency: '상' },
    { id: 907, category: 'prac_sequence', title: '드모르간의 정리', definition: '논리식 간소화에 사용되는 수학적 법칙.', formula: '(A + B)\' = A\' · B\'\n(A · B)\' = A\' + B\'', frequency: '중' },
    { id: 908, category: 'prac_sequence', title: '플리커 (Flicker) 릴레이', definition: '일정 주기로 점멸(깜빡임)을 반복하는 릴레이.', formula: '경보 회로의 부저음이나 경광등 깜빡임 제어에 사용.', frequency: '중' },
    { id: 909, category: 'prac_sequence', title: 'PLC 기본 명령어', definition: '래더 다이어그램을 코드로 작성할 때.', formula: 'LOAD (LD): a접점 시작\nLOAD NOT (LD NOT): b접점 시작\nOUT: 출력 코일', frequency: '상' },
    { id: 910, category: 'prac_sequence', title: '논리식 간소화 (카르노 맵)', definition: '복잡한 불 대수식을 최소화하는 표.', formula: '인접한 1을 2, 4, 8개 단위로 묶어 공통된 변수만 추출.', frequency: '중' },

    /* ==========================================
       [실기 모드] 9. 테이블스펙
       ========================================== */
    { id: 1001, category: 'prac_table', title: '전선 굵기 선정 3요소', definition: '설계 시 가장 먼저 고려해야 할 사항.', formula: '1. 허용 전류 (가장 중요)\n2. 전압 강하\n3. 기계적 강도', frequency: '상' },
    { id: 1002, category: 'prac_table', title: '단상 2선식 전압강하 (단면적 A)', definition: '거리와 전류에 따른 전선 굵기 계산.', formula: 'A = (35.6 × L × I) / (1000 × e) [mm²]\n(L: 길이, I: 전류, e: 전압강하)', frequency: '상' },
    { id: 1003, category: 'prac_table', title: '3상 3선식 전압강하 (단면적 A)', definition: '3상 동력 설비의 전선 굵기 계산.', formula: 'A = (30.8 × L × I) / (1000 × e) [mm²]', frequency: '상' },
    { id: 1004, category: 'prac_table', title: '조명 설계: FUN = EAD', definition: '실내 조명에 필요한 등기구 수를 구하는 기본 공식.', formula: 'F: 광속, U: 조명률, N: 등기구 수\nE: 조도, A: 면적, D: 감광보상율', frequency: '상' },
    { id: 1005, category: 'prac_table', title: '실지수 (Room Index)', definition: '방의 크기와 높이에 따른 조명 효율 계수.', formula: 'RI = (X·Y) / (H(X+Y))\n(X: 가로, Y: 세로, H: 작업면에서 광원까지 높이)', frequency: '중' },
    { id: 1006, category: 'prac_table', title: '간선 허용전류 (전동기 부하)', definition: '수용가 메인 전선의 허용전류 산정.', formula: '전동기 정격(Im) ≤ 50A: 1.25 × Im\n전동기 정격(Im) > 50A: 1.1 × Im', frequency: '상' },
    { id: 1007, category: 'prac_table', title: '분기회로 수 계산', definition: '부하 상정에 따른 15A 또는 20A 차단기 개수.', formula: 'N = (바닥면적 × 부하밀도 + 가산부하) / (전압 × 15A)', frequency: '상' },
    { id: 1008, category: 'prac_table', title: '접지선 단면적 계산', definition: '고장 전류가 흐를 때 견딜 수 있는 굵기.', formula: 'S = 0.0496 × Is [mm²] (보호계전기 0.1초 동작 시)\n(Is: 단락전류)', frequency: '중' },
    { id: 1009, category: 'prac_table', title: '금속관 굵기 선정 표 읽기', definition: '전선의 굵기와 가닥수에 맞는 관의 크기.', formula: '단면적이 다른 전선 혼용 시: 전선 총 피복 단면적 합이 관 내단면적의 32% 이하', frequency: '중' },
    { id: 1010, category: 'prac_table', title: '변압기 용량 산정', definition: '수용률과 부등률을 고려한 뱅크 용량.', formula: 'Tr = (총 설비용량 × 수용률) / (부등률 × 종합역률) [kVA]', frequency: '상' }
  ]
};

// 로컬스토리지 키
const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
