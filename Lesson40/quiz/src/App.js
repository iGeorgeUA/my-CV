import React, { useState, useContext } from 'react';
import './App.css';
import QuestionsContext from './QuestionsContext';

function App() {
  const { questions } = useContext(QuestionsContext); console.log(questions);
  const [showResult, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);

  const answerClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (question + 1 < questions.length) {
      setQuestion(question + 1);
    } else {
      setResult(true);
    }
  }

  const restart = () => {
    setScore(0);
    setQuestion(0);
    setResult(false);
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
          <h2>Question {question + 1} out of {questions.length}</h2>
          <h3 className='question-text'>{questions[question].text}</h3>
          <ul>
            {questions[question].answers.map((answer) => {
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