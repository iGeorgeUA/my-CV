import React, { useState } from 'react';
import './App.css';

function App() {

  const [showResult, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);

  const questions = [
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
  ];

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