import React, { useState } from 'react';
import { auth, googleAuthProvider, signInWithPopup, signOut } from "../firebase/firebase";
import "../style/navbar.css";  

const Navbar = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false); 
   const [isMenuOpen, setIsMenuOpen] = useState(false);  

 
  const handleLogin = () => {
    setIsLoggedIn((prevState) => !prevState);
  };


  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const [user, setUser] = useState(null);
  
    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const user = result.user;
        setUser(user);  // Set the user to state
        console.log(user);
        alert(`Welcome ${user.displayName}!`);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setUser(null); 
      } catch (error) {
        console.error(error.message);
      }
    };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MyQuiz</h2>
      </div>
      
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/history">History</a></li>
          {isLoggedIn ? (
            <li><button onClick={handleSignOut} className="auth-btn">Logout</button></li>
          ) : (
            <>
              <li><button onClick={handleGoogleSignIn} className="auth-btn">
              Login</button></li>
            </>
          )}
        </ul>
      </div>
      
      <div className="hamburger" onClick={handleMenuToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
