import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorHandling = (props)=>{
    const {open, handleNotification, success, msg, autoHideDuration, vertical='top', horizontal='center'} = props
    return(
        <Snackbar anchorOrigin={{vertical, horizontal }} autoHideDuration={autoHideDuration} open={open} onClose={handleNotification}>
                    <Alert onClose={handleNotification} severity={success ? 'success' : 'error'}>
                        {msg}
                    </Alert>
        </Snackbar>
    )
}

export default ErrorHandling