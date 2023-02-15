import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    code: '',
  });

  const [code, setCode] = useState(0);

  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleVerifyEmail = async (e) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_API}/api/users/validateEmail`,
      user
    );
    if (res.data.success) {
      setCode(res.data.data.code);
    } else {
      setCode(0);
    }
  };

  const handleVerifyCode = async (e) => {
    if (parseInt(code) === parseInt(user.code)) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_API}/api/users/signUp`,
      user
    );
    if (res.data.success) {
      navigate('/signin');
    }
  };

  return (
    <div className='content'>
      <div className='sign-up-auth-section'>
        <div className='sign-up-card'>
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className='auth-control-input'>
              <label className='auth-label'>Email Id:</label>
              <input
                type='email'
                className='auth-input'
                name='email'
                placeholder='Email Id'
                value={user.email}
                onChange={(e) => handleInputChange(e)}
                disabled={isVerified}
              />
            </div>
            {code === 0 && (
              <div className='auth-control-btn'>
                <button
                  type='button'
                  className='auth-btn'
                  onClick={(e) => handleVerifyEmail(e)}
                >
                  Verify Email
                </button>
              </div>
            )}
            {code !== 0 && !isVerified && (
              <>
                <div className='auth-control-input'>
                  <label className='auth-label'>OTP:</label>
                  <input
                    type='number'
                    className='auth-input'
                    name='code'
                    placeholder='OTP'
                    value={user.code}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className='auth-control-btn'>
                  <button
                    type='button'
                    className='auth-btn'
                    onClick={(e) => handleVerifyCode(e)}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}
            {isVerified && (
              <>
                <div className='auth-control-input'>
                  <label className='auth-label'>First Name:</label>
                  <input
                    type='text'
                    className='auth-input'
                    name='firstName'
                    placeholder='First Name'
                    value={user.firstName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className='auth-control-input'>
                  <label className='auth-label'>Last Name:</label>
                  <input
                    type='text'
                    className='auth-input'
                    name='lastName'
                    placeholder='Last Name'
                    value={user.lastName}
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
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
