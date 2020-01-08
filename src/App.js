import React, { Component } from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import history from './history';
import Drawer from './Components/Drawer';
import PersistentDrawer from './Components/PersistentDrawer';
import Dashboard from './Views/Dashboard/';
import Devices from './Views/Devices/';
import Rooms from './Views/Rooms/';
import ArchicadPlugin from './Views/ArchicadPlugin/ArchicadPluginViewer';
import RoomDescription from './Views/Rooms/Scenes/RoomDescription';
import DeviceInformation from './Views/Devices/Scenes/DeviceInformation';

import blue from '@material-ui/core/colors/blue';

import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            // light: will be calculated from palette.primary.main,
            main: '#000000',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            //light: '#0066ff',
            main: '#ff0000',
            // dark: will be calculated from palette.secondary.main,
            //contrastText: '#ffcc00',
          },
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <PersistentDrawer
          title="Smart Building"
          menu={Menu}
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/devices" component={Devices} />
            <Route exact path="/devices/:id" component={DeviceInformation} />
            <Route exact path="/rooms" component={Rooms} />
            <Route exact path="/rooms/:id" component={RoomDescription} />
            <Route exact path="/archicadPlugin" component={ArchicadPlugin} />
          </Switch>
        </PersistentDrawer>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const Menu = {
  MenuNavBar: [
    { text: "", link: "", icon: "" }
  ],
  MenuSideBarSup: [
    { text: "Dashboard", link: "/dashboard", icon: "dashboard" },
    { text: "Devices", link: "/devices", icon: "important_devices" },
    { text: "Rooms", link: "/rooms", icon: "home_work" },
    { text: "Rooms", link: "/archicadPlugin", icon: "home_work" },
  ],
  MenuSideBarInf: [
    { text: "Rooms", link: "/archicadPlugin", icon: "home_work" }
  ]
};
