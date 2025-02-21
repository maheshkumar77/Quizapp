import React, { useState } from 'react';
import Inttype from './Inttype';  
import QuizQuestion from './Qizqustion';  
import "../style/quizoption.css"


const Quizoption = () => {
  const [category, setCategory] = useState(null);  

  return (
    <div className='quizmain'>
    <div className='quizcompli'>
      <div className='quizcategory'>
        <div>
          <button onClick={() => setCategory("multiplaechoice")}>
            Multiple-Choice Questions
          </button>
        </div>
        <div>
          <button onClick={() => setCategory("integertype")}>
            Integer-Type Questions
          </button>
        </div>
      </div>

      <div className='quizsummary'>
     
        {category === "multiplaechoice" ? <QuizQuestion /> : <Inttype /> } 
      </div>
    </div>
    </div>
  );
};

export default Quizoption;
