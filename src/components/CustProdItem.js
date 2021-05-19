import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { TableRow, TableCell, Button, IconButton } from '@material-ui/core'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {asyncDeleteCustomer } from '../actions/customerActions'
import {asyncDeleteProd } from '../actions/productActions'
import EditProduct from './EditProduct'
import BillListing from './BillListing';

const CustProdItem = (props)=>{

    const {_id, name, mobile, email, price} =props
    const [editToggle, setEditToggle] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = (id)=>{
        if(price){
            dispatch(asyncDeleteProd(id, localStorage.getItem('pos-token')))
        }else{
            dispatch(asyncDeleteCustomer(id, localStorage.getItem('pos-token')))
        }
    }
    const handleEdit = ()=>{
        setEditToggle(!editToggle)
    }
    const handleView = ()=>{
        setShowToggle(!showToggle)
    }
    return(
        <TableRow>
            {price ? (
                <>
                <TableCell size="small">{name}</TableCell>
                <TableCell size="small">{price}</TableCell>
                </>
            ):(
                <>
                    <TableCell size="small">{name}</TableCell>
                    <TableCell size="small">{mobile}</TableCell>
                    <TableCell size="small">{email || '-'}</TableCell>
                    <TableCell size="small"><Button size="small" onClick={handleView}>View</Button></TableCell>
                </>
            )}
            
            <TableCell size="small">
                <IconButton size="small" onClick={handleEdit}>
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell size="small">
                <IconButton size="small" onClick={()=>{handleDelete(_id)}}>
                    <DeleteRoundedIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <EditProduct _id={_id} name={name} mobile={mobile} email={email} price={price} handleEdit={handleEdit} editToggle={editToggle}/>
            <BillListing showToggle={showToggle} handleView={handleView} id={_id} name={name} mobile={mobile} />
        </TableRow>
    )   
}

export default withRouter(CustProdItem)