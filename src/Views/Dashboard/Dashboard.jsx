import React, { useState } from 'react';
import update from 'immutability-helper';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Fab,
  Grid,
  Typography,
  Divider,
  CssBaseline,
  Box,
  List,
  IconButton,
  Badge,
  Container,
  Paper,
  Button,
  Link,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Inputs from './Inputs';
import Outputs from './Outputs';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import DeviceList from './DeviceList';
import initialData from './initialData';

import MapElem from '../../Components/MapElem';

import axios from 'axios';
const {
	REACT_APP_API_URL
} = process.env;


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


function Dashboard(props) {

  const classes = useStyles();
  const [appData, setAppData] = useState(initialData);
  const [roomList, setRoomList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  const updateValue = (field, name, value) => {
    const updateAppData = update(appData, {
      [field]: {
        [name]: {
          value: {
            $set: value
          }
        }
      }
    });
    setAppData(updateAppData);
  }

  React.useEffect(() => {
		fetchRoomList();
    fetchDeviceList();
  }, []);

	const fetchRoomList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms`);
      setRoomList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchDeviceList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/devices`);
      setDeviceList(res.data);
    } catch (error) {
      console.log(error);
    }
	};

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      {/* <Grid  spacing={3}> */}
      {/* <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <MapElem />
        </Paper>
      </Grid> */}
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <DeviceList
            deviceList={deviceList}
          />
        </Paper>
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
}

Dashboard.propTypes = {
    props: PropTypes.object
};


export default Dashboard;


