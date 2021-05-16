import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
import {IconButton, Menu, MenuItem, AppBar, Toolbar, Typography, Button,Tooltip} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { setAdmin } from '../actions/adminActions'
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

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    toolbarStyle: {
        backgroundColor: 'black',
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
                        <Link className="link-style" to="/">Billing App</Link>
                        </Tooltip>
                    </Typography>
                    {adminDetails.auth ? (
                        <div>
                            <Button size="small" color="inherit"><Link className="link-style" to="/products">Products</Link></Button>
                            <Button size="small" color="inherit"><Link className="link-style" to="/customers">Customers</Link></Button>
                            <Button size="small" color="inherit"><Link className="link-style" to="/billing">Billing</Link></Button>
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

export default NavBar