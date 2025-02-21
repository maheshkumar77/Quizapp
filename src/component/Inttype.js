import React, { useState, useEffect } from 'react';
import { intqustion } from "../data/data"; 
import "../style/inttype.css";

const Inttype = () => {
  const [value, setValue] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState([]); 
  const [quizComp, setQuizComp] = useState(false); 
  const [second, setSecond] = useState(30); 
  const [mark, setMark] = useState(0); 

  useEffect(() => {
    if (index >= intqustion.length) {
      setQuizComp(true);
      calculateMark();
      return;
    }

    setValue(intqustion[index]); 
    const countdownInterval = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond === 1) {
          setIndex((prevIndex) => prevIndex + 1);
          return 30; 
        }
        return prevSecond - 1; 
      });
    }, 3000);

    return () => clearInterval(countdownInterval); 
  }, [index]); 

  const calculateMark = () => {
    let score = 0;

    answer.forEach((answer, i) => {
      if (parseInt(answer) === intqustion[i].answer) {
        score += 1;
      }
    });

    setMark(score);
  };

  const handleanschange = (e) => {
    const updatedAnswers = [...answer];
    updatedAnswers[index] = e.target.value; 
    setAnswer(updatedAnswers);
  };

  
  if (!value) {
    return <div className="loading">Loading .......</div>;
  }

  if (quizComp) {
    return (
      <div className="quiz-completed">
        <h1>Quiz Completed!</h1>
        <p>Thank you for completing the quiz.</p>
        <div className="selected-answers">
          <h3>Your Score:</h3>
          <p>{mark}/{intqustion.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-cont">
      <h1>Integer-Type Questions (5 Questions)</h1>
      <p className="timer">Time Remaining: {second} seconds</p>
      <div className="question-container">
        <p className="question">{index + 1}. {value.qustion}</p>
        Ans.
        <input
          type="number"
          className="answer-input"
          onChange={handleanschange} 
          value={answer[index]}
          placeholder="Enter your answer"
        />
      </div>
    </div>
  );
};

export default Inttype;
