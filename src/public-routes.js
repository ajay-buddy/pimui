import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from './routes';
// import { isAuthenticated } from '../auth.utils';

const isAuthenticated = true;
function PublicRoute(props) {
    const { component: Component, restricted = false, ...rest } = props;

    const render = props => {
        if (isAuthenticated && restricted) {
            return <Redirect to={ROUTES.DASHBOARD} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default PublicRoute;