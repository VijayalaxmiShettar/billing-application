import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addNewCustomer, asyncDeleteCustomer, getCustomers } from '../actions/customerActions'
import CustomerForm from './CustomerForm'
import CustProdItem from './CustProdItem';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@material-ui/core';
import Heading from './Heading'
import '../styles/styles.css'
import {useStyles} from './customTheme'

/*const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }))(TableCell);*/

const Customer = (props)=>{
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const classes = useStyles() 
    const customers = useSelector((state)=>{
        return state.customers
    })
    
    useEffect(()=>{
        if(customers.length == 0){
            dispatch(getCustomers(localStorage.getItem('pos-token')))
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
    return(
        <div className="cust-prod-container">
            <div className="cust-prod-form-container" >
                <br/><Heading title="Add Customer"/><br/>
                <CustomerForm/>
            </div>
            <Paper square={true} style={{width:'60%', padding:'10px'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Heading title={`All Customers - ${customers.length}`}/>
                </div>
            <TableContainer  style={{maxHeight:'80%', overflow:'auto'}}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellStyle}>Name</TableCell>
                            <TableCell className={classes.cellStyle}>Mobile</TableCell>
                            <TableCell className={classes.cellStyle}>Email</TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer)=>{
                            return (
                                <CustProdItem key={customer._id} {...customer}/>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {customers.length == 0 && <Heading variant="h6" title="No customers found"/>}
            
            </Paper>
        </div>
    )
}

export default Customer