import axios from 'axios'
import {unauthorizedCheck} from './unauthorizedCheck'

export const asyncGenerateBill = (data, token, history)=>{
    console.log('generate bill', history)
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/bills', data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(addBill(res.data))
                history.push(`/billing/${res.data._id}`, {...res.data, ...data, generated:true}) //data has more details like prod names in line items, and customer name and phone
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch)
            })
    }
}

export const getBills = (token)=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/bills', {
            headers: {
                'Authorization' : `Bearer ${token}` 
            }
        })
            .then((res)=>{
                dispatch(setBills(res.data))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch)
            })
    }
}

export const setBills = (data)=>{
    return {
        type: 'SET_BILLS',
        payload: data
    }
}

export const addBill = (data)=>{
    return {
        type:'ADD_BILL',
        payload: data
    }
}

export const asyncDeleteBill = (id, token, handleSuccess)=>{
    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/bills/${id}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                // alert('deleted successfully')
                handleSuccess()
                dispatch(deleteBill(res.data))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) //alert(err.message)
            })
    }
}

export const deleteBill = (data)=>{
    return {
        type:'DELETE_BILL',
        payload: data
    }
}
