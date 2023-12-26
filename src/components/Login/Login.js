import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailHandler = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isvalid: action.value.includes('@')
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isvalid: state.value.includes('@')
    }
  }

  return ({
    value: '',
    isvalid: false
  })
}

const passwordHandler = (state, action) => {

  if (action.type === 'USER_INPUT_PASS') {
    return {
      value: action.value,
      isvalid: action.value.trim().length > 6
    }
  }

  if (action.type === 'INPUT_PASS_BLUR') {
    return {
      value: state.value,
      isvalid: state.value.trim().length > 6
    }
  }
  return {
    value: '',
    isvalid: false
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailHandler, {
    value: '',
    isvalid: null
  })

  const [passwordState, dispatchPasswordState] = useReducer(passwordHandler, {
    value: '',
    isvalid: null
  })

  // useEffect(() => {
  //   let formHandler = setTimeout(() => {
  //     console.log('Validity Checking Running!!');

  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );

  //   }, 5000);


  //   return () => {
  //     console.log('CleanUP!!');
  //     clearTimeout(formHandler)
  //   }
  // }, [enteredEmail, enteredPassword])


  const emailChangeHandler = (event) => {

    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });

    setFormIsValid(
      emailState.isvalid && passwordState.isvalid
    );
  };

  const passwordChangeHandler = (event) => {

    dispatchPasswordState({ type: 'USER_INPUT_PASS', value: event.target.value });

    setFormIsValid(
      emailState.isvalid && passwordState.isvalid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'INPUT_PASS_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isvalid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            autoComplete='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isvalid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete='new-password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
