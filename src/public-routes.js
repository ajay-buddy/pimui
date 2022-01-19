import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { accessToken } from "./app/utils";
import { authSelector } from "./app/authSlice";

function PublicRoute(props) {
  const { component: Component, restricted = false, ...rest } = props;

  const auth = useSelector(authSelector);

  const render = (props) => {
    if (accessToken && restricted) {
      return <Redirect to={ROUTES.DASHBOARD} />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
}

export default PublicRoute;
