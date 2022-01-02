import React from "react";
import { Router } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { ROUTES } from "./routes";
import COMPONENTS from "./pages";
import PrivateRoute from "./private-routes";
import PublicRoute from "./public-routes";
import HeaderAppBar from "./components/appbar";
import history from "./history";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <Router history={history}>
      <>
        <HeaderAppBar />
        <PageWrapper>
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
            <PrivateRoute
              component={COMPONENTS.Home}
              path={ROUTES.HOME}
              exact
            />
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
            <PrivateRoute
              component={COMPONENTS.Profile}
              path={ROUTES.PROFILE}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.Profile}
              path={ROUTES.CANDIDATESPROFILE}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.Candidates}
              path={ROUTES.CANDIDATES}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.Admins}
              path={ROUTES.ADMINS}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.Jobs}
              path={ROUTES.JOBS}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.Applications}
              path={ROUTES.APPLICATIONS}
              exact
            />
          </Switch>
        </PageWrapper>
      </>
    </Router>
  );
}

export default App;
