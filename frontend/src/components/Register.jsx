import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('Submitting data:', data); 
      const response = await axios.post('http://127.0.0.1:7001/api/users/register', data);
      if (response.data.success) {
        console.log('Registration successful', response.data.message);
        localStorage.setItem('username', data.username); 
        navigate('/interest-circles'); 
      } else {
        console.log('Registration failed', response.data.message);
        alert ('Username already exists');
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
            {...register('username', { required: true })}
          />
          {errors.username && <span>Username is required</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <span>Password is required</span>}
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
      <div className="background-image"></div>
    </div>
  );
};

export default Register;
