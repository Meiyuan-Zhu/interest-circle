import React, { useState } from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/users/register', data);
      if (response.data.success) {
        console.log('Registration successful', response.data.message);
        localStorage.setItem('username', data.username);
        navigate('/interest-circles'); 
      } else {
        console.log('Registration failed', response.data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
      <div className="background-image"></div>
    </div>
  );
};

export default Register;
