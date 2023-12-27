import React, { createContext } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (email, password) => {
  },
  logout: () => {
  }
})

export default AuthContext;