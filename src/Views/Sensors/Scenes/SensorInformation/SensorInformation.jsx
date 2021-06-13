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
  Link,
} from '@material-ui/core';
import { Scatter } from 'react-chartjs-2';
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
    // height: 240,
  },
}));


function SensorInformation({
  match
}) {

  const classes = useStyles();
  const [sensorInformation, setSensorInformation] = React.useState([]);
  const [temperatureData, setTemperatureData] = React.useState([]);
  const [humidityData, setHumidityData] = React.useState([]);
  const [lightData, setLightData] = React.useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  React.useEffect(() => {
    const { id } = match.params;
    fetchSensorInformation(id);
  }, []);


  const fetchSensorInformation = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/sensors/${id}`);
      console.log(res.data);
      setSensorInformation(res.data);
      const lightArray = [];

      const temperatureArray = await res.data.temperature.map((value, index) => {
        return { x: res.data.date[index], y: value };
      });

      const humidityArray = await res.data.humidity.map((value, index) => {
        return { x: res.data.date[index], y: value };
      });


      // await res.data.data.map(info => {
      //   temperatureArray.push({ x: info.date, y: info.temperature });
      //   humidityArray.push({ x: info.date, y: info.humidity });
      //   lightArray.push({ x: info.date, y: info.lightOn });
      // });
      setTemperatureData(temperatureArray);
      setHumidityData(humidityArray);
      setLightData(lightArray);
    } catch (error) {
      console.log(error);
    }
  };

  // const mean = () => {

  // }

  return (
    <Box>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Sensor: ${sensorInformation.name}`}
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Scatter
              className="chart"
              width={200}
              // height={100}
              data={{
                datasets: [{
                  data: temperatureData,
                  yAxisID: 'temperature',
                  backgroundColor: 'red',
                  borderColor: 'red',
                  label: ['temperature'],
                  showLine: true,
                  fill: false,
                  pointRadius: 0
                }, {
                  data: humidityData,
                  yAxisID: 'humidity',
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  label: ['humidity'],
                  showLine: true,
                  fill: false,
                  pointRadius: 0
                }],
              }}
              options={{
                scales: {
                  xAxes: [{
                    type: 'time',
                    // time: {
                    //   stepSize: 10
                    // },
                    distribution: 'linear'
                  }],
                  yAxes: [{
                    id: 'temperature',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                      max: 30,
                      min: 10
                    }
                  }, {
                    id: 'humidity',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                      max: 100,
                      min: 0
                    }
                  }]
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SensorInformation;