import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	CardActions,
	CardActionArea,
	CardContent,
	Button,
	Typography,
	Chip,
	Divider,
	Badge,
	IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Title from '../../../../Components/Title';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import OpacityIcon from '@material-ui/icons/Opacity';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
const {
	REACT_APP_API_URL
} = process.env;

const useStyles = makeStyles(theme => ({
	card: {
		minWidth: 275,
		textDecoration: 'none'
	},
	link: {
		textDecoration: 'none'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	badge: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export default function CardSpace({
	space,
	deleteSpace,
}) {
	const classes = useStyles();
	const [lightControllerNumber, setLightControllerNumber] = React.useState(0);
	const [temperatureAndHumidityNumber, setTemperatureAndHumidityNumber] = React.useState(0);

	React.useEffect(() => {
		fetchSensorList(space._id);
	}, []);

	const fetchSensorList = async (id) => {
		try {
			const res = await axios.get(`${REACT_APP_API_URL}/spaces/${id}/sensors`);
			let lCN = 0;
			let tHN = 0;
			res.data.map(sensor => {
				if (sensor.type === 'LightController') {
					lCN += 1;
				}
				if (sensor.type === 'TemperatureAndHumidity') {
					tHN += 1;
				}
			});
			setLightControllerNumber(lCN);
			setTemperatureAndHumidityNumber(tHN);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className={classes.card}>
			{/* <CardActionArea
				className={classes.link}
				to={`/spaces/${space._id}`}
				component={ Link }
			> */}
			<CardHeader
				action={
					<IconButton
						aria-label="settings"
						onClick={() => {
							deleteSpace(space._id)
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				title={<Title>{space.name}</Title>}
				subheader="Space"
			/>
			<CardContent>
				{/* <Typography variant="h5" component="h2">
					{space.name}
				</Typography> */}
				{/* <Typography variant="body2" component="p">
					Temperature: 
					<br />
				</Typography> */}
				{/* <Divider variant="middle" /> */}
				{/* <Typography className={classes.pos} color="textSecondary">
					sensors:
				</Typography> */}
				<div className={classes.badge}>
					<Badge badgeContent={lightControllerNumber} color="secondary">
						<WbIncandescentIcon />
					</Badge>
					<Badge badgeContent={temperatureAndHumidityNumber} color="secondary">
						<OpacityIcon />
					</Badge>
				</div>
			</CardContent>
			{/* </CardActionArea> */}
			<CardActions>
				<Button
					size="small"
					to={`/spaces/${space._id}`}
					component={Link}
				>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}