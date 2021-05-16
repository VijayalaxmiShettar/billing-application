import React from 'react'
import ProductForm from './ProductForm'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core/';
import CustomerForm from './CustomerForm';

const EditProduct = (props)=>{
    const {_id, name, price, email, mobile, handleEdit, editToggle} = props
    
    return(
        <Dialog onClose={handleEdit} open={editToggle} fullWidth={true}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent style={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center'}}>
                    {mobile ? (
                        <CustomerForm _id={_id} name={name} email={email} mobile={mobile} handleEdit={handleEdit}/>
                    ):( 
                        <ProductForm _id={_id} name={name} price={price} handleEdit={handleEdit}/>
                    )}
                    <Button onClick={handleEdit} size="small">Cancel</Button>
                </DialogContent>
            </Dialog>
    )
}

export default EditProduct