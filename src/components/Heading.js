import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {Typography} from '@material-ui/core/';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Cormorant',
        'serif',
      ].join(','),
  },});

const Heading = (props)=>{
    const {title, variant} = props
    return(
        <ThemeProvider theme={theme}> 
            <Typography variant={variant || "h5"}>{title}</Typography> 
        </ThemeProvider>
    )
}

export default Heading