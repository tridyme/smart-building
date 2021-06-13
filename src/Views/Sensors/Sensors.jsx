import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddSensor from './Components/AddSensor';
import CardSensor from './Components/CardSensor';
import axios from 'axios';
const {
  REACT_APP_API_URL
} = process.env;

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  }
}));

function Sensors() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sensorList, setSensorList] = React.useState([]);

  React.useEffect(() => {
    fetchSensorList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSensorList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/sensors`);
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
        <Typography variant="h4" gutterBottom>
          Sensors
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
      <Fab
        color="secondary"
        aria-label="add"
        size="large"
        onClick={handleClickOpen}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <AddSensor
        open={open}
        handleClose={handleClose}
        fetchSensorList={fetchSensorList}
      />
    </Grid>
  );
}

export default Sensors;



