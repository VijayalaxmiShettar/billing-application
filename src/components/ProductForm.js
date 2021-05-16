import React, {useState} from 'react'
import validator from 'validator'
import {useSelector, useDispatch} from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import {asyncAddNewProd, asyncUpdateProd} from '../actions/productActions'
import ErrorHandling from './ErrorHandling'
import '../styles/styles.css'

const ProductForm = (props)=>{
    const {_id, name:editName, price:editPrice, handleEdit} = props
    const [prod, setProd] = useState({name:editName || '', price:editPrice || ''})
    const [priceIncorrect, setPriceIncorrect] = useState(false)
    const [success, setSuccess]= useState(false)
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name == 'name'){
            setProd({...prod, name: value})
        }else{
            setProd({...prod, price: value})
            validator.isInt(value) ? setPriceIncorrect(false) : setPriceIncorrect(true)
        }
    }

    const handleSuccess = ()=>{
        setSuccess(!success)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(prod)
        const token = localStorage.getItem('pos-token')
        if(_id){
            dispatch(asyncUpdateProd(prod, _id, token))
            handleEdit()
        }else{
            dispatch(asyncAddNewProd(prod, token, handleSuccess))
        }
        setProd({name:'', price:''})
    }

    return(
        <form onSubmit={handleSubmit} className="form-class">
            <TextField style={{backgroundColor:'white'}} required variant="outlined" size="small" value={prod.name} name="name" onChange={handleChange}  label="Name"/><br/>
            <TextField error={priceIncorrect} helperText={priceIncorrect && "Enter a valid price"} style={{backgroundColor:'white'}} required variant="outlined" size="small" value={prod.price} name="price" onChange={handleChange} label="Price"/><br/>
            <br/>
            <Button disabled={priceIncorrect} style={{backgroundColor: 'rgb(125, 161, 209)', color:'black'}} type="submit" size="small" variant="contained" color="primary">Save</Button><br/>
            <ErrorHandling autoHideDuration={3000} vertical="bottom" horizontal="right" open={success} success={true} handleNotification={handleSuccess} msg="Product added successfully" />
        </form>
    )
}

export default ProductForm