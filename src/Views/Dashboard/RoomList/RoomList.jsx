import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import Title from '../../../Components/Title';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(4)
  },
}));


export default function RoomList({
  roomList
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Rooms</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomList.map(room => (
            <TableRow key={room._id}>
              <TableCell><Link to={`/rooms/${room._id}`}>{room.name}</Link></TableCell>
              <TableCell>{room._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to={`/rooms`}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}