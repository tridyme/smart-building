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


export default function SensorList({
  sensorList,
  spaceList
}) {
  const classes = useStyles();

  const getSpaceInfo = (sensorSpace) => {
    const space = spaceList.find(spa => spa._id === sensorSpace);
    return space ? space.name : 'no space';
  }

  return (
    <TableContainer>
      <Title>Recent Sensor</Title>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Space</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensorList.map(sensor => (
            <TableRow key={sensor._id}>
              <TableCell><Link to={`/sensors/${sensor._id}`}>{sensor.name}</Link></TableCell>
              <TableCell>{sensor.date[0]}</TableCell>
              <TableCell>{sensor._id}</TableCell>
              <TableCell>{sensor.type}</TableCell>
              <TableCell><Link to={`/spaces/${sensor.space}`}>{`${getSpaceInfo(sensor.space)}`}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to={`/sensors`}>
          See more
        </Link>
      </div>
    </TableContainer>
  );
}