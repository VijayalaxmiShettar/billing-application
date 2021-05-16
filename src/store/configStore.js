import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import adminReducer from '../reducers/adminReducer'
import billReducer from '../reducers/billReducer'
import customerReducer from '../reducers/customerReducer'
import productReducer from '../reducers/productReducer'

const configStore = ()=>{
    return createStore(combineReducers({
        adminDetails : adminReducer,
        products: productReducer,
        customers : customerReducer,
        bills : billReducer
    }), applyMiddleware(thunk))
}

export default configStore