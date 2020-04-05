import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

//Wrapper for Route enabling us to use some conditional logic 
//that depends on whether the user is logged in or not
//this only shows <PrivateRoute /> components if 'isAuthenticated' is true


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    //rest operator to spread all other attributes not mentioned above
    ...rest
}) => (
        //If we are authenticated render component with props
        //else redirect to "/"
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    //boolean true if authenticated or false if not
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);