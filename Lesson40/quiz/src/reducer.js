import { NEXT_QUESTION, RESTART_QUIZ } from './actions';

const initialState = {
  questions: [
    {
      text: "Who was the first President of the United States?",
      answers: [
        { id: 0, text: "George Washington", isCorrect: true },
        { id: 1, text: "Thomas Jefferson", isCorrect: false },
        { id: 2, text: "Thomas Edison", isCorrect: false },
        { id: 3, text: "I don't know", isCorrect: false },
      ],
    },
    {
      text: "What is the answer to the Ultimate Question of Life, the Universe, and Everything?",
      answers: [
        { id: 0, text: "Pi", isCorrect: false },
        { id: 1, text: "42", isCorrect: true },
        { id: 2, text: "Wah?", isCorrect: false },
        { id: 3, text: "I don't know", isCorrect: false },
      ],
    },
    {
      text: "Do you love to code?",
      answers: [
        { id: 0, text: "No", isCorrect: false },
        { id: 1, text: "Yes", isCorrect: false },
        { id: 2, text: "Hell Yeah", isCorrect: true },
        { id: 3, text: "No", isCorrect: false },
      ],
    },
    {
      text: "What's the best programming language?",
      answers: [
        { id: 0, text: "Javascript", isCorrect: true },
        { id: 1, text: "C#", isCorrect: false },
        { id: 2, text: "Php", isCorrect: false },
        { id: 3, text: "Python", isCorrect: false },
      ],
    },
    {
      text: "Is Jason Chan Awesome?",
      answers: [
        { id: 0, text: "Yes", isCorrect: true },
        { id: 1, text: "No", isCorrect: false },
        { id: 2, text: "Maybe", isCorrect: false },
        { id: 3, text: "He's okay", isCorrect: false },
      ],
    },
  ],
  score: 0,
  questionIndex: 0,
  showResult: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      if (action.payload) {
        state.score++;
      }
      if (state.questionIndex + 1 < state.questions.length) {
        return {
          ...state,
          questionIndex: state.questionIndex + 1
        };
      } else {
        return {
          ...state,
          showResult: true
        };
      }
    case RESTART_QUIZ:
      return initialState;
    default:
      return state;
  }
}

export default reducer;