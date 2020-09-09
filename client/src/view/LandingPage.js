import React, { Fragment } from 'react'
import Register from '../component/Register'
import Login from '../component/Login'

const LandingPage = props => {
    return (
        <Fragment>
            <p>Landing Page</p>
            <br />
            <h1>Registration</h1>
            <Register /> 
            <br />
            <h1>Login</h1>
            <Login />
        </Fragment>
    )
}

export default LandingPage