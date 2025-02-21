import React, { useEffect, useState } from 'react';
import { data } from "../data/data";
import "../style/quizqustion.css"; 

const QuizQuestion = () => {
  const [value, setValue] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState([]); 
  const [quizComplet, setQuizComplet] = useState(false);
  const [second, setSecond] = useState(30);
  const [mark, setMark] = useState(0);

  useEffect(() => {
    if (index >= data.length) {
      setQuizComplet(true); 
      calculateMarks();
      return;
    }

    setValue(data[index]);

  
    const countdownInterval = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond === 1) {
         
          setIndex((prevIndex) => (prevIndex + 1));
          return 30;
        }
        return prevSecond - 1;
      });
    }, 1000);

    
    return () => clearInterval(countdownInterval);
  }, [index]);

  const calculateMarks = () => {
    let score = 0;
    answer.forEach((answer, i) => {
      if (answer === data[i].correctAnswer) { 
        score += 1;
      }
    });
    setMark(score); 
  };

  const handleCheckbox = (optionIndex) => {
    const selectedAnswer = value.option[optionIndex].leter;
    const updatedAnswers = [...answer];
    updatedAnswers[index] = selectedAnswer;
    setAnswer(updatedAnswers);
  };

  if (!value) {
    return <div className="loading">Loading .......</div>;
  }

  if (quizComplet) {
    return (
      <div className="quiz-completed">
        <h1>Quiz Completed!</h1>
        <p>Thank you for completing the quiz.</p>
        <div className="selected-answers">
          <h3>Your Score:</h3>
          <p>{mark}/5</p>
          <p>{ mark >2 ? "Doing Well 👌":" Better Luck NextTime 😊"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Multiple-Choice Questions (5 Questions)</h1>
      <p className="timer">Time Remaining: {second} seconds</p>
      <p className="question">
        {index + 1}. {value.qustion}
      </p>

      <div className="options-list">
        {value.option.map((item, optionIndex) => (
          <div key={optionIndex} className="option">
            <input
              type="checkbox"
              className="checkbox"
              checked={answer[index] === item.leter}
              onChange={() => handleCheckbox(optionIndex)} 
            />
            <label className="option-label">
              {item.leter}. {item.opt}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
