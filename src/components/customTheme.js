import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles, makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Cormorant',
        'serif',
      ].join(','),
  },});

 export const useStyles = makeStyles((theme) => ({
      cellStyle: {
          backgroundColor:'rgb(97, 97, 95)',
          color:'white',
          fontWeight:'bold',
          padding:'none'
      },
    }));