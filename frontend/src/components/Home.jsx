import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Interest Circle!</h1>
      </header>
      <main className="main-content">
        <div className="card">
          <h2>Sign Up</h2>
          <p>Join us to explore various interest circles and share your thoughts!</p>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
        <div className="card">
          <h2>Log In</h2>
          <p>Already have an account? Log in to continue!</p>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </main>
      <footer className="footer">
        <p>Interest Circle © 2024</p>
      </footer>
    </div>
  );
};

export default Home;
