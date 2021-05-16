import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useStyles } from './customTheme'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { asyncDeleteBill, getBills } from '../actions/billActions';
import ErrorHandling from './ErrorHandling';
import Heading from './Heading'
const BillListing = (props)=>{
    const classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [billDetails, setBillDetails] = useState([])
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    const bills = useSelector((state)=>{
        return state.bills
    })
    const customers = useSelector((state)=>{
        return state.customers
    })
    useEffect(()=>{
        if(bills.length == 0){
            dispatch(getBills(localStorage.getItem('pos-token')))
        }
    }, [])
    useEffect(()=>{
        const res = bills.map((bill)=>{
            const custRes = customers.find((cust)=>{
                return cust._id == bill.customer
            })
            return {...bill, custDetails:{...custRes}}
        })
        setBillDetails(res.reverse())
    }, [bills])

    const handleDelete = (id) =>{
        dispatch(asyncDeleteBill(id, localStorage.getItem('pos-token'), handleSuccess))
    }
    const handleSuccess = ()=>{
        setSuccess(!success)
    } 
    return(
        <Paper style={{height:'500px', padding:'10px'}}>
        <TableContainer  style={{maxHeight:'90%', overflow:'auto'}}>
                <Table stickyHeader size="small" style={{width:'600px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellStyle}>Date</TableCell>
                            <TableCell className={classes.cellStyle}>Customer</TableCell>
                            <TableCell className={classes.cellStyle}>Amount</TableCell>
                            <TableCell className={classes.cellStyle}>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bill)=>{
                            return (
                                <TableRow key={bill._id}>
                                    <TableCell size="small">{new Date(bill.date).toLocaleString()}</TableCell>
                                    
                                    <TableCell size="small">{bill.custDetails.name}</TableCell>
                                    <TableCell size="small"> &#8377; {bill.total.toLocaleString()}</TableCell>
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
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 30, 50]}
                count={bills.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {bills.length == 0 && <Heading variant="h6" title="No bills generated yet"/>}
            <ErrorHandling open={success} success={true} handleNotification={handleSuccess} autoHideDuration={3000} msg ="Bill deleted successfully"/>
        </Paper>
    )
}

export default BillListing