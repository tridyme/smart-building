import React from 'react';
import {
	Card,
	CardHeader,
	CardActions,
	CardActionArea,
	CardContent,
	Button,
	Typography,
	IconButton,
	Switch
} from '@material-ui/core';

export default function LightController({
	lightOn,
	handleChange
}) {
	return (
		<Switch
			checked={lightOn}
			onChange={handleChange('lightOn')}
			value="lightOn"
			inputProps={{ 'aria-label': 'secondary checkbox' }}
		/>
	);
}