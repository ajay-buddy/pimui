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
              component={COMPONENTS.REGISTER}
              path={ROUTES.REGISTER}
              exact
            />
            <PublicRoute
              restricted
              component={COMPONENTS.LOGIN}
              path={ROUTES.LOGIN}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.HOME}
              path={ROUTES.HOME}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.CANDIDATES}
              path={ROUTES.CANDIDATES}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.ADMIN}
              path={ROUTES.ADMIN}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.SPOC}
              path={ROUTES.SPOCS}
              exact
            />
            <PrivateRoute
              component={COMPONENTS.APPLICATION}
              path={ROUTES.APPLICATIONS}
              exact
            />
            <PrivateRoute component={COMPONENTS.JOB} path={ROUTES.JOB} exact />
          </Switch>
        </PageWrapper>
      </>
    </Router>
  );
}

export default App;
