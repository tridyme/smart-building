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
import { Doughnut } from 'react-chartjs-2';

export default function TemperatureAndHumidity({
	sensor,
	colorIndicator,
}) {
	return (
		<div>
			<Doughnut
				className="chart"
				width={200}
				height={100}
				data={{
					datasets: [{
						data: [sensor.temperature[sensor.temperature.length - 1], 42 - sensor.temperature[sensor.temperature.length - 1]],
						backgroundColor: [
							colorIndicator('temperature', sensor.temperature[sensor.temperature.length - 1]),
							'lightgrey'
						],
						labels: ['temperature'],
					}, {
						data: [sensor.humidity[sensor.humidity.length - 1], 100 - sensor.humidity[sensor.humidity.length - 1]],
						backgroundColor: [
							colorIndicator('humidity', sensor.humidity[sensor.humidity.length - 1]),
							'lightgrey'
						],
						labels: ['humidity'],
					}],
				}}
				options={{
					rotation: Math.PI,
					circumference: Math.PI
				}}
			/>
			<Typography variant="body2" component="p">
				{`Temperature:`} <strong>{`${sensor.temperature[sensor.temperature.length - 1]} °C`}</strong>
			</Typography>
			<Typography variant="body2" component="p">
				{`Humidity:`} <strong>{`${sensor.humidity[sensor.humidity.length - 1]} %`}</strong>
			</Typography>
		</div>
	);
}