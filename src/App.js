import React, { useEffect, useState } from 'react';

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
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
