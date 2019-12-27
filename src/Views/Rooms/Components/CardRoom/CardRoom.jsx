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

export default function CardRoom({
	room,
	deleteRoom,
}) {
  const classes = useStyles();
	const [lightControllerNumber, setLightControllerNumber] = React.useState(0);
	const [temperatureAndHumidityNumber, setTemperatureAndHumidityNumber] = React.useState(0);
	
	React.useEffect(() => {
    fetchDeviceList(room._id);
	}, []);
	
	const fetchDeviceList = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms/${id}/devices`);
			let lCN = 0;
			let tHN = 0;
			res.data.map(device => {
				if(device.type === 'lightController') {
					lCN += 1;
				}
				if(device.type === 'temperatureAndHumidity') {
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
				to={`/rooms/${room._id}`}
				component={ Link }
			> */}
			<CardHeader
				action={
					<IconButton
						aria-label="settings"
						onClick={() => {
							deleteRoom(room._id)
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				title={<Title>{room.name}</Title>}
				subheader="Room"
			/>
			<CardContent>
				{/* <Typography variant="h5" component="h2">
					{room.name}
				</Typography> */}
				{/* <Typography variant="body2" component="p">
					Temperature: 
					<br />
				</Typography> */}
				{/* <Divider variant="middle" /> */}
				{/* <Typography className={classes.pos} color="textSecondary">
					devices:
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
					to={`/rooms/${room._id}`}
					component={ Link }
				>
					Learn More
				</Button>
      </CardActions>
    </Card>
  );
}