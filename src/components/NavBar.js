import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {IconButton, Menu, MenuItem, AppBar, Toolbar, Typography, Button,Tooltip} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { setAdmin, getAdminDetails } from '../actions/adminActions'
import BillingContainer from './BillingContainer'
import '../styles/styles.css'
import Customer from './Customer'
import Home from './Home'
import Login from './Login'
import Product from './Product'
import Register from './Register'
import Account from './Account'
import NotFound from './NotFound'
import DisplayBill from './DisplayBill'
import ProtectedRoute from './ProtectedRoute'
import Heading from './Heading';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    toolbarStyle: {
        backgroundColor: 'rgb(140, 14, 14)',
    },
  }));

const NavBar = (props)=>{
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    
    const adminDetails = useSelector((state)=>{
        return state.adminDetails
    })
    
    const handleLogout = ()=>{
        dispatch(setAdmin({auth: false}))
        localStorage.removeItem('pos-token')
        props.history.push('/')
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    
    return(
        <>
            <AppBar className={classes.toolbarStyle} position="fixed" > {/*Pos fixed with remove extra margin*/}
                <Toolbar className={classes.toolbarStyle} variant="dense" >
                    <Typography variant="h6" className={classes.title}>
                        <Tooltip title="Dashboard">
                        <Link className="link-style" to="/">Point of Sale</Link>
                        </Tooltip>
                    </Typography>
                    {adminDetails.auth ? (
                        <div>
                            <Button size="small" color="inherit"><Link className="link-style" to="/products"><Heading variant="subtitle1" title="Products"/></Link></Button>
                            <Button size="small" color="inherit"><Link className="link-style" to="/customers"><Heading variant="subtitle1" title="Customers"/></Link></Button>
                            <Button size="small" color="inherit"><Link className="link-style" to="/billing"><Heading variant="subtitle1" title="Billing"/></Link></Button>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu} color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open} onClose={handleClose}
                                >
                                <MenuItem onClick={handleClose}><Link to="/account">My account</Link></MenuItem>
                                <MenuItem onClick={handleLogout}><Link to="/">Logout</Link></MenuItem>
                            </Menu>
                        </div>
                        ):(
                            <>
                                <Button size="small" color="inherit"><Link className="link-style" to="/login">Login</Link></Button>
                                <Button size="small" color="inherit"><Link className="link-style" to="/register">Register</Link></Button>
                            </>
                        )}
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login}/> 
                <Route path="/register" component={Register}/>
                <ProtectedRoute path="/products" component={Product}/>
                <ProtectedRoute path="/customers" component={Customer}/>
                <ProtectedRoute path="/billing" component={BillingContainer} exact={true}/>
                <ProtectedRoute path="/account" component={Account}/>
                <ProtectedRoute path="/billing/:id" component={DisplayBill}/>
                <Route component={NotFound} />
            </Switch>
        </>
    )
}

export default withRouter(NavBar)