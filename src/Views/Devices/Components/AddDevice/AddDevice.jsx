import React from 'react';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
const {
	REACT_APP_API_URL
} = process.env;

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.primary.main
	},
	formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddDevice({
	open,
	handleClose,
	fetchDeviceList
}) {
	const classes = useStyles();
	 
	const [deviceName, setDeviceName] = React.useState('');
	const [deviceType, setDeviceType] = React.useState('');
  const [roomName, setRoomName] = React.useState('');
	const [roomList, setRoomList] = React.useState([]);

	const deviceTypeList = [
		{ value: "lightController", label: "Light Controller"},
		{ value: "temperatureAndHumidity", label: "Temperature and Humidity"},
	]

	React.useEffect(() => {
    fetchRoomList();
	}, []);
	
	const fetchRoomList = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms`);
			setRoomList(res.data);
    } catch (error) {
      console.log(error);
    }
	};

	const addDeviceToDb = async (device) => {
		try {
			await axios.post(`${REACT_APP_API_URL}/devices`, device);
			await fetchDeviceList();
		} catch (error) {
			console.log(error);
		}
	}

  const handleChangeDeviceName = event => {
    setDeviceName(event.target.value);
	};
	
	const handleChangeDeviceType = event => {
    setDeviceType(event.target.value);
	};
	
	const handleChangeRoomName = event => {
    setRoomName(event.target.value);
  };


	const handleSubmit = event => {
		event.preventDefault();
		const device = { 
			name: deviceName,
			type: deviceType,
			room: roomName
		}
		addDeviceToDb(device);
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Device</DialogTitle>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Describe the device you want to add
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Device name"
						helperText="Please enter the name on the Device"
						fullWidth
						required
						color="secondary"
						value={deviceName}
						onChange={handleChangeDeviceName}
					/>
					<TextField
						select
						margin="dense"
						label="Device type"
						helperText="Please select the type of the device"
						fullWidth
						required
						color="secondary"
						name="deviceType"
						value={deviceType}
						onChange={handleChangeDeviceType}
					>
						{deviceTypeList.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						margin="dense"
						label="Room name"
						helperText="Please select the room location"
						fullWidth
						required
						color="secondary"
						name="roomName"
						value={roomName}
						onChange={handleChangeRoomName}
					>
						{roomList.map((option, index) => (
							<MenuItem key={index} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button 
						onClick={handleClose}
						color="primary"
						type="submit"
					>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
