import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/history.css";

const ShowHistory = () => {
  const [history, setHistory] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        setHistory(response.data);
        setLoading(false);  
      } catch (err) {
        setError('Error fetching history');
        setLoading(false);
      }
    };

    fetchHistory();  
  }, []);

 
  if (loading) {
    return <div className="loading">Loading history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="history-container">
      <h1>User Attempt History</h1>
      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        history.map((userHistory, index) => (
          <div key={index} className="history-item">
            <h3>{userHistory.name}'s Attempts</h3>
            <ul>
              {userHistory.attempts.map((attempt, i) => (
                <li key={i} className="attempt">
                  <p><strong>Question:</strong> {attempt.question}</p>
                  <p><strong>Your Answer:</strong> {attempt.answer}</p>
                  <p><strong>Correct Answer:</strong> {attempt.correctAnswer}</p>
                  <p><strong>Attempt Time:</strong> {new Date(attempt.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowHistory;
