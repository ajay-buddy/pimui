import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ROUTES } from "./routes";
import COMPONENTS from "./pages";
import PrivateRoute from "./private-routes";
import PublicRoute from "./public-routes";
import HeaderAppBar from "./components/appbar";
function App(props) {
  console.log("********", props);
  return (
    <BrowserRouter>
      <HeaderAppBar />
      <Switch>
        <PublicRoute
          component={COMPONENTS.Register}
          path={ROUTES.REGISTER}
          exact
        />
        <PublicRoute
          restricted
          component={COMPONENTS.Login}
          path={ROUTES.LOGIN}
          exact
        />
        <PrivateRoute component={COMPONENTS.Home} path={ROUTES.HOME} exact />
        <PrivateRoute
          component={COMPONENTS.Products}
          path={ROUTES.PRODUCTS}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Catagory}
          path={ROUTES.CATAGORY}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Customer}
          path={ROUTES.CUSTOMER}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Invoice}
          path={ROUTES.INVOICE}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Orders}
          path={ROUTES.ORDERS}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Purchase}
          path={ROUTES.PURCHASE}
          exact
        />
        <PrivateRoute
          component={COMPONENTS.Vendors}
          path={ROUTES.VENDORS}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
