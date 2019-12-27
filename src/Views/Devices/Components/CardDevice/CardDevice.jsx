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
  IconButton,
  Switch
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Title from '../../../../Components/Title';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import OpacityIcon from '@material-ui/icons/Opacity';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import LightController from './Scenes/LightController';
import TemperatureAndHumidity from './Scenes/TemperatureAndHumidity';

const {
	REACT_APP_API_URL
} = process.env;

const useStyles = makeStyles({
  card: {
    minWidth: 275,
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
});

export default function CardDevice({
  device,
  deleteDevice
}) {
  const classes = useStyles();
  const [roomInformation, setRoomInformation] = React.useState('');
  const [state, setState] = React.useState({
    lightOn: true
  });

  React.useEffect(() => {
    getRoomInformation(device.room);
  }, []);
  
  const getRoomInformation = async (id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/rooms/${id}`);
      setRoomInformation(res.data);
    } catch (error) {
      console.log(error);
    }
	};

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const getDeviceData = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/devices/${device.type}?t=50&h=25`);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
	};

  const colorIndicator = (type, value) => {
    const valueMax = { temperature: 21, humidity: 50 };
    const valueMin = { temperature: 16, humidity: 45 };
    if( value > valueMax[type]) {
      return 'red';
    }
    if( value < valueMin[type]) {
      return 'blue';
    }
    return 'LightGreen';
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => {
              deleteDevice(device._id)
            }}
          >
            <CloseIcon />
          </IconButton>
        }
        title={<Title>{device.name}</Title>}
        subheader={device.type}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          { `Device ID:` } <strong>{ `${device._id}` }</strong> 
        </Typography>
        <Typography variant="body2" component="p">
          { `Room: ${roomInformation.name}` } 
        </Typography>
        {device.type==="lightController" &&
          <LightController 
            lightOn={state.lightOn}
            handleChange={handleChange}
          />
        }
        {device.type==="temperatureAndHumidity" &&
          <TemperatureAndHumidity
            device={device}
            colorIndicator={colorIndicator}
          />
        }
      </CardContent>
      <CardActions>
        <Button
					to={`/devices/${device._id}`}
					component={ Link }
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
