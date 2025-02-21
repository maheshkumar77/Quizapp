import React, { useState, useEffect } from 'react';
import Quizoption from './Quizoption';
import TTimer from './TTimer';
import "../style/startq.css";

const Startq = () => {
  const [start, setStart] = useState(false); 
  const [timerDone, setTimerDone] = useState(false);  
  const [time, setTime] = useState(10); 


  const startQuiz = () => {
    setStart(true);
    setTimerDone(false); 
    setTime(10);  
  };

  
  useEffect(() => {
    if (start && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); 
    } else if (time === 0) {
      handleTimerEnd(); 
    }
  }, [start, time]); 
  
  const handleTimerEnd = () => {
    setTimerDone(true);
  };

  return (
    <div className="startq-container">
      <button className="start-button" onClick={startQuiz}>
        Start Quiz
      </button>
      
     
      {start && !timerDone ? (
        <TTimer time={time} />  
      ) : (
        timerDone && <Quizoption />
      )}
    </div>
  );
};

export default Startq;
