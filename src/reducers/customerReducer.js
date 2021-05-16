const initialState = []

const customerReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'ADD_CUSTOMERS' : {
            return action.payload.reverse()
        }
        case 'ADD_NEW_CUSTOMER':{
            return [{...action.payload}, ...state]
        }
        case 'DELETE_CUSTOMER' :{
            const res = state.filter((customer)=>{
                return customer._id != action.payload
            })
            return res
        }
        case 'UPDATE_CUSTOMER':{
            const res = state.map((customer)=>{
                if(customer._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...customer}
                }
            })
            return res
        }
        default: return state
    }
}

export default customerReducer
