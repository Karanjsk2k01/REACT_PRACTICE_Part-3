import React, { useEffect, useState } from 'react';

import AuthContext from './components/store/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let loggedInCheck = localStorage.getItem('isloggedIN');

    if (loggedInCheck === '1') {
      setIsLoggedIn(true)
    }

  }, [])

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isloggedIN', '1')
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isloggedIN');
  };

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
      }
    }>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
