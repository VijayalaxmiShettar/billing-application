import axios from 'axios'
import swal from 'sweetalert'
import { setAdmin } from './adminActions'
import {unauthorizedCheck} from './unauthorizedCheck'

export const getProducts = (token)=>{
    return (dispatch)=>{
        //const token = localStorage.getItem('pos-token')
        axios.get('https://dct-billing-app.herokuapp.com/api/products', {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(addProducts(res.data))
            })
            .catch((err)=>{
                //alert(err.message)
                unauthorizedCheck(err, dispatch)
            })
    }
} 
export const addProducts = (data) =>{
    return {
        type:'ADD_PRODUCTS',
        payload: data
    }
}

export const asyncAddNewProd = (data, token, handleSuccess) =>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/products', data, {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res)=>{
                if(res.data.hasOwnProperty('errors')){
                    alert(res.data.message)
                }else{
                    dispatch(addNewProd(res.data))
                    handleSuccess()
                }
            })
            .catch((err)=>{
                //alert(err.message)
                unauthorizedCheck(err, dispatch)
            })
    }
}

export const addNewProd = (data)=>{
    return {
        type:'ADD_NEW_PROD',
        payload: data
    }
}

export const asyncDeleteProd = (id, token)=>{
    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(deleteProd(id))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) //alert(err.message)
            })
    }
}

export const deleteProd = (id)=>{
    return {
        type:'DELETE_PROD',
        payload: id
    }
}

export const asyncUpdateProd = (data, id, token)=>{
    return (dispatch)=>{
        axios.put(`https://dct-billing-app.herokuapp.com/api/products/${id}`, data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                dispatch(updateProd(res.data))
            })
            .catch((err)=>{
                unauthorizedCheck(err, dispatch) //alert(err.message)
            })
    }
} 

export const updateProd = (data) =>{
    return {
        type: 'UPDATE_PROD',
        payload: data
    }
}
