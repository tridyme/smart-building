import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import axios from 'axios';
import CardDevice from '../../../Devices/Components/CardDevice';
const {
	REACT_APP_API_URL
} = process.env;


export default function RoomDescription({
	match
}) {
  // const classes = useStyles();
	const theme = useTheme();
	const [roomInformation, setRoomInformation] = React.useState([]);
  const [deviceList, setDeviceList] = React.useState([]);
  
  React.useEffect(() => {
		const { id } = match.params;
		fetchRoomInformation(id);
    fetchDeviceList(id);
  }, []);

	const fetchRoomInformation = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms/${id}`);
      setRoomInformation(res.data);
    } catch (error) {
      console.log(error);
    }
	};

	const fetchDeviceList = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms/${id}/devices`);
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
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          { `Room: ${roomInformation.name}` }
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
    </Grid>
  );
};