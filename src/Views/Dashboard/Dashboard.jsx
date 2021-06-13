import React, { useState, useEffect } from 'react';
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
import SensorList from './SensorList';
import SpaceList from './SpaceList';
import initialData from './initialData';

import MapElem from '../../Components/MapElem';

import axios from 'axios';
const {
  REACT_APP_API_URL
} = process.env;

const useStyles = makeStyles(theme => ({
  // title: {
  //   flexGrow: 1,
  // },
  // content: {
  //   flexGrow: 1,
  //   height: '100vh',
  //   overflow: 'auto',
  // },
  // container: {
  //   paddingTop: theme.spacing(4),
  //   paddingBottom: theme.spacing(4),
  // },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  map: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 400,
  },
  fixedHeight: {
    height: 240,
  },
}));


function Dashboard(props) {

  const classes = useStyles();
  const [appData, setAppData] = useState(initialData);
  const [buildingName, setBuildingName] = useState('79 Avenue Aristide Briand, 94110 Arcueil');
  const [buildingCoordinates, setBuildingCoordinates] = useState([2.326807, 48.804707]);
  const [spaceList, setSpaceList] = useState([]);
  const [sensorList, setSensorList] = useState([]);

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

  useEffect(() => {
    fetchSpaceList();
    fetchSensorList();
  }, []);

  const fetchSpaceList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/spaces`);
      setSpaceList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSensorList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/sensors`);
      setSensorList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeBuildingName = event => {
    setBuildingName(event.target.value);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Divider variant="middle" />
      </Grid>
      <Grid item sm={12}>
        <Paper className={classes.map}>
          <MapElem
            title={'Location'}
            buildingCoordinates={buildingCoordinates}
          />
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper className={fixedHeightPaper}>
          <Chart
            buildingName={buildingName}
            handleChangeBuildingName={handleChangeBuildingName}
          />
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper className={fixedHeightPaper}>
          <SpaceList
            spaceList={spaceList}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <SensorList
            sensorList={sensorList}
            spaceList={spaceList}
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


