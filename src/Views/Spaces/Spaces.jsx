import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Fab,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddSpace from './Components/AddSpace';
import CardSpace from './Components/CardSpace';
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

export default function Spaces() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [spaceList, setSpaceList] = React.useState([]);

  React.useEffect(() => {
    fetchSpaceList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSpaceList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/spaces`);
      console.log(res)
      setSpaceList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpace = async (_id) => {
    try {
      const res = await axios.delete(`${REACT_APP_API_URL}/spaces/${_id}`);
      await fetchSpaceList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Spaces
        </Typography>
        <Divider variant="middle" />
      </Grid>
      {spaceList.map((space, index) => (
        <Grid item md={4} key={index}>
          <CardSpace
            space={space}
            deleteSpace={deleteSpace}
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
      <AddSpace
        open={open}
        handleClose={handleClose}
        fetchSpaceList={fetchSpaceList}
      />
    </Grid>
  );
};



