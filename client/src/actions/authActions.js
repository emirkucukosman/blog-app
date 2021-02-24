import {
    AUTH_INITIALISE,
    LOGIN_SUCCESS,
    LOGOUT
} from './types'
import jwtDecode from 'jwt-decode'
import blogAPI, { baseURL } from '../utils/blogAPI'
import axios from 'axios';

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
    if (accessToken) return localStorage.setItem('accessToken', accessToken);
    localStorage.removeItem("accessToken");
};

export const login = (username, password) => async (dispatch) => {

    const response = await axios.post(`${baseURL}/api/user/login`, { username, password })
    const { user, token } = response.data;

    setSession(token);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: { user }
    })
}

export const initialise = () => async (dispatch) => {

    try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
            setSession(accessToken);

            const response = await blogAPI.get('/api/user/me');
            const { user } = response.data;

            dispatch({
                type: AUTH_INITIALISE,
                payload: {
                    isAuthenticated: true,
                    user
                }
            })
        } else {
            dispatch({
                type: AUTH_INITIALISE,
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_INITIALISE,
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

}

export const logout = () => (dispatch) => {
    setSession(null);
    dispatch({
        type: LOGOUT
    })
}