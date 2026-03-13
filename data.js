// ============================================
// 전기기사 스마트 학습 플랫폼 - 핵심 개념 데이터베이스 (총 200선 완성본)
// ============================================

const electricianData = {
  categories: [
    // 필기 모드
    { id: 'foundation', mode: 'written', name: '기초전기·수학', icon: '📐', color: '#64748b' },
    { id: 'electromagnetics', mode: 'written', name: '전기자기학', icon: '🧲', color: '#8B5CF6' },
    { id: 'power', mode: 'written', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', mode: 'written', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', mode: 'written', name: '회로이론', icon: '🔄', color: '#3B82F6' },
    { id: 'control', mode: 'written', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', mode: 'written', name: '전기설비기준', icon: '📋', color: '#EF4444' },

    // 실기 모드
    { id: 'prac_short', mode: 'practical', name: '단답·수변전', icon: '📝', color: '#f43f5e' },
    { id: 'prac_sequence', mode: 'practical', name: '시퀀스·PLC', icon: '🔀', color: '#0ea5e9' },
    { id: 'prac_table', mode: 'practical', name: '테이블스펙', icon: '📊', color: '#d946ef' }
  ],
  
  concepts: [
    /* ==========================================
       [필기 모드] 0. 기초전기·수학 (20개)
       ========================================== */
    { id: 101, category: 'foundation', title: '옴의 법칙 (Ohm\'s Law)', definition: '전류는 전압에 비례하고 저항에 반비례한다.', formula: 'V = I × R, I = V / R, R = V / I', frequency: '상' },
    { id: 102, category: 'foundation', title: '키르히호프의 법칙 (KCL, KVL)', definition: '전류 법칙(노드)과 전압 법칙(폐회로).', formula: 'ΣI = 0, ΣV = 0', frequency: '상' },
    { id: 103, category: 'foundation', title: '저항의 직/병렬 연결', definition: '직렬은 더하고, 병렬은 역수의 합을 역수 취함.', formula: '직렬: R1+R2, 병렬: (R1·R2)/(R1+R2)', frequency: '상' },
    { id: 104, category: 'foundation', title: '삼각함수와 피타고라스', definition: '벡터 해석(역률, 무효율)의 기초.', formula: 'sinθ = 높이/빗변, cosθ = 밑변/빗변(역률)', frequency: '상' },
    { id: 105, category: 'foundation', title: '복소수와 임피던스', definition: '실수부(저항)와 허수부(리액턴스)의 합.', formula: 'Z = R + jX, |Z| = √(R² + X²)', frequency: '상' },
    { id: 106, category: 'foundation', title: '전력의 3요소', definition: '유효, 무효, 피상전력.', formula: 'P = VI cosθ, Pr = VI sinθ, Pa = VI', frequency: '상' },
    { id: 107, category: 'foundation', title: '각주파수 (ω)', definition: '교류 파형의 1초당 회전 각도.', formula: 'ω = 2πf [rad/s]', frequency: '중' },
    { id: 108, category: 'foundation', title: '전력량과 에너지', definition: '사용한 전력의 총합.', formula: 'W = P × t [J], 1kWh = 3.6×10^6 J', frequency: '상' },
    { id: 109, category: 'foundation', title: '줄의 법칙 (Joule\'s Law)', definition: '전류가 흐를 때 발생하는 열량.', formula: 'H = 0.24 I²Rt [cal]', frequency: '중' },
    { id: 110, category: 'foundation', title: '플레밍의 법칙', definition: '왼손(전동기), 오른손(발전기) 법칙.', formula: '엄지(힘/운동) - 검지(자계) - 중지(전류/기전력)', frequency: '상' },
    { id: 111, category: 'foundation', title: '호도법 (Radian)', definition: '각도를 π로 나타내는 방법. 180도는 π 라디안.', formula: '1 rad = 180/π [도]', frequency: '중' },
    { id: 112, category: 'foundation', title: '최대값, 실효값, 평균값', definition: '교류 크기를 나타내는 기준. 실무에서는 실효값 사용.', formula: '정현파 실효값 Vrms = Vm / √2', frequency: '상' },
    { id: 113, category: 'foundation', title: '파고율과 파형율', definition: '파형의 날카로움과 평활도를 나타내는 비율.', formula: '파고율 = 최대값/실효값, 파형율 = 실효값/평균값', frequency: '중' },
    { id: 114, category: 'foundation', title: '벡터의 내적과 외적', definition: '전력 계산(내적)과 전자력 계산(외적)의 기초.', formula: '내적: A·B cosθ, 외적: A×B sinθ', frequency: '중' },
    { id: 115, category: 'foundation', title: '컨덕턴스 (Conductance)', definition: '저항의 역수. 전류가 얼마나 잘 흐르는가를 나타냄.', formula: 'G = 1 / R [℧ 또는 S]', frequency: '중' },
    { id: 116, category: 'foundation', title: '서셉턴스와 어드미턴스', definition: '리액턴스의 역수(B)와 임피던스의 역수(Y).', formula: 'Y = G + jB = 1 / Z', frequency: '중' },
    { id: 117, category: 'foundation', title: '쿨롱의 법칙 (자계)', definition: '두 자극(m) 사이에 작용하는 자기력.', formula: 'F = (1/4πμ) × (m1·m2)/r²', frequency: '상' },
    { id: 118, category: 'foundation', title: '오른나사 법칙', definition: '전류의 방향에 따른 자계의 발생 방향.', formula: '전류가 나사 진행방향일 때 회전방향이 자계방향', frequency: '상' },
    { id: 119, category: 'foundation', title: '정전유도 현상', definition: '대전체를 도체에 가까이 할 때 전하가 분리되는 현상.', formula: '가까운 쪽은 다른 극성, 먼 쪽은 같은 극성 유도', frequency: '중' },
    { id: 120, category: 'foundation', title: '자석의 성질', definition: 'N극과 S극은 항상 쌍으로 존재하며 분리할 수 없음.', formula: '자력선은 N극에서 나와 S극으로 들어감', frequency: '중' },

    /* ==========================================
       [필기 모드] 1. 전기자기학 (20개)
       ========================================== */
    { id: 201, category: 'electromagnetics', title: '쿨롱의 법칙 (전계)', definition: '두 점전하 사이의 정전기력.', formula: 'F = (1/4πε) × (Q1Q2/r²) [N]', frequency: '상' },
    { id: 202, category: 'electromagnetics', title: '전계의 세기 (E)', definition: '단위 전하(+1C)가 받는 힘.', formula: 'E = F / Q = V / d [V/m]', frequency: '상' },
    { id: 203, category: 'electromagnetics', title: '가우스의 정리', definition: '폐곡면 통과 전기력선 수 = 총 전하량 / 유전율.', formula: 'N = Q / ε', frequency: '상' },
    { id: 204, category: 'electromagnetics', title: '정전용량 (C)', definition: '전하 축적 능력.', formula: '평행판 C = ε(A/d) [F]', frequency: '상' },
    { id: 205, category: 'electromagnetics', title: '비오-사바르의 법칙', definition: '미소 전류가 만드는 자계 세기.', formula: 'dH = (I·dl·sinθ) / 4πr²', frequency: '상' },
    { id: 206, category: 'electromagnetics', title: '암페어의 주회적분 법칙', definition: '자계의 선적분은 경로 내 총 전류와 같다.', formula: '∮H·dl = ΣI', frequency: '상' },
    { id: 207, category: 'electromagnetics', title: '패러데이-렌츠 전자유도', definition: '자속 변화를 방해하는 유도기전력.', formula: 'e = -N(dΦ/dt)', frequency: '상' },
    { id: 208, category: 'electromagnetics', title: '인덕턴스 (L)', definition: '전류 변화에 대한 유도기전력 발생 비율.', formula: 'L = NΦ / I [H]', frequency: '상' },
    { id: 209, category: 'electromagnetics', title: '전자파 속도', definition: '진공 중 빛의 속도와 동일.', formula: 'v = 1 / √(ε0·μ0) = 3×10^8 [m/s]', frequency: '중' },
    { id: 210, category: 'electromagnetics', title: '로렌츠의 힘', definition: '전/자계 내 이동 전하가 받는 힘.', formula: 'F = q(E + v×B)', frequency: '중' },
    { id: 211, category: 'electromagnetics', title: '유전율과 비유전율', definition: '진공 유전율과 매질의 비유전율의 곱.', formula: 'ε = ε0 × εs (ε0 = 8.855 × 10^-12)', frequency: '상' },
    { id: 212, category: 'electromagnetics', title: '정전계의 에너지', definition: '콘덴서에 축적되는 에너지 체적 밀도.', formula: 'W = 1/2 CV² = 1/2 QV [J]', frequency: '상' },
    { id: 213, category: 'electromagnetics', title: '자기저항 (Rm)', definition: '자속의 흐름을 방해하는 정도.', formula: 'Rm = L / (μA) [AT/Wb]', frequency: '상' },
    { id: 214, category: 'electromagnetics', title: '자성체의 분류', definition: '강자성체, 상자성체, 반자성체.', formula: '강자성체: 철, 니켈, 코발트 (비투자율 ≫ 1)', frequency: '상' },
    { id: 215, category: 'electromagnetics', title: '맥스웰의 전자방정식', definition: '전자기학의 핵심 기본 방정식 4개.', formula: '∇×E = -∂B/∂t (패러데이 법칙 미분형)', frequency: '중' },
    { id: 216, category: 'electromagnetics', title: '표피효과 (Skin Effect)', definition: '고주파 교류일수록 전류가 도체 표면으로 몰리는 현상.', formula: '표피두께 δ = 1 / √(πfμk) (주파수 클수록 얇아짐)', frequency: '상' },
    { id: 217, category: 'electromagnetics', title: '전기쌍극자', definition: '거리가 매우 짧은 +Q, -Q 전하 쌍.', formula: '전위 V ∝ 1/r², 전계 E ∝ 1/r³', frequency: '중' },
    { id: 218, category: 'electromagnetics', title: '경계조건', definition: '두 매질 경계면에서의 전계/자계 특성.', formula: '전계의 접선성분 연속 (E1t = E2t)', frequency: '상' },
    { id: 219, category: 'electromagnetics', title: '상호 인덕턴스 (M)', definition: '1차 코일 전류 변화가 2차 코일에 미치는 유도 용량.', formula: 'M = k√(L1·L2) (k: 결합계수)', frequency: '상' },
    { id: 220, category: 'electromagnetics', title: '홀 효과 (Hall Effect)', definition: '자기장 속 도체에 전류가 흐를 때 측면으로 전압 발생.', formula: '전하의 부호 및 캐리어 농도 판별에 사용', frequency: '하' },

    /* ==========================================
       [필기 모드] 2. 전력공학 (20개)
       ========================================== */
    { id: 301, category: 'power', title: '전압강하 근사식', definition: '송/수전단 전압 차이.', formula: 'e = √3 I(R cosθ + X sinθ)', frequency: '상' },
    { id: 302, category: 'power', title: '켈빈의 법칙', definition: '가장 경제적인 전선 굵기 선정.', formula: '연간 이자/상각비 = 연간 전력손실액', frequency: '중' },
    { id: 303, category: 'power', title: '이도 (Sag)', definition: '전선이 지지물 사이에서 처진 정도.', formula: 'D = WS² / 8T [m]', frequency: '상' },
    { id: 304, category: 'power', title: '코로나 현상', definition: '전선 표면 공기 절연 파괴.', formula: '대책: 복도체 채용 (전선 겉보기 굵기 증가)', frequency: '상' },
    { id: 305, category: 'power', title: '페란티 현상', definition: '정전용량에 의해 수전단 전압이 상승.', formula: '대책: 분로리액터 설치', frequency: '상' },
    { id: 306, category: 'power', title: '%임피던스 (%Z)', definition: '임피던스 강하의 백분율.', formula: '%Z = (P·Z) / 10V² × 100', frequency: '상' },
    { id: 307, category: 'power', title: '단락전류 계산', definition: '차단기 용량 결정 기준.', formula: 'Is = (100 / %Z) × In', frequency: '상' },
    { id: 308, category: 'power', title: '수력발전 출력', definition: '낙차와 유량으로 전력 계산.', formula: 'P = 9.8·Q·H·η [kW]', frequency: '중' },
    { id: 309, category: 'power', title: '중성점 접지 목적', definition: '이상전압 억제 및 지락 보호계전기 동작 확보.', formula: '직접접지: 1선 지락 시 건전상 전위상승 최소', frequency: '상' },
    { id: 310, category: 'power', title: '피뢰기 (LA)', definition: '이상전압 방전 및 속류 차단.', formula: '정격전압: 속류를 끊을 수 있는 교류 최고전압', frequency: '상' },
    { id: 311, category: 'power', title: '송전 용량 계산 (Still의 식)', definition: '경제적인 송전 전압을 결정하는 경험식.', formula: 'V = 5.5√(0.6L + P/100) [kV]', frequency: '중' },
    { id: 312, category: 'power', title: '연가 (Transposition)', definition: '선로 정수를 평형시키기 위해 전선 위치를 교체.', formula: '통신선 유도장해 방지 효과 (선로 3등분)', frequency: '상' },
    { id: 313, category: 'power', title: '수용률, 부등률, 부하율', definition: '설비 용량과 전력 사용 패턴의 관계.', formula: '수용률 = (최대수용전력 / 총 설비용량) × 100', frequency: '상' },
    { id: 314, category: 'power', title: '조상설비', definition: '전압 조절 및 역률 개선을 위해 무효전력 공급.', formula: '동기조상기, 전력용콘덴서, 분로리액터, SVC', frequency: '상' },
    { id: 315, category: 'power', title: '안정도 (Stability)', definition: '외란에 대해 계통이 동기탈조 없이 운전하는 능력.', formula: '정태, 과도, 동태 안정도 (직렬리액턴스 작게 해야 향상)', frequency: '상' },
    { id: 316, category: 'power', title: '배전 방식', definition: '전력을 수용가에 분배하는 형태.', formula: '방사상(나뭇가지식), 환상(루프식), 네트워크 방식', frequency: '중' },
    { id: 317, category: 'power', title: '보호계전기 특성', definition: '시간에 따른 차단 동작 특성.', formula: '순한시, 정한시, 반한시, 반한시성 정한시', frequency: '상' },
    { id: 318, category: 'power', title: '선로 개폐기 (LS)와 단로기 (DS)', definition: '무부하 상태의 전로를 개폐.', formula: '차단기(CB)와 달리 부하전류 차단 능력 없음', frequency: '상' },
    { id: 319, category: 'power', title: '가공 지선', definition: '직격뢰로부터 송전선을 보호하기 위해 철탑 최상단에 설치.', formula: '차폐각이 작을수록 보호 효과가 큼', frequency: '상' },
    { id: 320, category: 'power', title: '접지 저항 저감 대책', definition: '안전을 위해 대지와의 저항을 낮추는 법.', formula: '접지극 깊게 매설, 병렬 접속, 저감재 사용', frequency: '상' },

    /* ==========================================
       [필기 모드] 3. 전기기기 (20개)
       ========================================== */
    { id: 401, category: 'machine', title: '직류발전기 기전력', definition: '전기자 회전으로 발생하는 전압.', formula: 'E = (PZ/60a)·ΦN', frequency: '상' },
    { id: 402, category: 'machine', title: '전기자 반작용', definition: '전기자 자속이 주자속을 방해.', formula: '대책: 보상권선(가장 효과적), 보극 설치', frequency: '상' },
    { id: 403, category: 'machine', title: '직류전동기 토크', definition: '회전력 계산.', formula: 'T = 0.975(P/N) [kg·m]', frequency: '상' },
    { id: 404, category: 'machine', title: '변압기 권수비', definition: '전압, 전류의 변환 비율.', formula: 'a = V1/V2 = I2/I1 = √(Z1/Z2)', frequency: '상' },
    { id: 405, category: 'machine', title: '변압기 최대 효율', definition: '손실 최소화 조건.', formula: '철손(Pi) = 동손(Pc) 일 때 발생', frequency: '상' },
    { id: 406, category: 'machine', title: '유도전동기 동기속도', definition: '회전자기장의 속도.', formula: 'Ns = 120f / P [rpm]', frequency: '상' },
    { id: 407, category: 'machine', title: '유도전동기 슬립', definition: '실제 회전 속도와의 차이.', formula: 's = (Ns - N) / Ns', frequency: '상' },
    { id: 408, category: 'machine', title: '비례 추이', definition: '2차 저항을 늘리면 최대토크 발생 슬립도 커짐.', formula: '최대토크 자체는 불변 (권선형에만 적용)', frequency: '중' },
    { id: 409, category: 'machine', title: '동기발전기 단락비', definition: '무부하 정격전압 계자전류 / 단락 정격전류 계자전류.', formula: 'K = 100 / %Zs', frequency: '중' },
    { id: 410, category: 'machine', title: '동기전동기 V곡선', definition: '계자전류 조절 시 전기자 전류 곡선.', formula: '과여자=진상(콘덴서), 부족여자=지상(리액터)', frequency: '상' },
    { id: 411, category: 'machine', title: '변압기 결선 (Δ-Δ, Y-Y, Δ-Y)', definition: '3상 변압기 권선 연결법.', formula: 'Δ-Y: 송전단 승압용 (30도 위상차 발생)', frequency: '상' },
    { id: 412, category: 'machine', title: 'V결선', definition: 'Δ결선 3대 중 1대 고장 시 2대로 3상 공급.', formula: '출력 P = √3 × 1대 용량 (이용률 86.6%)', frequency: '상' },
    { id: 413, category: 'machine', title: '변압기 병렬 운전 조건', definition: '순환전류가 흐르지 않게 하는 조건.', formula: '극성, 정격전압, %임피던스 강하가 같을 것', frequency: '상' },
    { id: 414, category: 'machine', title: '유도전동기 기동법', definition: '기동 전류 제한.', formula: '농형: Y-Δ 기동 (전류 1/3로 감소), 권선형: 2차 저항 기동', frequency: '상' },
    { id: 415, category: 'machine', title: '동기발전기 병렬 운전 조건', definition: '발전기 간 무효순환전류 방지.', formula: '전압의 크기, 위상, 주파수, 파형이 일치할 것', frequency: '상' },
    { id: 416, category: 'machine', title: '난조 (Hunting)', definition: '부하 급변 시 동기속도를 중심으로 진동하는 현상.', formula: '대책: 자극면에 제동권선 설치', frequency: '상' },
    { id: 417, category: 'machine', title: '정류기 (다이오드, SCR)', definition: '교류를 직류로 변환.', formula: 'SCR: 게이트 전류로 도통각(위상) 제어 가능', frequency: '상' },
    { id: 418, category: 'machine', title: '직류기 속도 제어', definition: '전동기 속도 변경 방법.', formula: '전압제어(광범위, 일워드레오나드), 계자제어(정출력)', frequency: '중' },
    { id: 419, category: 'machine', title: '단상 유도전동기 기동 방식', definition: '스스로 기동하지 못해 보조 장치 필요.', formula: '토크 순: 반발기동 > 콘덴서기동 > 분상기동 > 셰이딩코일', frequency: '상' },
    { id: 420, category: 'machine', title: '블록 로터 시험 (구속 시험)', definition: '유도전동기 등가회로 작성을 위한 시험.', formula: '변압기의 단락 시험과 동일한 원리 (동손 측정)', frequency: '하' },

    /* ==========================================
       [필기 모드] 4. 회로이론 (20개)
       ========================================== */
    { id: 501, category: 'circuit', title: '테브난의 정리', definition: '단일 전압원과 직렬 저항으로 등가화.', formula: '개방단 전압(Vth), 합성 저항(Rth) 구하기', frequency: '상' },
    { id: 502, category: 'circuit', title: '중첩의 원리', definition: '다수 전원 선형 회로의 개별 응답 합.', formula: '전압원 단락, 전류원 개방', frequency: '상' },
    { id: 503, category: 'circuit', title: '최대전력 전달', definition: '내부 임피던스 = 부하 임피던스(공액) 시 발생.', formula: 'Z_load = Z_source*', frequency: '상' },
    { id: 504, category: 'circuit', title: 'RLC 직렬 공진', definition: '허수부(리액턴스)가 0이 되어 임피던스 최소.', formula: 'f = 1 / 2π√LC (전류 최대)', frequency: '상' },
    { id: 505, category: 'circuit', title: '시정수 (τ)', definition: '과도현상 시 최종값의 63.2% 도달 시간.', formula: 'RC회로: τ = RC, RL회로: τ = L/R', frequency: '상' },
    { id: 506, category: 'circuit', title: '2전력계법', definition: '단상 전력계 2대로 3상 전력 측정.', formula: 'P = W1 + W2, Pr = √3(W1 - W2)', frequency: '상' },
    { id: 507, category: 'circuit', title: 'Y-Δ 변환', definition: '결선 모양 변환 (등가 저항).', formula: '저항 동일 시 R_Y = R_Δ / 3', frequency: '상' },
    { id: 508, category: 'circuit', title: '비정현파 실효값', definition: '각 고조파 성분의 실효값 제곱합의 평방근.', formula: 'Vrms = √(V0² + V1² + V2² + ...)', frequency: '중' },
    { id: 509, category: 'circuit', title: '4단자 정수 (ABCD)', definition: '입출력 행렬.', formula: 'AD - BC = 1 (A: 전압비, D: 전류비)', frequency: '중' },
    { id: 510, category: 'circuit', title: '분포정수 회로', definition: '장거리 송전선로 특성.', formula: '특성 임피던스 Z0 = √(Z/Y)', frequency: '중' },
    { id: 511, category: 'circuit', title: '노턴의 정리', definition: '테브난과 쌍대(Duality). 단일 전류원과 병렬 저항으로 등가화.', formula: 'In = 단락 전류, Rn = Rth', frequency: '중' },
    { id: 512, category: 'circuit', title: '밀만의 정리', definition: '병렬로 연결된 여러 전압원의 합성 전압을 구하는 정리.', formula: 'V = Σ(V/R) / Σ(1/R)', frequency: '중' },
    { id: 513, category: 'circuit', title: 'RLC 병렬 공진', definition: '어드미턴스 허수부가 0. 직렬과 반대로 임피던스 최대.', formula: 'f = 1 / 2π√LC (전압 최대, 전류 최소)', frequency: '상' },
    { id: 514, category: 'circuit', title: '비정현파 교류 전력', definition: '같은 주파수 성분끼리만 유효전력을 발생시킨다.', formula: 'P = V0I0 + V1I1cosθ1 + V2I2cosθ2 + ...', frequency: '상' },
    { id: 515, category: 'circuit', title: '대칭 좌표법', definition: '불평형 3상 회로를 해석하기 위한 3가지 성분.', formula: '영상분(접지 고장), 정상분(모터 정회전), 역상분(역회전)', frequency: '상' },
    { id: 516, category: 'circuit', title: '영상 임피던스 (Z01, Z02)', definition: '비대칭 4단자망의 양단 임피던스 매칭 조건.', formula: 'Z01 = √(AB/CD), Z02 = √(BD/AC)', frequency: '중' },
    { id: 517, category: 'circuit', title: 'Z, Y 파라미터', definition: '2단자 회로망 해석 정수.', formula: 'Z(임피던스): 개방 회로망, Y(어드미턴스): 단락 회로망', frequency: '중' },
    { id: 518, category: 'circuit', title: '전파 정수 (γ)', definition: '분포정수 회로에서 파동의 감쇠와 위상 변화.', formula: 'γ = α(감쇠정수) + jβ(위상정수) = √(ZY)', frequency: '상' },
    { id: 519, category: 'circuit', title: '무손실 선로와 무왜음 선로', definition: '장거리 선로 이상 조건.', formula: '무손실: R=0, G=0 / 무왜음: RC = LG (파형 일그러짐 없음)', frequency: '상' },
    { id: 520, category: 'circuit', title: '구동점 임피던스', definition: '1단자쌍 회로망에서 입력 전압과 전류의 비.', formula: '극점(Pole): Z(s)=∞ (개방), 영점(Zero): Z(s)=0 (단락)', frequency: '하' },

    /* ==========================================
       [필기 모드] 5. 제어공학 (20개)
       ========================================== */
    { id: 601, category: 'control', title: '라플라스 변환', definition: '시간 영역 함수를 s 영역으로 변환.', formula: 'L[1] = 1/s, L[e^(-at)] = 1/(s+a)', frequency: '상' },
    { id: 602, category: 'control', title: '전달함수 G(s)', definition: '초기조건 0일 때 (출력/입력).', formula: 'G(s) = C(s) / R(s)', frequency: '상' },
    { id: 603, category: 'control', title: '폐루프 전달함수', definition: '피드백 제어계 전체 이득.', formula: 'T(s) = G(s) / (1 + G(s)H(s))', frequency: '상' },
    { id: 604, category: 'control', title: 'PID 제어', definition: '비례-적분-미분 제어.', formula: 'I: 잔류편차 제거 / D: 응답속도 개선, 오버슈트 억제', frequency: '상' },
    { id: 605, category: 'control', title: '라우스 안정도 판별법', definition: '특성방정식 배열 표 작성.', formula: '제1열 부호 변화 없음 = 안정', frequency: '상' },
    { id: 606, category: 'control', title: '나이퀴스트 선도', definition: '주파수 응답 벡터 궤적.', formula: '임계점 (-1, j0)을 감싸면 불안정', frequency: '중' },
    { id: 607, category: 'control', title: '정상상태 오차', definition: 't가 무한대일 때의 편차.', formula: '위치오차(0형), 속도오차(1형), 가속도오차(2형)', frequency: '상' },
    { id: 608, category: 'control', title: '보드 선도', definition: '이득(dB)과 위상 주파수 응답.', formula: 'GM > 0, PM > 0 이면 안정', frequency: '중' },
    { id: 609, category: 'control', title: '근궤적법', definition: '이득 K 변화에 따른 근의 이동.', formula: '출발점 = 개루프 극점, 도착점 = 개루프 영점', frequency: '중' },
    { id: 610, category: 'control', title: '상태공간 방정식', definition: '시스템의 상태를 행렬로 표현.', formula: 'x\' = Ax + Bu, y = Cx + Du', frequency: '하' },
    { id: 611, category: 'control', title: '메이슨의 정리 (신호흐름선도)', definition: '복잡한 블록선도를 한 번에 전달함수로 변환.', formula: 'M = Σ(Pk·Δk) / Δ', frequency: '상' },
    { id: 612, category: 'control', title: '과도 응답 지표', definition: '계단 입력 시 시스템의 시간적 특성.', formula: '오버슈트, 상승시간(10~90%), 지연시간(50%), 정착시간', frequency: '상' },
    { id: 613, category: 'control', title: '2차 제어계의 감쇠비 (ζ)', definition: '진동의 정도를 나타내는 지표.', formula: 'ζ<1(부족감쇠/진동), ζ=1(임계감쇠), ζ>1(과감쇠)', frequency: '상' },
    { id: 614, category: 'control', title: '주파수 응답 스펙 (Mp, ωp)', definition: '보드선도 상의 공진 특성.', formula: '공진 주파수 ωp = ωn√(1-2ζ²)', frequency: '중' },
    { id: 615, category: 'control', title: '근궤적의 점근선 교차점', definition: '근궤적이 무한대로 향할 때 모이는 실수축 점.', formula: 'σ = (Σ극점 - Σ영점) / (P개수 - Z개수)', frequency: '중' },
    { id: 616, category: 'control', title: '이탈점 (Break-away point)', definition: '근궤적이 실수축에서 벗어나는 지점.', formula: 'dK / ds = 0 을 만족하는 s 값', frequency: '중' },
    { id: 617, category: 'control', title: '위상 여유 (Phase Margin)', definition: '이득 교차 주파수에서 불안정 한계까지의 위상 각 여유.', formula: 'PM = 180° + ∠G(jωc)', frequency: '상' },
    { id: 618, category: 'control', title: '보상기 (진상/지상)', definition: '제어계 특성 개선을 위해 추가하는 요소.', formula: '진상(미분작용): 속도개선 / 지상(적분작용): 편차개선', frequency: '상' },
    { id: 619, category: 'control', title: '제어계의 구성 요소', definition: '폐루프 제어의 필수 블록.', formula: '목표값 → 조절부 → 조작부 → 제어대상(플랜트) → 검출부', frequency: '하' },
    { id: 620, category: 'control', title: '가관측성과 가제어성', definition: '상태방정식에서 제어 가능 여부 판별.', formula: '가제어성 행렬 [B, AB, A²B...]의 행렬식이 0이 아니어야 함', frequency: '하' },

    /* ==========================================
       [필기 모드] 6. 전기설비기준 (KEC) (20개)
       ========================================== */
    { id: 701, category: 'regulation', title: '전압의 종별', definition: 'KEC 분류.', formula: '저압: AC 1kV, DC 1.5kV 이하 / 특고압: 7kV 초과', frequency: '상' },
    { id: 702, category: 'regulation', title: '절연저항 기준', definition: '전로 누전 방지.', formula: '500V 이하: 1.0MΩ 이상 (SELV: 0.5MΩ)', frequency: '상' },
    { id: 703, category: 'regulation', title: '절연내력 시험', definition: '10분간 교류 전압 인가.', formula: '7kV 이하: 1.5배 / 22.9kV: 0.92배', frequency: '상' },
    { id: 704, category: 'regulation', title: '접지 시스템 (TN, TT, IT)', definition: '전원과 보호도체(PE) 연결.', formula: 'TN: 전원접지 직접연결 / TT: 독립접지', frequency: '상' },
    { id: 705, category: 'regulation', title: '과전류 차단기 정격', definition: '전선 허용전류 보호.', formula: '설계전류 ≤ 차단기 ≤ 허용전류', frequency: '중' },
    { id: 706, category: 'regulation', title: '누전차단기 의무 시설', definition: '감전 및 화재 방지.', formula: '욕실 등 물기 있는 곳 필수 설치 (15mA, 0.03초)', frequency: '상' },
    { id: 707, category: 'regulation', title: '가공전선 지표상 높이', definition: '차량 등 충돌 방지.', formula: '저고압 도로횡단 6m, 철도횡단 6.5m', frequency: '중' },
    { id: 708, category: 'regulation', title: '지중 전선 매설 깊이', definition: '땅속 케이블 보호.', formula: '중량물 압력 있는 곳: 1.0m 이상 / 없는 곳: 0.6m 이상', frequency: '상' },
    { id: 709, category: 'regulation', title: '옥내배선 공사', definition: '점검 불가 은폐 장소.', formula: '합성수지관, 금속관, 케이블 공사만 가능', frequency: '상' },
    { id: 710, category: 'regulation', title: '특수장소 방폭설비', definition: '가스/분진 폭발 방지.', formula: '금속관 공사(나사 5턱 이상 결합), 케이블 공사', frequency: '중' },
    { id: 711, category: 'regulation', title: '등전위 본딩', definition: '전위차를 없애 감전을 예방하기 위해 도체들을 서로 연결하는 것.', formula: '주등전위 본딩, 보조등전위 본딩', frequency: '상' },
    { id: 712, category: 'regulation', title: '피뢰시스템 (LPS)', definition: '낙뢰 구조물 보호.', formula: '수뢰부(피뢰침) - 인하도선 - 접지극 시스템으로 구성', frequency: '상' },
    { id: 713, category: 'regulation', title: '가공전선로 지지물', definition: '철탑, 철근콘크리트주 등.', formula: '철탑의 경간(표준): 600m 이하 / A종 철근주: 150m 이하', frequency: '중' },
    { id: 714, category: 'regulation', title: '보안공사', definition: '인구 밀집 지역이나 도로 인접 시 안전을 강화한 시설 기준.', formula: '고압, 제1종~제3종 특고압 보안공사 (경간 축소 등)', frequency: '상' },
    { id: 715, category: 'regulation', title: '이격거리 (저고압 가공전선)', definition: '안전을 위한 전선과 조영물(건물) 간격.', formula: '저고압 전선과 건조물 상부(지붕): 2.0m 이상 (절연전선 1.0m)', frequency: '상' },
    { id: 716, category: 'regulation', title: '애자 사용 공사', definition: '노출 장소의 기본 공사.', formula: '전선 상호 간격 6cm 이상 / 조영재와 이격 2.5cm 이상(400V 미만)', frequency: '상' },
    { id: 717, category: 'regulation', title: '케이블 트레이 공사', definition: '다수의 케이블을 지지하는 시설물.', formula: '사다리형, 펀칭형, 메시형, 바닥밀폐형 (난연성 케이블 사용)', frequency: '상' },
    { id: 718, category: 'regulation', title: '옥내 진열장 (쇼윈도) 배선', definition: '백화점 등의 전시 조명.', formula: '단면적 0.75mm² 이상 코드 또는 캡타이어 케이블 사용', frequency: '하' },
    { id: 719, category: 'regulation', title: '태양광 발전 설비', definition: '모듈, 인버터 등 신재생 전기설비 기준.', formula: '직류 전로에 지락 차단 장치 설치 / 모듈 프레임 접지', frequency: '상' },
    { id: 720, category: 'regulation', title: '전기저장장치 (ESS)', definition: '배터리를 이용한 전력 저장.', formula: '제어장치, 전력변환장치(PCS) 시설 및 화재 확산 방지 이격거리 확보', frequency: '중' },

    /* ==========================================
       [실기 모드] 7. 단답·수변전 (20개)
       ========================================== */
    { id: 801, category: 'prac_short', title: '역률 개선 효과 4가지', definition: '전력용 콘덴서 설치 시 이점.', formula: '1. 전력손실 감소\n2. 전압강하 감소\n3. 설비용량 여유 증가\n4. 요금 절감', frequency: '상' },
    { id: 802, category: 'prac_short', title: '피뢰기 구비조건', definition: '낙뢰 방어용 기기(LA).', formula: '충격방전개시/제한전압은 낮을 것\n상용주파방전/속류차단 능력은 클 것', frequency: '상' },
    { id: 803, category: 'prac_short', title: 'MOF (계기용 변성기)', definition: '전력량계에 전압/전류 공급.', formula: 'PT와 CT를 한 함에 내장 (고전압 대전류 → 저전압 소전류)', frequency: '상' },
    { id: 804, category: 'prac_short', title: 'CB와 DS 조작 순서', definition: 'DS는 아크 차단 능력이 없음.', formula: '투입: DS ON → CB ON\n차단: CB OFF → DS OFF', frequency: '상' },
    { id: 805, category: 'prac_short', title: '변압기 병렬운전 조건', definition: '순환전류 방지 조건.', formula: '극성, 정격전압, %임피던스 같을 것', frequency: '상' },
    { id: 806, category: 'prac_short', title: 'CT 2차측 개방 금지', definition: '운전 중 CT 교체 시 유의사항.', formula: '이유: 고전압 유기로 인한 절연 파괴\n조치: 반드시 2차측 단락(Short)', frequency: '상' },
    { id: 807, category: 'prac_short', title: '지락 보호 계전기', definition: '누전 사고 감지.', formula: 'OCGR (과전류 지락)\nSGR (선택 지락)\nDGR (방향 지락)', frequency: '상' },
    { id: 808, category: 'prac_short', title: '단락 용량 산출', definition: '차단기 정격 차단 용량.', formula: 'Ps = (100 / %Z) × Pn', frequency: '상' },
    { id: 809, category: 'prac_short', title: '코로나 대책', definition: '임계전압을 높이는 방법.', formula: '복도체(다도체) 사용, 굵은 전선 사용', frequency: '중' },
    { id: 810, category: 'prac_short', title: '변압기 냉각 방식', definition: '명판 기호.', formula: 'ONAN (유입 자냉식), ONAF (유입 풍냉식)', frequency: '중' },
    { id: 811, category: 'prac_short', title: '영상변류기 (ZCT)', definition: '3상 선로의 지락사고 시 발생하는 영상전류를 검출.', formula: '지락 계전기(GR)와 세트로 결합하여 누전 차단기에 신호 전송', frequency: '상' },
    { id: 812, category: 'prac_short', title: '차단기 트립(Trip) 방식', definition: '사고 시 차단기를 동작시키는 전원 방식.', formula: '직류 전압 트립 (축전지), 콘덴서 트립(CTD), 과전류 트립, 부족전압 트립', frequency: '상' },
    { id: 813, category: 'prac_short', title: 'VCB (진공차단기) 특징', definition: '진공(High Vacuum)을 소호 매질로 사용하는 수변전 차단기.', formula: '장점: 화재 위험 없음, 소형경량, 유지보수 용이\n단점: 개폐 서지 발생 (SA 설치 필요)', frequency: '상' },
    { id: 814, category: 'prac_short', title: 'ASS (자동고장구분개폐기)', definition: '22.9kV-y 수전설비 인입구에 설치하는 개폐기.', formula: '무전압 시 개방 가능, 과전류 시 컨트롤러에 의해 자동 개방하여 파급사고 방지', frequency: '상' },
    { id: 815, category: 'prac_short', title: '변압기 손실 (무부하손/부하손)', definition: '전력 공급 시 발생하는 손실.', formula: '무부하손(철손): 전압 가해지면 발생 (개방시험 측정)\n부하손(동손): 부하전류에 의해 발생 (단락시험 측정)', frequency: '상' },
    { id: 816, category: 'prac_short', title: '서지흡수기 (SA)', definition: '진공차단기(VCB) 개폐 시 발생하는 개폐서지로부터 몰드변압기/전동기 보호.', formula: '설치 위치: 차단기 2차측과 부하 측 사이', frequency: '상' },
    { id: 817, category: 'prac_short', title: '수변전 설비 단선도 (그리기)', definition: '특고압 수전설비의 기기 배치를 선 하나로 나타낸 도면.', formula: 'ASS → LA → MOF → CB → TR 의 순서를 완벽히 암기 및 작도 필수', frequency: '상' },
    { id: 818, category: 'prac_short', title: '역률 과보상 시 문제점', definition: '콘덴서를 너무 많이 달아 진상 역률이 되었을 때.', formula: '1. 단자 전압 상승(페란티)\n2. 전력 손실 증가\n3. 고조파 왜곡\n4. 계전기 오동작', frequency: '상' },
    { id: 819, category: 'prac_short', title: '축전지 (Battery) 용량 산정', definition: '정전 시 비상 전원용 축전지 크기.', formula: 'C = (1 / L) × [K1·I1 + K2(I2-I1) + ...]\n(L: 보수율, K: 용량환산시간, I: 방전전류)', frequency: '중' },
    { id: 820, category: 'prac_short', title: '눈부심 (Glare) 방지 대책', definition: '조명 설비 설계 시 시력 보호.', formula: '1. 반투명 유리 구 사용\n2. 루버 또는 반사갓 부착\n3. 아크릴 조명기구 사용', frequency: '하' },

    /* ==========================================
       [실기 모드] 8. 시퀀스·PLC (20개)
       ========================================== */
    { id: 901, category: 'prac_sequence', title: '자기 유지 회로', definition: '버튼을 놓아도 동작 유지.', formula: '입력 버튼(a)과 릴레이 보조접점(a) 병렬', frequency: '상' },
    { id: 902, category: 'prac_sequence', title: '인터록 회로', definition: '동시 투입 방지.', formula: '서로의 b접점을 상대방 조작 회로에 직렬 접속', frequency: '상' },
    { id: 903, category: 'prac_sequence', title: 'Y-Δ 기동 회로', definition: '기동 전류 1/3 감소.', formula: 'Y결선 기동 → 타이머 → Δ결선 운전', frequency: '상' },
    { id: 904, category: 'prac_sequence', title: '타이머 접점', definition: '한시동작 순시복귀.', formula: '설정시간 후 ON (Δ 기호가 우산 모양)', frequency: '상' },
    { id: 905, category: 'prac_sequence', title: '정역 회전 제어', definition: '전동기 회전 방향 역전.', formula: '3선 중 2선의 위치를 바꿈 (인터록 필수)', frequency: '상' },
    { id: 906, category: 'prac_sequence', title: '논리회로 (AND/OR/NOT)', definition: '유접점을 무접점 게이트로 변환.', formula: '직렬=AND, 병렬=OR, b접점=NOT', frequency: '상' },
    { id: 907, category: 'prac_sequence', title: '드모르간 정리', definition: '논리식 간소화 규칙.', formula: '(A+B)\' = A\'·B\'', frequency: '중' },
    { id: 908, category: 'prac_sequence', title: '플리커 릴레이', definition: '일정 주기로 점멸 반복.', formula: '경광등이나 부저 경보 회로에 사용', frequency: '중' },
    { id: 909, category: 'prac_sequence', title: 'PLC 기본 명령어', definition: '래더 작성을 위한 명령어.', formula: 'LD (시작), OR (병렬), AND (직렬), OUT (출력)', frequency: '상' },
    { id: 910, category: 'prac_sequence', title: '논리식 간소화 (카르노 맵)', definition: '복잡한 식을 표로 최소화.', formula: '1을 2^n 단위로 묶어 공통 변수 추출', frequency: '중' },
    { id: 911, category: 'prac_sequence', title: 'MC (전자접촉기)', definition: '주회로의 대전류를 개폐하는 전자석 스위치.', formula: '조작 전원이 투입되면 전자력으로 주접점(동력선)을 닫음', frequency: '상' },
    { id: 912, category: 'prac_sequence', title: 'THR (열동계전기)', definition: '전동기 과부하 시 열을 감지하여 회로 차단.', formula: '주회로에 히터를 연결, 제어회로에 b접점을 직렬 접속하여 트립', frequency: '상' },
    { id: 913, category: 'prac_sequence', title: '타임 차트 (Time Chart)', definition: '시간의 흐름에 따른 릴레이와 출력의 동작 상태 도표.', formula: '입력이 들어왔을 때 각 접점과 코일의 ON/OFF 타이밍 작도', frequency: '상' },
    { id: 914, category: 'prac_sequence', title: '순차 제어 (컨베이어 제어)', definition: '정해진 순서대로 기기가 차례로 기동하는 회로.', formula: '선행 릴레이의 a접점을 후행 릴레이 기동 조건에 직렬로 삽입', frequency: '상' },
    { id: 915, category: 'prac_sequence', title: '리미트 스위치 (LS)', definition: '물리적인 위치를 감지하여 동작하는 접점.', formula: '문 열림 감지, 셔터 상하한 위치 정지용 등에 사용', frequency: '중' },
    { id: 916, category: 'prac_sequence', title: '단상 유도전동기 정역 회전', definition: '단상 모터의 방향 전환 회로.', formula: '기동 권선(보조 권선)의 극성을 반대로 접속', frequency: '중' },
    { id: 917, category: 'prac_sequence', title: '역상 제동 회로 (Plugging)', definition: '운전 중인 전동기를 급정지시키는 제어.', formula: '정지 버튼 시 전원을 역상(정역 접속)으로 짧게 투입 후 차단', frequency: '중' },
    { id: 918, category: 'prac_sequence', title: 'PLC 타이머 (TON, TOFF)', definition: '소프트웨어로 구현된 타이머 펑션 블록.', formula: 'TON (On-Delay), TOFF (Off-Delay) 파라미터(설정값) 지정', frequency: '상' },
    { id: 919, category: 'prac_sequence', title: 'PLC 카운터 (CTU, CTD)', definition: '입력 신호의 횟수를 세는 펑션 블록.', formula: 'CTU (Up Counter): 펄스가 들어올 때마다 1씩 증가하여 설정값 시 출력', frequency: '상' },
    { id: 920, category: 'prac_sequence', title: '무접점 회로 → 래더 변환', definition: '논리 게이트 기호를 PLC 래더 다이어그램으로 변경.', formula: 'AND 게이트 = 직렬 접점 배열, OR 게이트 = 병렬 분기 배열', frequency: '상' },

    /* ==========================================
       [실기 모드] 9. 테이블스펙 (20개)
       ========================================== */
    { id: 1001, category: 'prac_table', title: '전선 굵기 선정 3요소', definition: '설계 최우선 고려사항.', formula: '1. 허용 전류 2. 전압 강하 3. 기계적 강도', frequency: '상' },
    { id: 1002, category: 'prac_table', title: '단상 2선식 전압강하', definition: '전선 단면적(A) 계산.', formula: 'A = (35.6·L·I) / (1000·e) [mm²]', frequency: '상' },
    { id: 1003, category: 'prac_table', title: '3상 3선식 전압강하', definition: '동력설비 전선 굵기.', formula: 'A = (30.8·L·I) / (1000·e) [mm²]', frequency: '상' },
    { id: 1004, category: 'prac_table', title: '조명 설계: FUN=EAD', definition: '필요한 등기구 수(N) 계산.', formula: 'F:광속, U:조명률, E:조도, A:면적, D:감광보상율', frequency: '상' },
    { id: 1005, category: 'prac_table', title: '실지수 (Room Index)', definition: '방 크기에 따른 조명 효율.', formula: 'RI = (XY) / (H(X+Y))', frequency: '중' },
    { id: 1006, category: 'prac_table', title: '간선 허용전류', definition: '메인 전선 최소 굵기 기준.', formula: '모터 정격 50A 이하: 1.25배 / 50A 초과: 1.1배', frequency: '상' },
    { id: 1007, category: 'prac_table', title: '분기회로 수 계산', definition: '차단기 개수 산출.', formula: 'N = (바닥면적×부하밀도) / (전압×15A)', frequency: '상' },
    { id: 1008, category: 'prac_table', title: '접지선 단면적', definition: '고장 전류에 견디는 굵기.', formula: 'S = 0.0496 × Is [mm²] (0.1초 동작 기준)', frequency: '중' },
    { id: 1009, category: 'prac_table', title: '금속관 굵기 선정', definition: '전선 가닥수에 맞는 관 크기.', formula: '혼용 시 관 내단면적의 32% 이하 적용', frequency: '중' },
    { id: 1010, category: 'prac_table', title: '변압기 용량 산정', definition: '수용률, 부등률 고려.', formula: 'Tr = (총용량×수용률) / (부등률×역률)', frequency: '상' },
    { id: 1011, category: 'prac_table', title: '수용가 부하 상정', definition: '건물 용도별 표준 부하[VA/m²] 표를 보고 계산.', formula: '바닥면적 × 표준부하밀도 + (가산 부하)', frequency: '상' },
    { id: 1012, category: 'prac_table', title: '과전류 차단기 용량 산정', definition: '표를 보고 전동기/전열기 혼합 부하의 차단기 크기 결정.', formula: '전동기 기동전류(가장 큰 것) + 나머지 부하 전류 등을 표와 대조', frequency: '상' },
    { id: 1013, category: 'prac_table', title: '콘덴서 용량 산정표', definition: '개선 전 역률과 개선 후 역률 교차점을 찾아 승수(K)를 구함.', formula: 'Qc = 유효전력(P) × 표에서 찾은 승수(K)', frequency: '상' },
    { id: 1014, category: 'prac_table', title: '케이블 허용전류 감소 계수', definition: '같은 관에 여러 전선을 넣을 때 발생하는 열로 인한 전류 감소.', formula: '전선 가닥수 표를 보고 허용전류에 감소계수(예: 0.7)를 곱함', frequency: '상' },
    { id: 1015, category: 'prac_table', title: '방폭 기구의 등급 표', definition: '위험 지역(0종, 1종, 2종)에 따른 전기기기 선정 표 해석.', formula: '내압(d), 안전증(e), 본질안전(ia, ib) 기호 적용', frequency: '중' },
    { id: 1016, category: 'prac_table', title: 'CT 배수 산정', definition: '부하 전류를 계산한 뒤 표준 CT 규격표에서 선정.', formula: 'CT 1차측 전류 = 부하전류 × 여유율(보통 1.25~1.5)', frequency: '상' },
    { id: 1017, category: 'prac_table', title: '전선관 호칭 (후강/박강)', definition: '나사 내는 방식에 따른 배관 굵기 선정.', formula: '후강전선관(짝수 호칭: 16, 22, 28...), 박강전선관(홀수 호칭: 19, 25...)', frequency: '하' },
    { id: 1018, category: 'prac_table', title: '발전기 용량 산정 (PG법)', definition: '표를 참조하여 비상 발전기 크기를 구하는 방식.', formula: 'PG1, PG2, PG3 중 가장 큰 값으로 선정', frequency: '중' },
    { id: 1019, category: 'prac_table', title: '지락 차단기(ELB) 감도 전류 선정', definition: '장소(욕실, 옥외 등)에 따른 누전차단기 스펙 표.', formula: '일반: 30mA 0.03초 / 인체감전위험(욕실): 15mA 0.03초', frequency: '중' },
    { id: 1020, category: 'prac_table', title: '부하 평형률 계산', definition: '단상 부하들이 3상에 골고루 분배되었는지 확인.', formula: '(최대 상부하 - 최소 상부하) / (총 부하 평균) × 100 ≤ 30%', frequency: '상' }
  ]
};

// 로컬스토리지 키
const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
