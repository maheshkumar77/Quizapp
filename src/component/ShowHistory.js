import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/history.css";



const ShowHistory = () => {
  const [history, setHistory] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
 
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        setHistory(response.data);
        setLoading(false);  
      } catch (err) {
        setError('Error fetching history');
        setLoading(false);
      }
    };

     fetch();  
    
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
            <h3>{userHistory.name}'s Attempts ({index+1 } Attempt )</h3>
            <ul>
             {userHistory.mark}/5 
             
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowHistory;
