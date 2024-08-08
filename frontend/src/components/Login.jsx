import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('Logging in with data:', data); 
      const response = await axios.post('http://127.0.0.1:7001/api/users/login', data);
      if (response.data.success) {
        console.log('Login successful', response.data.token);
        localStorage.setItem('username', data.username); 
        navigate('/interest-circles'); 
      } else {
        console.log('Login failed', response.data.message);
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Log In</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="text" {...register('username', { required: true })} />
          {errors.username && <span>Username is required</span>}
        </div>
        <div className="form-group2">
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <span>Password is required</span>}
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="background-image"></div>
    </div>
  );
};

export default Login;

