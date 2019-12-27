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
    marginTop: theme.spacing(3),
  },
}));


export default function DeviceList({
  deviceList
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Device</Title>
      <Table size="small">
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
              <TableCell align="right">{device.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        size="small"
        to={`/devices`}
        component={ Link }
      >
        Learn More
      </Button>
    </React.Fragment>
  );
}