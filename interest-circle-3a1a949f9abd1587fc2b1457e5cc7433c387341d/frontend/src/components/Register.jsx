
import './Register.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/users/register', data);
      if (response.data.success) {
        console.log('Registration successful',response.data.message);
      } else {
        console.log('Registration failed',response.data.message);
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
        <button className = "register-button" type="submit">Register</button>
      </form>
      <div className="background-image"></div>
    </div>
  );
};

export default Register;
