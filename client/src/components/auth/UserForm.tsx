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

const UserForm = props => {

  let styles : any = useStyles();
  return(
    <div className="vendorContainer">
      <form>
        <TextField
          id="filled-text-input"
          label="First Name"
          className={styles.textField}
          type="text"
          name="firstname"
          autoComplete="text"
          margin="normal"
          onChange={props.recordUser}
          value={props.firstname}
        />
        <br />
        <TextField
          id="filled-text-input"
          label="Last Name"
          className={styles.textField}
          type="text"
          name="lastname"
          autoComplete="text"
          margin="normal"
          onChange={props.recordUser}
          value={props.lastname}
        />
        <br />
        <TextField
          id="filled-text-input"
          label="email"
          className={styles.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          onChange={props.recordUser}
          value={props.email}
        />
        <br />
        <TextField
          id="filled-text-input"
          label="Password"
          className={styles.textField}
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
          onChange={props.recordUser}
          value={props.password}
        />
        <br />
        <TextField
          id="filled-text-input"
          label="Repeat Password"
          className={styles.textField}
          type="password"
          name="passwordVerify"
          autoComplete="password"
          margin="normal"
          onChange={props.recordUser}
          value={props.passwordVerify}
        />
        <div className="subButton">
        </div>
        <br />
      </form>
    </div>
  )
}

export default UserForm
