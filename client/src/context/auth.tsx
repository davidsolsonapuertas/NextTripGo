import React, { useReducer, createContext } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface User {
  username: string;
  password: string;
}

interface Login {
  type: typeof LOGIN;
  payload: User;
}

interface Logout {
  type: typeof LOGOUT;
}

type ActionTypes = Login | Logout;

const AuthContext = createContext({
  user: null,
  login: (data: User) => {},
  logout: () => {},
});

function authReducer(state: object, action: ActionTypes) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch]: any = useReducer(authReducer, { user: null });

  function login(userData: User) {
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
