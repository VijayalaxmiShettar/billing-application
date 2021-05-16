import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { asyncGenerateBill, getBills } from '../actions/billActions'
import { asyncAddNewCustomer, getCustomers } from '../actions/customerActions'
import {getAdminDetails} from '../actions/adminActions'
import LineItem from './LineItem'
import AddCustomerDialog from './AddCustomerDialog'
import {Table, TableBody, TableCell, TableRow, TableHead, Button, TextField, Grid, Divider} from '@material-ui/core/';
import Heading from './Heading'
import { getProducts } from '../actions/productActions'
import ErrorHandling from './ErrorHandling'
import validator from 'validator'
import BillListing from './BillListing'

const BillingContainer = (props)=>{
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(false)
    const [custNotPresent, setNotPresent] = useState(false)
    const [items, setItems] = useState([{id:Number(new Date()), prodName:'', product:'', quantity:1, price:''}])
    const [billInfo, setBillInfo] = useState({})
    const [options, setOptions] = useState([])
    const [phoneIncorrect, setPhoneIncorrect] = useState(false)
    const dispatch = useDispatch()
    
    const customers = useSelector((state)=>{
        return state.customers
    })
    const products = useSelector((state)=>{
        return state.products
    })
    const handleError = () =>{
        setError(!error)
    }
    useEffect(()=>{
        const token = localStorage.getItem('pos-token')
        dispatch(getAdminDetails(token))
        if(customers.length == 0){
            dispatch(getCustomers(token))
        }else if(products.length ==0){
            //console.log('zerooo')
            dispatch(getProducts(token))
        }
    }, [])

    useEffect(()=>{
        const optionsArr = products.map((prod)=>{
            return {value: prod._id, label: prod.name}
        })
        setOptions(optionsArr)
    }, [products])
    const handleItemChange = (id, data)=>{
        const res = items.map((item)=>{
            if(item.id === id){
                return {...item, ...data}
            }else{
                return {...item}
            }
        })
        setItems(res)
    }

    const addItem = ()=>{
        const res = [...items, {id: Number(new Date()), prodName:'', product:'', quantity:1, price:''}]
        setItems(res)
    }
    const toggleCustNotPresent = ()=>{
        setNotPresent(!custNotPresent)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('pos-token')
        const itemWithNoProd = items.some((item)=>{
            return item.product == ''
        })
        if(itemWithNoProd){
            handleError()
        }else{
            const res = customers.find((customer)=>{
                return customer.mobile === phone
            })
            if(res){
                const data = {
                    date: new Date(),
                    customer: res._id,
                    lineItems: items,
                    name : res.name,
                    phone
                }
                console.log('++++++++++++++', props)
                console.log('+++++++++++++', props.props)
                dispatch(asyncGenerateBill(data, token, props.history)) //console.log('Data sent for bill creation - Existing customer', data)
            }else{
                toggleCustNotPresent()
                const billData = {
                    date: new Date(),
                    lineItems: items,
                }
                setBillInfo(billData) //dispatch(asyncAddNewCustomer(data, token, billData, showBill))
            }
        }
        
    }
    
    const handleChange = (e)=>{
        setPhone(e.target.value)
        validator.isMobilePhone(e.target.value, 'en-IN') ? setPhoneIncorrect(false): setPhoneIncorrect(true)
    }
    const handleRemoveItem = (id)=>{
        const itemsCopy = items.filter((item)=>{
            return item.id != id
        })
        setItems(itemsCopy)
    }
    return(
            <div style={{marginTop:'60px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{margin: '10px', width:'50%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Heading title="New Invoice"/><br/>
                    <form style={{height:'100%', width:'100%'}} onSubmit={handleSubmit}>
                    <TextField style={{width:'60%', backgroundColor:'white'}} variant="outlined" size="small" required value={phone} name="phone" onChange={handleChange} label="Customer phone" error={phoneIncorrect}/>

                    <hr/>
                    <TextField variant="outlined" size="small" disabled={true} value={new Date().toDateString()}/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Item</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Rate</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item)=>{
                                return <LineItem key={item.id} {...item} handleRemoveItem={handleRemoveItem} handleItemChange={handleItemChange} options={options}/>
                            })}
                        </TableBody>
                    </Table><br/>
                    <Button size="small" variant="outlined" onClick={addItem}>Add another item</Button><hr/>
                    <Button type="submit" size="small" variant="contained" color="primary" >Generate</Button>
                    </form>
                    {custNotPresent && <AddCustomerDialog mobile={phone} custNotPresent={custNotPresent} toggleCustNotPresent={toggleCustNotPresent} billData={billInfo}/>}
                    <ErrorHandling open={error} success={false} handleNotification={handleError} msg ="Product details missing"/>
                </div>
                <Divider orientation="vertical" flexItem style={{height:'500px', color:'black', margin:'5px'}}/>
                <div>
                <Heading title="All bills"/>
                <BillListing/>
                </div>
            </div>
        )
}

export default withRouter(BillingContainer)