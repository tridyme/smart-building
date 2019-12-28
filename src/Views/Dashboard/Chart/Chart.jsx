import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { 
	Button,
  Select,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	MenuItem,
	InputLabel 
} from '@material-ui/core';
import Title from '../../../Components/Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart({
  buildingName,
  handleChangeBuildingName
}) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Building Informations</Title>
      <TextField
          autoFocus
          margin="dense"
          label="Building adress"
          helperText="Please enter the adress of the building"
          fullWidth
          required
          color="secondary"
          value={buildingName}
          onChange={handleChangeBuildingName}
        />
      {/* <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer> */}
    </React.Fragment>
  );
}