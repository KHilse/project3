import React, { Component } from 'react';

import Login, { LoginInt } from './Login'
import Signup from '../auth/Signup'
import Test from './Test'
import inkline from '../../theme/Mui'

import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 800,
  }
}));


const AuthBox = props => {
  const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
      setValue(newValue);
    }

    return (
      <div className="tabs">
        <div className={classes.root}>
        <ThemeProvider theme={inkline}>
          <AppBar position="static" className="AppBar">
            <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Signup" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Test />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup user={props.user} refreshUser={props.refreshUser}/>
          </TabPanel>
          </ThemeProvider>
        </div>
      </div>
    );
}

export default AuthBox
