import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuestGuard = ({ auth, children }) => {

    if (auth.isAuthenticated) {
        return <Redirect to="/blogs/browse" />
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
    mapStateToProps, null
)(GuestGuard);