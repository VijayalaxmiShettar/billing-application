import axios from 'axios'

export const asyncRegister = (data, history)=>{
    
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/register', data)
            .then((res)=>{
                console.log(res.data)
                if(res.data.hasOwnProperty('errors')){
                    alert(res.data.message)
                }else{
                    history.push('/login', {from: '/register'})
                }
                
            })
            .catch((err)=>{
                console.log(err.message)
                alert(err.message)
            })
    }
}
export const asyncLoginAdmin = (data, history, handleError)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/login', data)
        .then((res)=>{
            console.log(res.data)
            if(res.data.hasOwnProperty('errors')){
                //alert(res.data.errors)
                handleError()
            }else{
                localStorage.setItem('pos-token', res.data.token)
                dispatch(setAdmin({auth: true}))
                //dispatch(getAdminDetails(res.data.token))
                history.replace('/')
            }
            
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const setAdmin = (data) =>{
    return {
        type: 'SET_ADMIN',
        payload: data
    }
}

export const getAdminDetails = (token)=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/users/account', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>{
                console.log('Admin details ----', res.data)
                dispatch(setAdmin({...res.data, auth:true}))
            })
    }
}
