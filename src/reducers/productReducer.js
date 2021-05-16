const initialState = []

const productReducer = (state= initialState, action)=>{
    switch(action.type){
        case 'ADD_PRODUCTS' :{
            return action.payload.reverse()
        }
        case 'ADD_NEW_PROD' : {
            return [{...action.payload}, ...state]
        }
        case 'DELETE_PROD' :{
            const res = state.filter((prod)=>{
                return prod._id != action.payload
            })
            return res
        }
        case 'UPDATE_PROD' :{
            const res = state.map((prod)=>{
                if(prod._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...prod}
                }
            })

            return res
        }
        default: return state;
    }
}
export default productReducer