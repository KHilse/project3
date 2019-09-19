import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    <h1>Login</h1>
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
        <div className="subButton">
          <Button variant="contained" color="secondary" >
          Submit
          </Button>
        </div>
        <br />
      </form>
    </div>
  )
}

export default Test
