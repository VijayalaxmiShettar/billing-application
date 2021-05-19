import React, {useState, useEffect} from 'react'
import { useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { useStyles } from './customTheme'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { asyncDeleteBill, getBills } from '../actions/billActions';
import ErrorHandling from './ErrorHandling';
import Heading from './Heading'
import '../styles/styles.css'

const BillTable = (props)=>{
    const {billDetails, fromCustomerComp} = props
    const classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleDelete = (id) =>{
        dispatch(asyncDeleteBill(id, localStorage.getItem('pos-token'), handleSuccess))
    }
    const handleSuccess = ()=>{
        setSuccess(!success)
    } 
    const handleShow = (id, lineItems, date, name, total, phone)=>{
        props.history.push(`/billing/${id}`, {lineItems, date, name, total, phone})
    }
    return(
        <Paper style={{ height: fromCustomerComp ? '30%' : '500px', minHeight:'100px', width:fromCustomerComp || '600px',padding:'10px'}}>
        {billDetails.length == 0 
            ? 
            <div className="noItemsClass">
                <Heading variant="h5" title="No bills found"/>
            </div> 
            : 
            <TableContainer  style={{maxHeight:'90%', overflow:'auto'}}>
                <Table stickyHeader size="small" style={{width:'600px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellStyle}>Date</TableCell>
                            <TableCell className={classes.cellStyle}>Customer</TableCell>
                            <TableCell className={classes.cellStyle}>Amount</TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bill)=>{
                            return (
                                <TableRow key={bill._id}>
                                    <TableCell size="small">{new Date(bill.date).toLocaleString()}</TableCell>
                                    
                                    <TableCell size="small">{bill.custDetails.name}</TableCell>
                                    <TableCell size="small"> &#8377; {bill.total.toLocaleString()}</TableCell>
                                    {fromCustomerComp && <TableCell size="small"><Button size="small" onClick={()=>{handleShow(bill._id, bill.lineItems, new Date(bill.date), bill.custDetails.name, bill.total, bill.custDetails.mobile)}}>Show</Button></TableCell>}
                                    <TableCell>
                                        <IconButton onClick={()=>{handleDelete(bill._id)}} size="small">
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>}

            {billDetails.length > 10 && 
                <TablePagination
                    rowsPerPageOptions={[10, 30, 50]}
                    count={billDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
            
            <ErrorHandling open={success} success={true} handleNotification={handleSuccess} autoHideDuration={3000} msg ="Bill deleted successfully"/>
        </Paper>
        
    )
}

export default withRouter(BillTable)