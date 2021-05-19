import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { useStyles } from './customTheme'
import { getBills } from '../actions/billActions';
import {getCustomers} from '../actions/customerActions'
import BillTable from './BillTable';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core/';

const BillListing = (props)=>{
    const {id, name, mobile, showToggle, handleView} = props
    const classes = useStyles()
    const [billDetails, setBillDetails] = useState([])
    const dispatch = useDispatch()

    const bills = useSelector((state)=>{
        return state.bills
    })
    const customers = useSelector((state)=>{
        return state.customers
    })
    const products = useSelector((state)=>{
        return state.products
    })
    
    useEffect(()=>{
        if(bills.length == 0){
            dispatch(getBills(localStorage.getItem('pos-token')))
        }
    }, [])
    
    useEffect(()=>{
       if(id){
           const res = bills.filter((bill)=>{
               return bill.customer == id
           })
           const result = res.map((bill)=>{
               const updatedItems = bill.lineItems.map((item)=>{
                    const product = products.find((prod)=>{
                        return prod._id == item.product
                    })
                    return {...item, prodDetails: {...product}}
               })
               return {...bill, lineItems:[...updatedItems], custDetails:{name:name, mobile:mobile}}
           })
           setBillDetails(result)
       }else{
        const res = bills.map((bill)=>{
            const custRes = customers.find((cust)=>{
                return cust._id == bill.customer
            })
            return {...bill, custDetails:{...custRes}}
        })
        setBillDetails(res.reverse())
       }
        
    }, [bills, customers])

    return(
        <>
            {id ? 
                <Dialog open={showToggle} style={{width:"70%", margin:'auto'}} onClose={handleView} fullWidth={true}>
                    <DialogTitle>{`Purchases made by ${name}`}</DialogTitle>
                    <DialogContent>
                        <BillTable billDetails={billDetails} fromCustomerComp={true}/>
                    </DialogContent>
                </Dialog> 
                :
                <BillTable billDetails={billDetails} fromCustomerComp={false}/>
            }
        </>
    )
}

export default withRouter(BillListing)