import {
    AUTH_INITIALISE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

const initialState = {
    isInitialised: false,
    isAuthenticated: false,
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INITIALISE:
            return {
                ...state,
                isInitialised: true,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}