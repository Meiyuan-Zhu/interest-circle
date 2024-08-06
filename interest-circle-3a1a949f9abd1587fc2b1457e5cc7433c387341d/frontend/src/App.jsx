import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import InterestCircles from './components/InterestCircles'; 
import CirclePage from './components/CirclePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interest-circles" element={<InterestCircles />} /> 
        <Route path="/circle/:circleId" element={<CirclePage />} />
      </Routes>
    </Router>
  );
};

export default App;


