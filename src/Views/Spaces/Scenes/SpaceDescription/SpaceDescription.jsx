import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import axios from 'axios';
import CardSensor from '../../../Sensors/Components/CardSensor';
const {
  REACT_APP_API_URL
} = process.env;


export default function SpaceDescription({
  match
}) {
  // const classes = useStyles();
  const theme = useTheme();
  const [spaceInformation, setSpaceInformation] = React.useState([]);
  const [sensorList, setSensorList] = React.useState([]);

  React.useEffect(() => {
    const { id } = match.params;
    fetchSpaceInformation(id);
    fetchSensorList(id);
  }, []);

  const fetchSpaceInformation = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/spaces/${id}`);
      setSpaceInformation(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSensorList = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/spaces/${id}/sensors`);
      console.log(res)
      setSensorList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSensor = async (_id) => {
    try {
      const res = await axios.delete(`${REACT_APP_API_URL}/sensors/${_id}`);
      await fetchSensorList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Space: ${spaceInformation.name}`}
        </Typography>
        <Divider variant="middle" />
      </Grid>
      {sensorList.map((sensor, index) => (
        <Grid item md={4} key={index}>
          <CardSensor
            key={index}
            sensor={sensor}
            deleteSensor={deleteSensor}
          />
        </Grid>
      ))}
    </Grid>
  );
};