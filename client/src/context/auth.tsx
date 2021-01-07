import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { client } from '../ApolloProvider';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface User {
  username: string;
  password: string;
  token: string;
}

interface Login {
  type: typeof LOGIN;
  payload: User;
}

interface Logout {
  type: typeof LOGOUT;
}

type ActionTypes = Login | Logout;

const initialState = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken: any = jwtDecode(localStorage.getItem('jwtToken')!);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: User) => {},
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
  const [state, dispatch]: any = useReducer(authReducer, initialState);

  function login(userData: User) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    client.clearStore();
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
