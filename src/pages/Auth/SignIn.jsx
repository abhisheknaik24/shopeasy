import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { postUser } from '../../app/slices/userSlice';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_API}/api/users/signIn`,
      user
    );
    if (res.data.success) {
      dispatch(postUser(res.data.data.user));
      navigate('/');
    }
  };

  return (
    <div className='content'>
      <div className='sign-in-auth-section'>
        <div className='sign-in-card'>
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className='auth-control-input'>
              <label className='auth-label'>Email Id:</label>
              <input
                type='email'
                className='auth-input'
                name='email'
                placeholder='Email'
                value={user.email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='auth-control-input'>
              <label className='auth-label'>Password:</label>
              <input
                type='password'
                className='auth-input'
                name='password'
                placeholder='Password'
                value={user.password}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='auth-control-btn'>
              <button type='submit' className='auth-btn'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
