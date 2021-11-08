import React, { useState } from 'react';
import Error from '../error';
import useAuth from './../../hooks/auth';
import './index.scss';

const Login = () => {
  const INITAL_DATA = {
    email: '',
    password: '',
  };

  const [tabs, setTabs] = useState('login');
  const [Data, setData] = useState(INITAL_DATA);
  const { error, handleSignUp, handleUserLogin } = useAuth();

  const selectedTab = (tab) => {
    if (tab === tabs) {
      return 'login-tabs-border';
    }
    return '';
  };

  const tabSelections = (tab) => {
    setTabs(tab);
  };

  const signUp = async () => {
    if (Data.email === '' || Data.password === '') return;
    await handleSignUp(Data);
    window.location.reload();
  };

  const handleLogin = async () => {
    if (Data.email === '' || Data.password === '') return;
    const data = await handleUserLogin(Data);
    if (data && data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    window.location.reload();
  };

  const renderButtons = (tab) => {
    if (tab === 'signup') {
      return (
        <button className='login-form-btn' onClick={signUp}>
          Sign Up
        </button>
      );
    }
    return (
      <button className='login-form-btn' onClick={handleLogin}>
        Login
      </button>
    );
  };

  const handleOnChange = (e, input) => {
    if (input === 'email') {
      let email = e.target.value;
      const data = {
        ...Data,
        email: email.toString().toLowerCase(),
      };
      setData(data);
    }
    if (input === 'password') {
      let password = e.target.value;
      const data = {
        ...Data,
        password: password,
      };
      setData(data);
    }
    return null;
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <Error error={error} retry={handleRetry} />
      <div className='login'>
        <div className='login-container'>
          <div className='login-tabs'>
            <p
              className={`login-tabs-button ${selectedTab('login')}`}
              onClick={() => tabSelections('login')}
            >
              Login
            </p>
            <p
              className={`login-tabs-button ${selectedTab('signup')}`}
              onClick={() => tabSelections('signup')}
            >
              Sign up
            </p>
          </div>
          <div className='login-form'>
            <input
              type='text'
              className='login-form-input'
              placeholder='Email Address'
              value={Data.email}
              onChange={(e) => handleOnChange(e, 'email')}
            />
            <input
              type='password'
              className='login-form-input'
              placeholder='Password'
              value={Data.password}
              autoComplete='on'
              onChange={(e) => handleOnChange(e, 'password')}
            />
            {renderButtons(tabs)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
