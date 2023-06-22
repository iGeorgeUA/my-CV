import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, restartQuiz } from './actions';

function App() {
  const questions = useSelector(state => state.questions);
  const showResult = useSelector(state => state.showResult);
  const score = useSelector(state => state.score);
  const questionIndex = useSelector(state => state.questionIndex);
  const dispatch = useDispatch();

  const answerClicked = (isCorrect) => {
    dispatch(nextQuestion(isCorrect));
  }

  const restart = () => {
    dispatch(restartQuiz());
  }

  return (
    <div className="App">
      <h1>Quiz</h1>

      <h2>Current score: {score}</h2>

      {showResult ? (
        <div className='result'>
          <h1>Game Over</h1>
          <h2>Your score is: {score}</h2>
          <button onClick={() => restart()}>Try again</button>
        </div>
      ) : (
        <div className='question-card'>
          <h2>Question {questionIndex + 1} out of {questions.length}</h2>
          <h3 className='question-text'>{questions[questionIndex].text}</h3>
          <ul>
            {questions[questionIndex].answers.map((answer) => {
              return (
                <li onClick={() => answerClicked(answer.isCorrect)} key={answer.id}>{answer.text}</li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;