import React from 'react'
import ProductForm from './ProductForm'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core/';
import CustomerForm from './CustomerForm';

const AddCustomerDialog = (props)=>{
    const {mobile, custNotPresent, billData, toggleCustNotPresent} = props

    return(
        <Dialog open={custNotPresent} fullWidth={true}>
                <DialogTitle>Customer not found, please add the customer details</DialogTitle>
                <DialogContent>
                    <CustomerForm mobile={mobile} billData={billData} toggleCustNotPresent={toggleCustNotPresent}/> 
                </DialogContent>
            </Dialog>
    )
}

export default AddCustomerDialog