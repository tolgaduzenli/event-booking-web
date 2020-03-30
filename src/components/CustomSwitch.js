import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Events from '../pages/Events';
import Bookings from '../pages/Bookings';
import AuthPage from '../pages/AuthPage';
import Logout from '../pages/Logout';
import useAuthContext from '../context/AuthContext';

export default function CustomSwitch() {
    const { isTokenValid } = useAuthContext();
    // order is important to redirect all urls to auth when token is invalid.
    return (
        <Switch>
            {isTokenValid && <Redirect from="/" to="/events" exact />}
            {isTokenValid && <Redirect from="/auth" to="/events" exact />}
            {!isTokenValid && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={Events} />
            {isTokenValid && <Route path="/bookings" component={Bookings} />}
            {isTokenValid && <Route path="/logout" component={Logout} exact />}
            {!isTokenValid && <Redirect to="/auth" exact />}
        </Switch>
    );
}