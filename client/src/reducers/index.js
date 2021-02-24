import { combineReducers } from 'redux'

import authReducer from './authReducer'
import blogReducer from './blogReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    auth: authReducer,
    blog: blogReducer,
    error: errorReducer
})