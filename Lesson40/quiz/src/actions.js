export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESTART_QUIZ = 'RESTART_QUIZ';

export function nextQuestion(isCorrect) {
  return {
    type: NEXT_QUESTION,
    payload: isCorrect
  };
}

export function restartQuiz() {
  return {
    type: RESTART_QUIZ
  };
}