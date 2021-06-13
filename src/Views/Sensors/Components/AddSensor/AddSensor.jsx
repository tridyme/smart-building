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

export default function AddSensor({
	open,
	handleClose,
	fetchSensorList
}) {
	const classes = useStyles();

	const [sensorName, setSensorName] = React.useState('');
	const [sensorType, setSensorType] = React.useState('');
	const [spaceName, setSpaceName] = React.useState('');
	const [spaceList, setSpaceList] = React.useState([]);

	const sensorTypeList = [
		{ value: "LightController", label: "Light Controller" },
		{ value: "TemperatureAndHumidity", label: "Temperature and Humidity" },
	]

	React.useEffect(() => {
		fetchSpaceList();
	}, []);

	const fetchSpaceList = async () => {
		try {
			const res = await axios.get(`${REACT_APP_API_URL}/spaces`);
			setSpaceList(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const addSensorToDb = async (sensor) => {
		try {
			await axios.post(`${REACT_APP_API_URL}/sensors`, sensor);
			await fetchSensorList();
		} catch (error) {
			console.log(error);
		}
	}

	const handleChangeSensorName = event => {
		setSensorName(event.target.value);
	};

	const handleChangeSensorType = event => {
		setSensorType(event.target.value);
	};

	const handleChangeSpaceName = event => {
		setSpaceName(event.target.value);
	};


	const handleSubmit = event => {
		event.preventDefault();
		const sensor = {
			name: sensorName,
			type: sensorType,
			space: spaceName
		}
		addSensorToDb(sensor);
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Sensor</DialogTitle>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Describe the sensor you want to add
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Sensor name"
						helperText="Please enter the name on the Sensor"
						fullWidth
						required
						color="secondary"
						value={sensorName}
						onChange={handleChangeSensorName}
					/>
					<TextField
						select
						margin="dense"
						label="Sensor type"
						helperText="Please select the type of the sensor"
						fullWidth
						required
						color="secondary"
						name="sensorType"
						value={sensorType}
						onChange={handleChangeSensorType}
					>
						{sensorTypeList.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						margin="dense"
						label="Space name"
						helperText="Please select the space location"
						fullWidth
						required
						color="secondary"
						name="spaceName"
						value={spaceName}
						onChange={handleChangeSpaceName}
					>
						{spaceList.map((option, index) => (
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
