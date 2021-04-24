import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ROUTES } from "./routes";
import COMPONENTS from "./pages";
import PrivateRoute from "./private-routes";
import PublicRoute from "./public-routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          component={COMPONENTS.Register}
          path={ROUTES.REGISTER}
          exact
        />
        <PublicRoute
          // restricted
          component={COMPONENTS.Login}
          path={ROUTES.LOGIN}
          exact
        />
        <PrivateRoute component={COMPONENTS.Home} path={ROUTES.HOME} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
