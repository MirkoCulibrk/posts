import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/Signup';
import AuthApi from '../context/AuthApi';
function Routes() {
    return (
        <Switch>
            <RouteRegisteration
                path="/signin"
                component={SignIn}
            ></RouteRegisteration>
            <RouteRegisteration
                path="/signup"
                component={SignUp}
            ></RouteRegisteration>
            <RouteProtected
                path="/dashboard"
                component={Dashboard}
            ></RouteProtected>
        </Switch>
    );
}
const RouteRegisteration = ({ component: Component, ...rest }) => {
    const authApi = React.useContext(AuthApi);
    return (
        <Route
            {...rest}
            render={(props) =>
                !authApi.auth ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/dashboard"></Redirect>
                )
            }
        ></Route>
    );
};
const RouteProtected = ({ component: Component, ...rest }) => {
    const authApi = React.useContext(AuthApi);
    return (
        <Route
            {...rest}
            render={(props) =>
                authApi.auth ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/signin"></Redirect>
                )
            }
        ></Route>
    );
};

export default Routes;
