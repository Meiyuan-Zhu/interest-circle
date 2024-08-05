import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/users/login', data);
      if (response.data.success) {
        console.log('Login successful', response.data.token);
      } else {
        console.log('Login failed', response.data.message);
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
          <input
            type="text"
            {...register('username', { required: true })}
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="background-image"></div>
    </div>
  );
};

export default Login;
