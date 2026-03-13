const electricianData = {
  categories: [
    { id: 'theory', name: '전기이론', icon: '⚡', color: '#3B82F6' },
    { id: 'power', name: '전력공학', icon: '🔌', color: '#10B981' },
    { id: 'machine', name: '전기기기', icon: '⚙️', color: '#F59E0B' },
    { id: 'circuit', name: '회로이론', icon: '🔄', color: '#8B5CF6' },
    { id: 'control', name: '제어공학', icon: '🎛️', color: '#EC4899' },
    { id: 'regulation', name: '전기설비기술기준', icon: '📋', color: '#EF4444' },
    { id: 'practical', name: '실기핵심', icon: '📝', color: '#6366F1' }
  ],
  concepts: [
    // --- 기존 필기 데이터 예시 ---
    {
      id: 1,
      category: 'theory',
      title: "옴의 법칙 (Ohm's Law)",
      definition: "전압(V), 전류(I), 저항(R)의 관계를 나타내는 법칙.",
      formula: "V = I × R",
      frequency: "상"
    },
    // --- ★ 실기(필답형) 데이터 예시 ---
    {
      id: 201,
      category: 'practical',
      isPractical: true,
      title: "역률 개선의 효과 4가지",
      definition: "부하에 콘덴서를 설치하여 역률을 개선했을 때 얻는 이점입니다.",
      answers: [
        "1. 전력 손실 경감",
        "2. 전압 강하 감소",
        "3. 설비 용량의 여력 증가",
        "4. 전기 요금 절감"
      ],
      frequency: "상"
    },
    {
      id: 202,
      category: 'practical',
      isPractical: true,
      title: "변압기 모선 보호 계전방식 3가지",
      definition: "변압기 사고 발생 시 모선을 보호하기 위한 방식입니다.",
      answers: [
        "1. 차동 계전 방식",
        "2. 전류 차동 계전 방식",
        "3. 전압 차동 계전 방식"
      ],
      frequency: "중"
    }
  ]
};

const STORAGE_KEYS = {
  favorites: 'electrician_favorites',
  progress: 'electrician_progress',
  darkMode: 'electrician_darkmode'
};
