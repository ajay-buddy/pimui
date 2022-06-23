import React from "react";
import { Router } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "./routes";
import COMPONENTS from "./pages";
import PrivateRoute from "./private-routes";
import PublicRoute from "./public-routes";
import HeaderAppBar from "./components/appbar";
import history from "./history";
import styled from "styled-components";
import Loading from "react-fullscreen-loading";
import { actionLoading } from "./app/actionSlice";
import { applicationLoading } from "./app/applicationSlice";
import { authLoading } from "./app/authSlice";
import { companyLoading } from "./app/companySlice";
import { dashboardLoading } from "./app/dashboardSlice";
import { jobLoading } from "./app/jobSlice";
import { profileLoading } from "./app/profileSlice";
import { spocLoading } from "./app/spocSlice";
import { tagLoading } from "./app/tagSlice";
const PageWrapper = styled.div`
  padding: 20px;
`;

function App() {
  const actionLoadingState = useSelector(actionLoading);
  const applicationLoadingState = useSelector(applicationLoading);
  const authLoadingState = useSelector(authLoading);
  const companyLoadingState = useSelector(companyLoading);
  const dashboardLoadingState = useSelector(dashboardLoading);
  const jobLoadingState = useSelector(jobLoading);
  const profileLoadingState = useSelector(profileLoading);
  const spocLoadingState = useSelector(spocLoading);
  const tagLoadingState = useSelector(tagLoading);
// console.log(actionLoadingState ,
//   applicationLoadingState ,
//   authLoadingState ,
//   companyLoadingState ,
//   dashboardLoadingState ,
//   jobLoadingState ,
//   profileLoadingState ,
//   spocLoadingState ,
//   tagLoadingState)
  return (
    <Router history={history}>
      <>
        <Loading
          loading={
            actionLoadingState ||
            applicationLoadingState ||
            authLoadingState ||
            // companyLoadingState ||
            dashboardLoadingState ||
            jobLoadingState ||
            profileLoadingState ||
            spocLoadingState
          }
          background="white"
          loaderColor="#3498db"
        />
        <HeaderAppBar />
        <PageWrapper>
          <Switch>
            {/* <PublicRoute
              component={COMPONENTS.REGISTER}
              path={ROUTES.REGISTER}
              exact
            /> */}
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
