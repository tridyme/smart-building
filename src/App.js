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
import Spaces from './Views/Spaces/';
import SpaceDescription from './Views/Spaces/Scenes/SpaceDescription';
import Sensors from './Views/Sensors/';
import SensorInformation from './Views/Sensors/Scenes/SensorInformation';
import blue from '@material-ui/core/colors/blue';

import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const App = () => {
  // window.location.reload(true);
  // React.useEffect(() => {
  //   window.location.reload(true);
  // }, []);
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
            <Route exact path="/sensors" component={Sensors} />
            <Route exact path="/sensors/:id" component={SensorInformation} />
            <Route exact path="/spaces" component={Spaces} />
            <Route exact path="/spaces/:id" component={SpaceDescription} />
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
    { text: "Spaces", link: "/spaces", icon: "home_work" },
  ],
  MenuSideBarInf: [
    { text: "Sensors", link: "/sensors", icon: "important_devices" },
  ]
};
