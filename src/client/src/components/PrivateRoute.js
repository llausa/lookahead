import React from "react";
import { Route, Redirect } from "react-router-dom"
import JWT from 'jsonwebtoken'
import Cookies from 'js-cookie'


export default function PrivateRoute(props) {
  
  const verifyToken = (cookieToken) => {

    let authToken = Cookies.get(cookieToken)

    if (authToken) {

    let decoded = JWT.decode(authToken)
    console.log('decoded',decoded)

      if (decoded._id) {
        return true
      } else {
        Cookies.remove("authToken")
        return false
      }

    } else {
      Cookies.remove("authToken")
      return false
    }

  }

  return (

    verifyToken("authToken") ? (
      props.reverse ? (
        <>
          {props.redirect("/projects")}
        </>
      ) : (
        <Route {...props} render={ innerProps => <props.component {...innerProps} />} />
      )
    ) : (
      props.reverse ? (
          <Route {...props} render={ innerProps => <props.component {...innerProps} />} />
      ) : (
        <>
          {props.redirect("/login")}
        </>
      )
    )
  )
}


