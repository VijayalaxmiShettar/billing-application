const initialState = {auth: Boolean(localStorage.getItem('pos-token'))}

const adminReducer = (state= initialState, action)=>{
    switch(action.type){
        case 'SET_ADMIN' : {
            return action.payload
        }
        default :{
            return state
        }
    }
}

export default adminReducer