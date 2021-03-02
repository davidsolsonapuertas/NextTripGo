import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import { client } from "../ApolloProvider";
import { IUser } from "../Interfaces/User";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export interface LoggedUser {
  username: string;
  password: string;
  token: string;
}

interface Login {
  type: typeof LOGIN;
  payload: LoggedUser;
}

interface Logout {
  type: typeof LOGOUT;
}

interface User {
  exp: number;
  iat: number;
  email: string;
  id: string;
  username: string;
}

interface State {
  user: User | null;
}

interface IAuthProvider {
  children: JSX.Element[] | JSX.Element;
}

type ActionTypes = Login | Logout;

const initialState: State = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken: User = jwtDecode(localStorage.getItem("jwtToken")!);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<IUser>({
  user: null,
  login: (userData: LoggedUser) => {},
  logout: () => {},
});

function authReducer(state: object, action: ActionTypes) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: IAuthProvider) {
  const [state, dispatch]: any = useReducer(authReducer, initialState);

  function login(userData: LoggedUser) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    client.clearStore();
    dispatch({
      type: "LOGOUT",
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
