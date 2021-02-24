import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './types'

export const returnErrors = (message, id) => {
    return {
        type: GET_ERRORS,
        payload: { message, id }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}