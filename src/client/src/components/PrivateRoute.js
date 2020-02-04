import React from "react";
import { Route, Redirect } from "react-router-dom"
import JWT from 'jsonwebtoken'

export default PrivateRoute = ({ component: Component, token, ...rest }) => {



  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />
        }
        return <Redirect to="/" />
      }}
    />
  );
};
