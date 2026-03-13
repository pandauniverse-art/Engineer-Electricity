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
    // --- 필기 데이터 샘플 ---
    {
      id: 1, category: 'foundation', title: '피타고라스 정리와 삼각함수',
      definition: '직각삼각형에서 빗변, 밑변, 높이의 관계. 피상전력, 유효전력, 무효전력 계산의 절대적인 기초.',
      formula: 'sinθ = 높이/빗변, cosθ = 밑변/빗변, tanθ = 높이/밑변',
      frequency: '상', relatedConcepts: ['역률', '피상전력']
    },
    {
      id: 11, category: 'power', title: '페란티 현상 (Ferranti Effect)',
      definition: '경부하 또는 무부하 시 선로의 정전용량으로 인해 수전단 전압이 송전단 전압보다 높아지는 현상.',
      formula: '대책: 수전단에 분로리액터(Shunt Reactor) 설치',
      frequency: '상', relatedConcepts: ['분로리액터']
    },
    
    // --- 실기 데이터 샘플 ---
    {
      id: 201, category: 'prac_short', title: '역률 개선의 효과 4가지',
      definition: '부하에 병렬로 전력용 콘덴서를 설치하여 진상 무효전력을 공급, 역률을 개선했을 때 얻는 이점.',
      formula: '1. 전력 손실 감소\n2. 전압 강하 감소\n3. 설비 용량의 여력 증가\n4. 전기 요금 절감',
      frequency: '상', relatedConcepts: ['전력용 콘덴서']
    },
    {
      id: 202, category: 'prac_short', title: '지락 보호 계전기의 종류 3가지',
      definition: '송전선로 및 수전설비에서 지락사고(누전) 발생 시 이를 감지하는 계전기.',
      formula: '1. 과전류 지락 계전기 (OCGR)\n2. 선택 지락 계전기 (SGR)\n3. 방향 지락 계전기 (DGR)',
      frequency: '상', relatedConcepts: ['보호 계전기']
    }
  ]
};
