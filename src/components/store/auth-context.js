import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (email, password) => {
  },
  logout: () => {
  }
})


export const AuthProvider = (props) => {

  const [isloggedIn, setIsLoggedIn] = useState(false);

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
    <AuthContext.Provider value={{
      isLoggedIn: isloggedIn,
      login: loginHandler,
      logout: logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>

  )

}


export default AuthContext;