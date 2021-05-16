import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAdminDetails} from '../actions/adminActions'
import {Typography} from '@material-ui/core/';

const Account = (props)=>{
    const dispatch = useDispatch()

    const admin = useSelector((state)=>{
        return state.adminDetails
    })

    useEffect(()=>{
        dispatch(getAdminDetails(localStorage.getItem('pos-token')))
    }, [])

    return (
        <div style={{marginTop:'90px', width:'500px', height:'200px', display:'flex', flexDirection:'column', justifyContent:'center', padding:'15px', paddingBottom:'30px'}}>
                    <h2><Typography variant="h5">Account</Typography></h2>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Username : {admin.username}</Typography></h3>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Email : {admin.email}</Typography></h3>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Business name : {admin.businessName}</Typography></h3>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Address : {admin.address}</Typography></h3>
                </div>
        
    )
}

export default Account