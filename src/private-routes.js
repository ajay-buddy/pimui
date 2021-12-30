import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTES } from "./routes";
// import { isAuthenticated } from '../auth.utils';
const isAuthenticated = true;

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  const render = (props) => {
    if (!localStorage.getItem("accessToken")) {
      return <Redirect to={ROUTES.LOGIN} />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
}

export default PrivateRoute;
