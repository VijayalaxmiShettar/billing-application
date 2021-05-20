import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from '../actions/productActions'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination} from '@material-ui/core';
import '../styles/styles.css'
import ProductForm from './ProductForm'
import Heading from './Heading';
import CustProdItem from './CustProdItem';
import {useStyles} from './customTheme'

const Product = (props)=>{
    const [searchName, setSearchName] = useState('')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const dispatch= useDispatch()
    const classes = useStyles()

    const products = useSelector((state)=>{
        return state.products
    })
    
    const [prodResults, setProdResults] = useState(products)

    useEffect(()=>{ 
        if(products.length == 0){
            dispatch(getProducts(localStorage.getItem('pos-token')))
        }
    }, [])

    useEffect(()=>{
        const res = products.filter((prod)=>{
            return prod.name.toLowerCase().includes(searchName.toLowerCase())
        })
        setProdResults(res)
    }, [searchName, products])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return(
        <div className="cust-prod-container">
            <div className="cust-prod-form-container">
                <br/><Heading title="Add Product"/><br/>
                <ProductForm/><br/>
            </div>
            <Paper square={true} style={{width:'60%', padding:'10px'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Heading title={`All Products - ${products.length}`}/>
                    <TextField margin="dense" type="text" placeholder="Search with Product name" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}}></TextField>
                </div>
                
                <TableContainer style={{maxHeight:'80%', overflow:'auto'}}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellStyle}>Name</TableCell>
                                <TableCell className={classes.cellStyle}>Price</TableCell>
                                <TableCell className={classes.cellStyle}></TableCell>
                                <TableCell className={classes.cellStyle}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prodResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product)=>{
                                return (
                                    <CustProdItem key={product._id} {...product}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {prodResults.length > 10 && 
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={prodResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
            
            {products.length == 0 && <div className="noItemsClass"><Heading variant="h5" title="No products found, add your first product"/></div>}
            
            </Paper>
        </div>
    )
}

export default Product