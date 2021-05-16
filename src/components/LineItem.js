import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Select from 'react-select'
import { getProducts } from '../actions/productActions'
import {IconButton, TableCell, TableRow, Grid, TextField, InputAdornment} from '@material-ui/core/';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    number: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
      },
  }));

const LineItem = (props)=>{
    const {id, quantity, handleItemChange, options, price, handleRemoveItem} = props
    const dispatch = useDispatch()
    const [op, setOp] = useState({}) //Used for React Select
    const [qty, setQty] = useState(quantity)
    const classes = useStyles()
    const products = useSelector((state)=>{
        return state.products
    })
    
    useEffect(()=>{
        if(products.length == 0){
            dispatch(getProducts(localStorage.getItem('pos-token')))
        }
    }, [])
    
    const handleProductChange = (e)=>{
        // console.log('-----------', o)
        // console.log('-----------', e)
        
        //console.log('testtt', e) - {value: "6091184815477a00179884e9", label: "Realme 6"}
            //handleProdChange(id, value)
            setOp(e)
            const selectedProd = products.find((prod)=>{
                return prod._id === e.value
            })
            const data = {
                prodName : selectedProd.name,
                price : selectedProd.price,
                product: e.value
            }
            handleItemChange(id, data)
    }
    const callItemChange = (value)=>{
        const data = {
            quantity: value
        }
        handleItemChange(id, data)
    }
    const handleQuantityChange = (e)=>{
        console.log('Qty change')
        setQty(Number(e.target.value))
        callItemChange(Number(e.target.value))
    }
    const handleIncre = ()=>{
        setQty(qty+1)
        callItemChange(qty + 1)
    }
    const handleDecre = ()=>{
        if(qty-1 > 0){
            setQty(qty-1)
            callItemChange(qty-1)
        }
    }

    return(
        <>
            <TableRow>
                {/*
                {products.map((prod)=>{
                    return <option key={prod._id} value={prod._id}>{prod.name}</option>
                })}
                */}
                <TableCell style={{width:'120px'}} padding='none'>
                    <Select
                        value={op}
                        onChange={handleProductChange}
                        options = {options}
                        placeholder="Product"
                        styles={{width: '10%'}}
                    />
                </TableCell >
                <TableCell padding='none' align="right">
                    <Grid item>
                        
                        <TextField size="small" required style={{width:'90px'}} required type="number" name="selectQuantity" onChange={handleQuantityChange} value={qty}
                        className={classes.number}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <IconButton style={{width:'2px', height:'2px'}} onClick={handleIncre}>
                                    <AddIcon fontSize="small"/>
                                </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton style={{width:'2px', height:'2px'}} onClick={handleDecre}>
                                        <RemoveIcon fontSize="small"/>
                                    </IconButton>           
                                </InputAdornment>
                            )
                          }}
                        />

                        
                    </Grid>
                    
                </TableCell>
                <TableCell padding='none' align="right">
                    
                    <input style={{width:'80px'}} disabled value={price}/>
                </TableCell>
                <TableCell padding='none' align="right">
                    <input style={{width:'80px'}} disabled value={quantity * price}/> &nbsp;
                    <IconButton size="small" onClick={()=>{handleRemoveItem(id)}}>
                        <CancelIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}

export default LineItem