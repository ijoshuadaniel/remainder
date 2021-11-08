import { useState } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

const useAuth = () => {
  const [error, setError] = useState({ error: false, message: '' });
  const [loginData, setLoginData] = useState(null);
  const [signUpData, setSignUpData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUrl = 'http://localhost:150/login';
  const signUpUrl = 'http://localhost:150/signup';

  const handleUserLogin = async (user) => {
    setLoading(true);
    try {
      const response = await axios.post(loginUrl, {
        body: user,
      });
      setLoading(false);
      if (response.data.error) {
        return setError(response.data);
      }
      setLoginData(response.data);
      return response.data;
    } catch (err) {
      setError({ error: true, message: err.message });
    }
  };

  const handleSignUp = async (user) => {
    setLoading(true);
    const data = {
      userid: v4(),
      ...user,
    };
    try {
      const response = await axios.post(signUpUrl, {
        body: data,
      });
      setLoading(false);
      if (response.data.error) {
        return setError(response.data);
      }
      setSignUpData(response.data);
      return response.data;
    } catch (err) {
      setError({ error: true, message: err.message });
    }
  };

  return {
    loading,
    error,
    loginData,
    signUpData,
    handleSignUp,
    handleUserLogin,
  };
};

export default useAuth;
