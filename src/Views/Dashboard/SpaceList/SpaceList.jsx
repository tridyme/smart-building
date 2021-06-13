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


export default function SpaceList({
  spaceList
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Spaces</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spaceList.map(space => (
            <TableRow key={space._id}>
              <TableCell><Link to={`/spaces/${space._id}`}>{space.name}</Link></TableCell>
              <TableCell>{space._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to={`/spaces`}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}