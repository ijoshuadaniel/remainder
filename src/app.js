import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Dashboard from './components/dashboard';
import Login from './components/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  if (isLoading) {
    return (
      <div className='loader'>
        <PuffLoader size='150' color='lightblue' />
      </div>
    );
  }

  return (
    <>
      {user && (
        <div>
          <Dashboard user={user} />
        </div>
      )}
      {!user && (
        <div className='login-wrapper'>
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
