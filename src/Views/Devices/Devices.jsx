import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddDevice from './Components/AddDevice';
import CardDevice from './Components/CardDevice';
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

function Devices() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [deviceList, setDeviceList] = React.useState([]);

  React.useEffect(() => {
    fetchDeviceList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDeviceList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/devices`);
      console.log(res)
      setDeviceList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const deleteDevice = async (_id) => {
    try {
      const res = await axios.delete(`${REACT_APP_API_URL}/devices/${_id}`);
      await fetchDeviceList();
    } catch (error) {
      console.log(error);
    }
	};

  return (
    <Grid container spacing={4}>
      <Grid item sm={12}>
        <Typography variant="h4" gutterBottom>
          Devices
        </Typography>
        <Divider variant="middle" />
      </Grid>
      { deviceList.map((device, index) => (
        <Grid item md={4} key={index}>
          <CardDevice
            key={index}
            device={device}
            deleteDevice={deleteDevice}
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
      <AddDevice
        open={open}
        handleClose={handleClose}
        fetchDeviceList={fetchDeviceList}
      />
    </Grid>
  );
}

export default Devices;



