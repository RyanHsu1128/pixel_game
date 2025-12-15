
// Mock data for questions
const MOCK_QUESTIONS = [
  {
    qn_id: 1,
    question: "What is the complexity of Binary Search?",
    A: "O(n)",
    B: "O(log n)",
    C: "O(n^2)",
    D: "O(1)",
    answer: "B"
  },
  {
    qn_id: 2,
    question: "Which hook is used for side effects in React?",
    A: "useState",
    B: "useReducer",
    C: "useEffect",
    D: "useMemo",
    answer: "C"
  },
  {
    qn_id: 3,
    question: "What does CSS stand for?",
    A: "Computer Style Sheets",
    B: "Creative Style Sheets",
    C: "Cascading Style Sheets",
    D: "Colorful Style Sheets",
    answer: "C"
  },
  {
    qn_id: 4,
    question: "Which of these is NOT a JS data type?",
    A: "Symbol",
    B: "Float",
    C: "BigInt",
    D: "Boolean",
    answer: "B"
  },
  {
    qn_id: 5,
    question: "What is 2 + 2 in JavaScript '2' + 2?",
    A: "4",
    B: "22",
    C: "NaN",
    D: "Error",
    answer: "B"
  }
];

export const mockFetchQuestions = async (count = 5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Shuffle and slice
      const shuffled = [...MOCK_QUESTIONS].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, count));
    }, 1000); 
  });
};

export const mockSubmitScore = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Submitting Score (Mock):", data);
      resolve({ success: true, newTotal: 100, best: 200, rank: 1 });
    }, 1000);
  });
};
