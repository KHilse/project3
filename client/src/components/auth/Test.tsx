import React, {Component} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }),
);

const Test = props => {

  let styles : any = useStyles();
  return(
    <div className="formTemp">
      <h1> Login </h1>
      <hr className="arrow" />
      <form>
        <TextField
          id="filled-email-input"
          label="Email"
          className={styles.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="filled"
        />
        <br />
        <TextField
          id="filled-password-input"
          label="Password"
          className={styles.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
        />
        <br />
          <input type='submit' />
        <br />
      </form>
    </div>
  )
}

export default Test
