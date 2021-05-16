const initialState = []

const billReducer = (state= initialState, action)=>{
    switch(action.type){
        case 'SET_BILLS' : return action.payload
        case 'ADD_BILL' : return [...state, {...action.payload}]
        case 'DELETE_BILL' : {
            const res = state.filter((bill)=>{
                return bill._id != action.payload._id
            })
            return res
        }
        default: return state
    }
}

export default billReducer