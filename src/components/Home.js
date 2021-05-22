import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Chart from "react-google-charts"
import { getCustomers } from '../actions/customerActions'
import { getProducts } from '../actions/productActions'
import {asyncLoginAdmin, getAdminDetails} from '../actions/adminActions'
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
    const [top5, setTop5] = useState([])
    const [topProdList, setTopList] = useState([])
    //const [prodSold, setProdSold] = useState({})
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
        console.log("GETTING DATA HOME..")
        if(token){ 
            dispatch(getAdminDetails(token))
            if(products.length == 0){
                dispatch(getProducts(token))
            }
            if(customers.length == 0){
                dispatch(getCustomers(token))
            }
            if(bills.length == 0){
                dispatch(getBills(token))
            }
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
        
    }, [bills, customers])

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

    useEffect(()=>{
        getMonthlyData(Number(month))
        const prodBought = {}
        let sum = 0
        for(let bill of bills){
            for(let item of bill.lineItems){
                sum += item.quantity
                if(prodBought.hasOwnProperty(item.product)){
                    prodBought[item.product] += item.quantity
                }else{
                    prodBought[item.product] = item.quantity
                }
            }
        }
        let sortedList = Object.entries(prodBought)
        sortedList.sort((x, y)=>{
            return y[1] - x[1]
        })
        const topProducts = sortedList.slice(0, 5)
        setTop5(topProducts)
    }, [bills])

    useEffect(()=>{
        const topList = top5.map((prod)=>{
            const resProd= products.find((p)=>{
                return p._id == prod[0]
            })
            return [resProd?.name, prod[1]]
        })
        setTopList(topList)
    }, [top5, products])

    const getTotalSales = ()=>{
        let total = 0
        bills.forEach((bill)=>{
            total += bill.total
        })
        return total
    }
    
    const handleChange = (e)=>{
        setMonth(e.target.value)
        getMonthlyData(Number(e.target.value))
    }
    const handleDemo = ()=>{
        //dispatch(asyncLoginAdmin({email:'demouser@gmail.com', password:'demo@1234'}, props.history))
        props.history.push('/login', {email:'demouser@gmail.com', password:'demo@1234'})
    }
    return(
        <div style={{marginTop:'60px'}}>
            
            {adminDetails.auth ?
                (<>
                <Heading title="Dashboard"/>
                <Grid container spacing={3}>
                    <Grid container xs={7} direction="column">
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
                                        title: 'Monthly sales',
                                        hAxis: {
                                            title: 'Date',
                                        },
                                        vAxis: {
                                            title: 'Amount (Rs)',
                                        },
                                    }}
                                />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={4} >
                    <Heading title="Last five bills"/>
                        <Paper style={{minHeight:'100px', backgroundColor:'rgb(247, 242, 82)', marginBottom:'10px'}}>
                            {latestBills.length == 0 ? <div style={{minHeight:'inherit', display:'flex', justifyContent:'center', alignItems:'center'}}><Heading variant="h6" title="No bills"/></div> : (
                                <List >
                                    {latestBills.map((bill, i)=>{
                                        return <ShowLatestBills key={i} index={i+1} {...bill}/>
                                    })}
                                </List>
                            )}
                        </Paper>
                        {bills.length !=0 && 
                        <Chart maxWidth={'100%'} height={'300px'}
                            chartType="ColumnChart"
                            data={[
                                ['Product', 'Items sold'],
                                ...topProdList
                            ]}
                            options={{
                                chartArea: { width: '50%' },
                                title: 'Top Selling Products',
                                hAxis: {
                                    title: 'Products',
                                    textPosition:'none'
                                },
                                vAxis: {
                                    title: 'Purchases',
                                },
                            }}
                            />}
                    </Grid>
                </Grid></>) : (
                <>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <div style={{width:'60%'}}>
                        <img src="https://www.softwaresuggest.com/blog/wp-content/uploads/2019/01/invoice_billing_feature_FB_image.png" height="450px" width="100%"/>
                    </div>
                    <div style={{width:'30%', height:'450px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <Heading title="Welcome to our online invoicing and inventory solution"/><br/>
                            <div style={{display:'flex'}}>
                                <Button size="small" color="primary" variant="contained"><Link className="link-style" to="/register">Get Started</Link></Button> &nbsp; &nbsp;
                                <Button variant="outlined" size="small" onClick={handleDemo}>Explore Demo Account</Button>
                            </div><br/>
                            <Typography>Already using the application? <Link to="/login">Login</Link></Typography>
                        </div>
                    </div>
                </>)
                }
        </div>
    )
}

export default Home
