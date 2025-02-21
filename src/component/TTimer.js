
import React, { useState, useEffect } from 'react';
import '../style/timer.css';  

const TTimer = () => {
  const [time, setTime] = useState(10); 

  useEffect(() => {
    if (time === 0) return; 
    
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1); 
    }, 1000);

    return () => clearInterval(interval); 
  }, [time]);

  return (
    <div className="countdown-timer-container">
   
      <div className="countdown-timer">

        <p className="time">{time}</p>
      </div>
    </div>
  );
};

export default TTimer;
