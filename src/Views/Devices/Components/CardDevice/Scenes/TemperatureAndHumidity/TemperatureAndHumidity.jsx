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

export default function TemperatureAndHumidity ({
	device,
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
						data: [device.temperature, 42-device.temperature],
						backgroundColor: [
							colorIndicator('temperature', device.temperature),
							'lightgrey'
						],
						labels: ['temperature'],
					},{
						data: [device.humidity, 100 - device.humidity],
						backgroundColor: [
							colorIndicator('humidity', device.humidity),
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
				{ `Temperature:` } <strong>{ `${device.temperature} °C` }</strong> 
			</Typography>
			<Typography variant="body2" component="p">
				{ `Humidity:` } <strong>{ `${device.humidity} %` }</strong> 
			</Typography>
		</div>
	);
}