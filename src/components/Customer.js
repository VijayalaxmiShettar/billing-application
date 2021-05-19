import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addNewCustomer, asyncDeleteCustomer, getCustomers } from '../actions/customerActions'
import CustomerForm from './CustomerForm'
import CustProdItem from './CustProdItem';
import {Table, TableBody, TableCell, TextField, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@material-ui/core';
import Heading from './Heading'
import '../styles/styles.css'
import {useStyles} from './customTheme'

const Customer = (props)=>{
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchName, setSearchName] = useState('')
    const classes = useStyles() 

    const customers = useSelector((state)=>{
        return state.customers
    })
    const [custResults, setCustResults] = useState(customers)

    useEffect(()=>{
        if(customers.length == 0){
            dispatch(getCustomers(localStorage.getItem('pos-token')))
        }
    }, [])

    useEffect(()=>{
        const res = customers.filter((cust)=>{
            return cust.name.toLowerCase().includes(searchName.toLowerCase()) || cust.mobile.includes(searchName)
        })
        setCustResults(res)
    }, [searchName, customers])

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
                    <TextField margin="dense" type="text" placeholder="Search name or phone" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}}></TextField>
                </div>
            <TableContainer  style={{maxHeight:'80%', overflow:'auto'}}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cellStyle}>Name</TableCell>
                            <TableCell className={classes.cellStyle}>Mobile</TableCell>
                            <TableCell className={classes.cellStyle}>Email</TableCell>
                            <TableCell className={classes.cellStyle}>Purchase history</TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                            <TableCell className={classes.cellStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {custResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer)=>{
                            return (
                                <CustProdItem key={customer._id} {...customer}/>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {custResults.length > 10 && 
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={custResults.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
            {customers.length == 0 && <div className="noItemsClass"><Heading variant="h5" title="No customers found"/></div>}
            
            </Paper>
        </div>
    )
}

export default Customer