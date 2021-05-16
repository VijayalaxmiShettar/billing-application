import swal from 'sweetalert'
import {setAdmin} from './adminActions'

export const unauthorizedCheck = (err, dispatch)=>{
    if(err.response?.status == 401){
        dispatch(setAdmin({auth:false}))
        localStorage.removeItem('pos-token')
        swal({text:'User not logged in', icon:'error'})
    }else{
        swal({text: err.message, icon: "error"})
    }
}