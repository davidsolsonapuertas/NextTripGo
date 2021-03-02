import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../Context/Auth";

interface IProps {
  children: JSX.Element[];
  exact?: boolean;
  path: string;
}

function AuthRoute({ children, ...rest }: IProps) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? <Redirect to="/" /> : children)}
    />
  );
}

export default AuthRoute;
