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

export default function AddSpace({
	open,
	handleClose,
	fetchSpaceList
}) {
	const classes = useStyles();
	const [spaceName, setSpaceName] = React.useState('');

	const addSpaceToDb = async (space) => {
		try {
			await axios.post(`${REACT_APP_API_URL}/spaces`, space);
			await fetchSpaceList();
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = event => {
		setSpaceName(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const space = { name: spaceName }
		addSpaceToDb(space);
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Space</DialogTitle>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Describe the space where the iot sensors are located
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Space name"
						helperText="Please enter the name on the Space"
						fullWidth
						required
						color="secondary"
						value={spaceName}
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
