import axios from 'axios'
import swal from 'sweetalert'
import { asyncGenerateBill } from './billActions'
import {setAdmin} from './adminActions'
import {unauthorizedCheck} from './unauthorizedCheck'

export const getCustomers = (token)=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/customers', {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(addCustomers(res.data))
            })
            .catch((err)=>{
                //alert(err.message)
                unauthorizedCheck(err, dispatch)
            })
    }
}

export const addCustomers = (data)=>{
    return {
        type: 'ADD_CUSTOMERS',
        payload: data
    }
}

export const asyncAddNewCustomer = (data, token, handleSuccess, billData, history, showBill) =>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/customers', data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                if(res.data.hasOwnProperty('errors')){
                    alert(res.data.message)
                }else{
                    dispatch(addNewCustomer(res.data))
                    handleSuccess()
                    if(billData){
                      
                        const finalBillData = {...billData, customer: res.data._id}
                        dispatch(asyncGenerateBill(finalBillData, token, history))
                    }
                }
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) //alert(err.message)
            })
    }
}

export const addNewCustomer = (data)=>{
    return {
        type: 'ADD_NEW_CUSTOMER',
        payload: data
    }
}

export const asyncDeleteCustomer = (id, token)=>{
    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(deleteCustomer(id))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) //alert(err.message)
            })
    }
}

export const deleteCustomer = (id)=>{
    return {
        type:'DELETE_CUSTOMER',
        payload: id
    }
}

export const asyncUpdateCustomer = (data, id, token) =>{
    return (dispatch)=>{
        axios.put(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, data, {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(updateCustomer(res.data))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) // alert(err.message)
            })
    }
}

export const updateCustomer = (data)=>{
    return {
        type:'UPDATE_CUSTOMER',
        payload: data
    }
}
