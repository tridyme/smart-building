import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddRoom from './Components/AddRoom';
import CardRoom from './Components/CardRoom';
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

export default function Rooms() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [roomList, setRoomList] = React.useState([]);
  
  React.useEffect(() => {
    fetchRoomList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const fetchRoomList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms`);
      console.log(res)
      setRoomList(res.data);
    } catch (error) {
      console.log(error);
    }
	};

  const deleteRoom = async (_id) => {
    try {
      const res = await axios.delete(`${REACT_APP_API_URL}/rooms/${_id}`);
      await fetchRoomList();
    } catch (error) {
      console.log(error);
    }
	};

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rooms
        </Typography>
        <Divider variant="middle" />
      </Grid>
      { roomList.map((room, index) => (
        <Grid item md={4} key={index}>
          <CardRoom
            room={room}
            deleteRoom={deleteRoom}
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
      <AddRoom
        open={open}
        handleClose={handleClose}
        fetchRoomList={fetchRoomList}
      />
    </Grid>
  );
};



