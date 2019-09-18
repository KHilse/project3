import React, {Component} from 'react'
import axios from 'axios'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: '#F9F9F9'
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
      <form>
        <TextField
          id="filled-email-input"
          label="Email"
          className={styles.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
        />
        <br />
        <TextField
          id="filled-password-input"
          label="Password"
          className={styles.textField}
          type="password"
          margin="normal"
        />
        <br />
          <Button variant="contained" color="secondary" >
          Submit
          </Button>
        <br />
      </form>
    </div>
  )
}

export default Test
