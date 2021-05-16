import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Chart from "react-google-charts"
import { getCustomers } from '../actions/customerActions'
import { getProducts } from '../actions/productActions'
import {getAdminDetails} from '../actions/adminActions'
import { getBills } from '../actions/billActions'
import ShowLatestBills from './ShowLatestBills'
import { Paper, Typography, Select, MenuItem, Button, Grid, List, CircularProgress } from '@material-ui/core'
import '../styles/styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Heading from './Heading'

const useStyles = makeStyles((theme) => ({
    paperStyles: {
        padding:'5px',
        height:'40px',
        minWidth:'20%'
        //backgroundColor:'rgb(247, 161, 161)'
    },
  }));

const Home = (props)=>{
    const classes = useStyles()
    const [latestBills, setBills] = useState([])
    const [month, setMonth] = useState(new Date().getMonth().toString())
    const [chartData, setChartData] = useState([])
    const dispatch = useDispatch()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const adminDetails = useSelector((state)=>{
        return state.adminDetails
    })
    const products = useSelector((state)=>{
        return state.products
    })
    
    const customers = useSelector((state)=>{
            return state.customers
    })
    const bills = useSelector((state)=>{
        return state.bills
    })

    useEffect(()=>{
        const token = localStorage.getItem('pos-token')
        if(token ){ //********** && products.length==0 && customers.length==0 && bills.length == 0*/
            //console.log('sending')
            dispatch(getProducts(token))
            dispatch(getCustomers(token))
            dispatch(getBills(token))
        }
    },[])

    useEffect(()=>{
        const res = bills.slice((bills.length-5<0 ? 0 : bills.length-5), bills.length)
        
        const updated = res.map((bill)=>{
            const custDetails = customers.find((cust)=>{
                return cust._id == bill.customer
            })
            return {...bill, custDetails}
        })
        setBills(updated.reverse())
        getMonthlyData(Number(month))
        
    }, [bills])


    const getTotalSales = ()=>{
        let total = 0
        bills.forEach((bill)=>{
            total += bill.total
        })
        return total
    }
    const getMonthlyData = (selectedMonth)=>{
        const monthlyData = {}
        for(let i=1;i<32;i++){
            monthlyData[i]=0
        }
        
        bills.forEach((bill)=>{
            const billDate = new Date(bill.createdAt)
            const yearNow = new Date()
            if(billDate.getMonth() == selectedMonth && billDate.getFullYear() == yearNow.getFullYear()){
                monthlyData[billDate.getDate()] += bill.total
            }
        })
        setChartData(Object.entries(monthlyData))
    }
    const handleChange = (e)=>{
        setMonth(e.target.value)
        getMonthlyData(Number(e.target.value))
    }
    return(
        <div style={{marginTop:'60px'}}>
            
            {adminDetails.auth ?
                (<>
                <Heading title="Dashboard"/>
                <Grid container spacing={3}>
                    <Grid item xs={8} direction="column">
                        <Grid item style={{marginTop:'10px', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <Paper className={classes.paperStyles}><Typography variant="subtitle1">{`Total Products : ${products.length}`}</Typography></Paper>

                            <Paper className={classes.paperStyles}><Typography variant="subtitle1">{`Total Customers : ${customers.length}`}</Typography></Paper>

                            <Paper className={classes.paperStyles}><Typography variant="subtitle1">Total Sales : &#8377;{`${getTotalSales().toLocaleString()}`}</Typography></Paper>

                        </Grid>
                        <Grid item xs={9} style={{marginLeft:'70px', marginTop:'20px'}}>
                            <label>Select a month</label> &nbsp; &nbsp;
                            <Select
                                size='small'
                                style={{width:'100px'}}
                                id="demo-simple-select"
                                value={month}
                                onChange={handleChange}
                                >
                                {months.map((month, i)=>{
                                    return <MenuItem key={i} value={i}>{month}</MenuItem>
                                })}
                                </Select>
                        
                                <Chart
                                    maxWidth={'100%'} height={'400px'} chartType="LineChart"
                                    loader={<div style={{maxWidth:'100%', height:'400px', display:'flex', justifyContent:'center', alignItems:'center'}}><CircularProgress /></div>}
                                    data={[
                                        ['x', 'Sales'],
                                        ...chartData
                                    ]}
                                    options={{
                                        chart: {
                                            title: 'Monthly sales',
                                            subtitle: 'in Rupees',
                                        },
                                        hAxis: {
                                        title: 'Date',
                                        },
                                        vAxis: {
                                        title: 'Amount (Rs)',
                                        viewWindow:{
                                            min:0,
                                        }
                                        },
                                        
                                    }}
                                    
                                    />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Heading title="Last five bills"/>
                        <Paper style={{minHeight:'100px', backgroundColor:'rgb(247, 242, 82)'}}>
                        {latestBills.length == 0 ? <div style={{minHeight:'inherit', display:'flex', justifyContent:'center', alignItems:'center'}}><Heading variant="h6" title="No bills"/></div> : (
                            <List >
                            {latestBills.map((bill, i)=>{
                                return <ShowLatestBills key={i} index={i+1} {...bill}/>
                            })}
                            </List>
                        )}
                        
                        </Paper>
                    
                    </Grid>
                    
                </Grid></>) : <>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <div style={{width:'60%'}}>
                    <img src="https://www.softwaresuggest.com/blog/wp-content/uploads/2019/01/invoice_billing_feature_FB_image.png" height="450px" width="100%"/>
                </div>
                <div style={{width:'30%', height:'450px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Heading title="Welcome to our online invoicing and inventory solution"/><br/>
                        <Button size="small" color="primary" variant="contained"><Link className="link-style" to="/register">Get Started</Link></Button><br/>
                        <Typography>Already using the application? <Link to="/login">Login</Link></Typography>
                    </div>
                </div>
            </>
                }
        </div>
    )
}

export default Home