import React from 'react';
import '../style/instroction.css';  // Import the CSS file

const Instroction = () => {
  return (
    <div className="inst-cont">
      <h1>Instructions:</h1>
      <p>1. For multiple-choice questions, select the one best answer (A, B, C, or D).</p>
      <p>2. For integer-type questions, write your numerical answer clearly.</p>
      <p>3. No calculators unless specified.</p>
      <p>4. You have 30 minutes to complete this quiz.</p>
      <p className="note">Note: Please read the instructions carefully before starting the quiz!</p>
    </div>
  );
};

export default Instroction;
