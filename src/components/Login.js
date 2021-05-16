import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import validator from 'validator'
import { TextField, Button, Grid, IconButton, InputAdornment, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { asyncLoginAdmin } from '../actions/adminActions'
import Heading from './Heading'
import ErrorHandling from './ErrorHandling'

const Login = (props)=>{
    const [emailIncorrect, setEmailIncorrect] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const from = props.location.state?.from 

    useEffect(()=>{
        if(from == '/register'){
            handleSuccess()
        }
    }, [])
    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value
        if(e.target.name == 'email'){
            setEmail(value)
        }else{
            setPassword(value)
        }
    }
    const handleEmailBlur = ()=>{
        if(validator.isEmail(email)){
            setEmailIncorrect(false)
        }else(
            setEmailIncorrect(true)
        )
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
            const data = {
                email,
                password
            }
            dispatch(asyncLoginAdmin(data, props.history, handleError))
            console.log(data)
    }
    const handleError = ()=>{
        setError(!error)
    }
    const handleSuccess = ()=>{
        setSuccess(!success)
    } 
    return(
        <div className="form-class" style={{marginTop:'70px'}}>
            
            <Heading title="LOGIN"/>
            {(from == '/products' || from == '/customers' || from?.startsWith('/billing')) && <Typography variant="subtitle1" style={{color:'red'}}>You need to login first</Typography>}
            <form onSubmit={handleSubmit} style={{ height:'250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly'}}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item>
                        <TextField onBlur={handleEmailBlur} helperText={emailIncorrect && "Enter a valid email"}error={emailIncorrect} required style={{width:'300px'}} name="email" value={email} onChange={handleChange} size="small" label="Email"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountBoxIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                    
                    <Grid item>
                        <TextField required style={{width:'300px'}} type={showPwd ? 'text' : 'password'} name="password" value={password} onChange={handleChange} size="small" label="Password"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon/>
                              </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton style={{width:'2px', height:'2px'}} onClick={(e)=>{setShowPwd(!showPwd)}}>
                                        {showPwd ? <VisibilityIcon fontSize="small"/> : <VisibilityOffIcon fontSize="small"/> }
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}

                        />
                    </Grid>
                </Grid>
                {/*<div>
                    <input id="showPwd" type="checkbox" checked={showPwd} onChange={(e)=>{setShowPwd(e.target.checked)}}/> 
                    <label htmlFor="showPwd">Show Password</label>
                </div>*/}
                <Button disabled={emailIncorrect} type="submit" variant="contained" size="small">Login</Button>
                
                <ErrorHandling open={error} success={false} handleNotification={handleError} msg ="Invalid email or password"/>
                <ErrorHandling autoHideDuration={3000} open={success} success={true} handleNotification={handleSuccess} msg="Registration Successful" />
            </form>
        </div>
    )
}

export default Login