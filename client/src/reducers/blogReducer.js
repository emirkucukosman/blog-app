import {
    GET_BLOGS_LOADING,
    GET_BLOGS_SUCCESS,
    GET_BLOGS_FAIL
} from '../actions/types'

const initialState = {
    isBlogsLoading: false,
    blogs: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOGS_LOADING:
            return {
                ...state,
                isBlogsLoading: true
            }
        case GET_BLOGS_SUCCESS:
            return {
                ...state,
                isBlogsLoading: false,
                blogs: action.payload
            }
        case GET_BLOGS_FAIL:
            return {
                ...state,
                isBlogsLoading: false
            }
        default:
            return state;
    }
}