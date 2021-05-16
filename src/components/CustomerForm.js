import { Button, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import validator from 'validator'
import { asyncAddNewCustomer, asyncDeleteCustomer, asyncUpdateCustomer } from '../actions/customerActions'
import ErrorHandling from './ErrorHandling'
import '../styles/styles.css'

const CustomerForm = (props)=>{
    const {_id, name:editName, email: editEmail, mobile: editMobile, handleEdit, toggleCustNotPresent, billData} = props 
    const [name, setName] = useState(editName || '')
    const [phone, setPhone] = useState(editMobile || '')
    const [email, setEmail] = useState(editEmail || '')
    const [phoneIncorrect, setPhoneIncorrect] = useState(false)
    const [emailIncorrect, setEmailIncorrect] = useState(false)
    const [success, setSuccess]= useState(false)

    const dispatch = useDispatch()
    const customers = useSelector((state)=>{
        return state.customers
    })
    const handleSuccess = ()=>{
        setSuccess(!success)
    }
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name == 'name'){
            setName(value)
        }else if(name == 'phone'){
            setPhone(value)
            validator.isMobilePhone(value, 'en-IN') ? setPhoneIncorrect(false): setPhoneIncorrect(true)
        }else{
            setEmail(value)
            validator.isEmail(value) ? setEmailIncorrect(false) : setEmailIncorrect(true)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {
            name,
            mobile: phone,
            email
        }
        const token = localStorage.getItem('pos-token')
        console.log(data)
        if(_id){
            dispatch(asyncUpdateCustomer(data, _id, token))
            handleEdit()
        }else{
            console.log('cust form', props.history)
            if(billData && toggleCustNotPresent){
                dispatch(asyncAddNewCustomer(data, token, handleSuccess, {...billData, name:name, phone:phone}, props.history))
                toggleCustNotPresent()
            }else{
                dispatch(asyncAddNewCustomer(data, token, handleSuccess))
            }
        }
        setName('')
        setEmail('')
        setPhone('')
    }
    return(
        <form onSubmit={handleSubmit} className="form-class">
            <TextField style={{backgroundColor:'white'}}  size="small" variant="outlined" required value={name} name="name" onChange={handleChange} label="Name"/><br/>

            <TextField error={phoneIncorrect} style={{backgroundColor:'white'}} size="small" variant="outlined" required value={phone} name="phone" onChange={handleChange} label="Phone"/><br/>

            <TextField error={emailIncorrect} style={{backgroundColor:'white'}} size="small" variant="outlined" value={email} name="email" onChange={handleChange} label="Email"/><br/>
            <Button disabled={phoneIncorrect || emailIncorrect} style={{backgroundColor: 'rgb(125, 161, 209)', color:'black'}} type="submit" size="small" variant="contained" color="primary">Save</Button><br/>
            <ErrorHandling autoHideDuration={3000} vertical="bottom" horizontal="right" open={success} success={true} handleNotification={handleSuccess} msg="Customer added successfully" />
        </form>
    )
}

export default withRouter(CustomerForm)