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

export default function AddRoom({
	open,
	handleClose,
	fetchRoomList
}) {
	const classes = useStyles();
	const [roomName, setRoomName] = React.useState('');

	const addRoomToDb = async (room) => {
		try {
			await axios.post(`${REACT_APP_API_URL}/rooms`, room);
			await fetchRoomList();
		} catch (error) {
			console.log(error);
		}
	}
	
	const handleChange = event => {
    setRoomName(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const room = { name: roomName }
		addRoomToDb(room);
	}
	
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Room</DialogTitle>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Describe the room where the iot devices are located
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Room name"
						helperText="Please enter the name on the Room"
						fullWidth
						required
						color="secondary"
						value={roomName}
						onChange={handleChange}
						name="name"
					/>
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
