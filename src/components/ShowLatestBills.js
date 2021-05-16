import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DisplayBill from './DisplayBill'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ShowLatestBills = (props)=>{
    //const [show, setShow] = useState(false)
    const [items, setItems] = useState([])
    const products = useSelector((state)=>{
        return state.products
    })
    const {custDetails, lineItems, date, total, _id, index} = props
    //console.log(custDetails)
    const handleShow = ()=>{
        props.history.push(`/billing/${_id}`, {lineItems:[...items], name:custDetails.name, phone:custDetails.mobile, total:total, date:new Date(date) }) 
    }
    useEffect(()=>{
        const res = lineItems.map((item)=>{
            const resProd = products.find((prod)=>{
                return prod._id == item.product
            })
            return {...item, ...resProd}
        })
        setItems(res)
    }, [])

    
    return (
        <ListItem dense button onClick={handleShow} >
            <ListItemText edge="start">{index}.</ListItemText>
            <ListItemText  primary={new Date(date).toDateString()} />
            <ListItemText edge="end">&#8377; {total.toLocaleString()}</ListItemText>
        </ListItem>
    )
}

export default withRouter(ShowLatestBills)