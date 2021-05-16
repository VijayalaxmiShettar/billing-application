import React from 'react'
import {useSelector} from 'react-redux'
import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({component:Component, ...rest})=>{
    const adminDetails = useSelector((state)=>{
        return state.adminDetails
    })
    return(
        <Route
            {...rest}
            render = {(props)=>{
                if(adminDetails.auth){
                    return <Component props={props}/>
                }else{
                    return <Redirect to={{
                        pathname:'/login',
                        state: {
                            from : props.location.pathname
                        }
                    }}/>               
                }
            }}
        />
    )
}

export default ProtectedRoute