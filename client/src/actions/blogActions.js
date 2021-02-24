import {
    GET_BLOGS_LOADING,
    GET_BLOGS_SUCCESS,
    GET_BLOGS_FAIL
} from './types'
import { returnErrors } from '../actions/errorActions'
import blogAPI from '../utils/blogAPI'

export const getBlogs = () => async (dispatch) => {

    dispatch({ type: GET_BLOGS_LOADING })

    blogAPI.get('/api/blog')
        .then((res) => {
            dispatch({
                type: GET_BLOGS_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({ type: GET_BLOGS_FAIL })
            dispatch(returnErrors(err, GET_BLOGS_FAIL))
        })

}