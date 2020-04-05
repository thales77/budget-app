import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//Wrapper for Route enabling us to use some conditional logic 
//that depends on whether the user is logged in or not
//this prevents users from navigating to <PublicRoute /> components if 'isAuthenticated' is true
//basically preventing logged-in users from going back to loggin page
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    //rest operator to spread all other attributes not mentioned above
    ...rest
}) => (
        //If we are authenticated redirect to "/dashboard"
        //else render component (loginPage)
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to="/dashboard" />
            ) : (
                <Component {...props} />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    //boolean true if authenticated or false if not
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);