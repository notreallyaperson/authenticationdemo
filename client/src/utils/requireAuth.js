import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { tokenConfig } from './tokenConfig'

import NavBar from './NavBar'

const requireAuth = (AuthComponent,state) => {
    const Authenticate = props => {
        const [authenticated, setAuthenticated] = useState(false)
        const [invalidToken, setInvalidToken] = useState(false)
        const [userDetails, setUserDetails] = useState(null)

        useEffect(() => {
            auth()
        },[authenticated])

        const auth = async () => {
            await axios.get('/api/auth', tokenConfig())
            .then(res => {
                setAuthenticated(true)
                setUserDetails(res.data)
            })
            .catch(err => {
                localStorage.clear()
                setInvalidToken(true)
                setUserDetails(null)
            })
        }
        if(state){
            return (
                <Fragment>
                    <NavBar />
                   <AuthComponent/>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <NavBar />
                {authenticated?<AuthComponent userDetails={userDetails}/>:invalidToken&&<p>Requires Login</p>}
            </Fragment>
        )
    }
    return Authenticate
}

export default requireAuth