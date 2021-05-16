import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core'
import { asyncRegister } from '../actions/adminActions'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import validator from 'validator'
import Heading from './Heading'

const Register = (props)=>{
    const dispatch = useDispatch()
    const [emailIncorrect, setEmailIncorrect] = useState(false)
    const [usernameIncorrect, setUsernameIncorrect] = useState(false)
    const [pwdIncorrect, setPwdIncorrect] = useState(false)
    const [correctFormat, setFormat] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [data, setData] = useState({username:'', email:'', password:'', businessName:'', address:''})

    const handleChange = (e) =>{
        const value = e.target.value
        const name = e.target.name
        if(name == 'username'){
            setData({...data, username: value})
            value.length >= 4 ? setUsernameIncorrect(false) : setUsernameIncorrect(true)
        }else if(name == 'email'){
            setData({...data, email: value})
            validator.isEmail(value) ? setEmailIncorrect(false) : setEmailIncorrect(true)
        }else if(name == 'password'){
            setData({...data, password: value})
            value.length >= 8 ? setPwdIncorrect(false) : setPwdIncorrect(true)
        }else if(name == 'businessName'){
            setData({...data, businessName: value})
        }else{
            setData({...data, address:value})
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
        setData({username:'', email:'', password:'', businessName:'', address:''})
        dispatch(asyncRegister(data, props.history))
    }

    
    return(
        <div className="form-class" style={{marginTop:'60px'}}>
            <Heading title="REGISTER"/>
            <form onSubmit={handleSubmit} className="form-class">
                <TextField required style={{width:'40%'}} name="username" value={data.username} onChange={handleChange} error={usernameIncorrect} helperText="Minimum 4 characters" size="small" label="Username"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon/>
                      </InputAdornment>
                    ),
                  }}
                /><br/>
                
                <TextField helperText={emailIncorrect && "Enter a valid email"} error={emailIncorrect} required style={{width:'40%'}} name="email" value={data.email} onChange={handleChange} size="small" label="Email"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon/>
                              </InputAdornment>
                            ),
                          }}
                        /><br/>

                <TextField required style={{width:'40%'}} type={showPwd ? "text" : "password"} name="password" value={data.password} onChange={handleChange} error={pwdIncorrect} helperText="Minimum 8 characters" size="small" label="Password"
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
                /><br/>
                
                <TextField required style={{width:'40%'}} name="businessName" value={data.businessName} onChange={handleChange} size="small" label="Business Name"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessCenterIcon/>
                      </InputAdornment>
                    ),
                  }}
                /><br/>
                
                <TextField style={{width:'40%'}} multiline={true} rows="3" label="Address" value={data.address} name="address" onChange={handleChange} size="small"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon/>
                      </InputAdornment>
                    ),
                  }}
                /><br/>
                <Button disabled={emailIncorrect || usernameIncorrect || pwdIncorrect} type="submit" variant="contained" size="small">Register</Button>
            </form>
        </div>
    )
}

export default Register