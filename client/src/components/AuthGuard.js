import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { initialise } from '../actions/authActions'
import SplashScreen from '../components/SplashScreen'

const AuthGuard = ({ auth, initialise, children }) => {

    useEffect(() => {
        initialise();
    }, [])

    if (!auth.isAuthenticated) {
        return <Redirect to="/" />
    }

    if (!auth.isInitialised) {
        return <SplashScreen />
    }

    return (
        <>
            {children}
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, { initialise }
)(AuthGuard);