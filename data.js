// ==========================================================================
// [추가] 국가기술자격 응시 요건 및 모의고사 스펙 설정 데이터
// ==========================================================================

const qualificationRequirements = [
  {
    grade: "전기기능사",
    icon: "⚡",
    summary: "제한 없음 (누구나 응시 가능)",
    details: [
      "학력, 경력, 연령, 성별 등 아무런 제한이 없습니다.",
      "전기 분야 입문자 및 비전공자가 가장 먼저 도전하는 자격증입니다."
    ]
  },
  {
    grade: "전기산업기사",
    icon: "⚙️",
    summary: "전문대졸 또는 2년 이상 경력자",
    details: [
      "<strong>기능사 취득 후:</strong> + 실무 경력 1년 이상",
      "<strong>관련학과 전문대졸:</strong> 졸업자 또는 졸업예정자 (2년제/3년제)",
      "<strong>관련학과 대학졸:</strong> 1/2 이상 수료자 (4년제 기준 2학년 마침)",
      "<strong>순수 실무 경력:</strong> 동일/유사 분야 2년 이상"
    ]
  },
  {
    grade: "전기기사",
    icon: "🏆",
    summary: "4년제 대졸 또는 4년 이상 경력자",
    details: [
      "<strong>기능사 취득 후:</strong> + 실무 경력 3년 이상",
      "<strong>산업기사 취득 후:</strong> + 실무 경력 1년 이상",
      "<strong>관련학과 대학졸:</strong> 졸업자 또는 졸업예정자 (4년제 기준 4학년 재학)",
      "<strong>관련학과 전문대졸:</strong> 졸업 후 + 실무 경력 1~2년 이상",
      "<strong>순수 실무 경력:</strong> 동일/유사 분야 4년 이상"
    ]
  }
];

const mockExamSettings = {
  craftsman: {
    name: "전기기능사 필기 모의고사",
    timeLimit: 60 * 60, // 60분
    totalQuestions: 60,
    passingScore: 60,
    subjects: ['foundation', 'machine', 'regulation']
  },
  industrial_engineer: {
    name: "전기산업기사 필기 모의고사",
    timeLimit: 150 * 60, // 150분
    totalQuestions: 100,
    passingScore: 60,
    subjects: ['electromagnetics', 'power', 'machine', 'circuit', 'regulation']
  },
  engineer: {
    name: "전기기사 필기 모의고사",
    timeLimit: 150 * 60, // 150분
    totalQuestions: 100,
    passingScore: 60,
    subjects: ['electromagnetics', 'power', 'machine', 'circuit', 'control', 'regulation']
  }
};
