import {
    GET_ERRORS,
    CLEAR_ERRORS
} from '../actions/types'

const initialState = {
    message: null,
    id: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                message: action.payload.message,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
                id: null
            }
        default:
            return state
    }
}