import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button
} from '@material-ui/core';
import Title from '../../../Components/Title';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  seeMore: {
    marginTop: theme.spacing(4)
  },
}));


export default function DeviceList({
  deviceList
}) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Title>Recent Device</Title>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Room</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deviceList.map(device => (
            <TableRow key={device._id}>
              <TableCell><Link to={`/devices/${device._id}`}>{device.name}</Link></TableCell>
              <TableCell>{device.date}</TableCell>
              <TableCell>{device._id}</TableCell>
              <TableCell>{device.type}</TableCell>
              <TableCell>{device.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to={`/devices`}>
          See more
        </Link>
      </div>
    </TableContainer>
  );
}