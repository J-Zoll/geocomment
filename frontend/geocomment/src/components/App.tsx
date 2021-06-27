import LoginView from "./LoginView";
import MapView from "./MapView";
import HistoryView from "./HistoryView";
import ThreadView from "./ThreadView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  ThemeProvider,
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
import React from "react";
import RegisterView from "./RegisterView";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import ReportsView from "./ReportsView";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#ffe54c",
      main: "#ffb300",
      dark: "#c68400",
      contrastText: "#000",
    },
    secondary: {
      light: "#8bf6ff",
      main: "#4fc3f7",
      dark: "#0093c4",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const [userCredentials, setUserCredentials] = React.useState({
    email: "",
    userid: 0,
    token: "",
  });

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">MapView</Link>
              </li>
              <li>
                <Link to="/login">LoginView</Link>
              </li>
              <li>
                <Link to="/history">HistoryView</Link>
              </li>
              <li>
                <Link to="/thread">ThreadView</Link>
              </li>
              <li>
                <Link to="/register">RegisterView</Link>
              </li>
              <li>
                <Link to="/report">ReportView</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Title
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/login"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <UserContext.Provider value={{ userCredentials, setUserCredentials }}>
            <Switch>
              <Route path="/login">
                <LoginView />
              </Route>
              <Route path="/history">
                <HistoryView />
              </Route>
              <Route path="/thread">
                <ThreadView
                  thread={{
                    id: 1,
                    title: "Title",
                    description: "dfsah[img:http://http.cat/201]",
                    location: { lat: 1, lng: 2 },
                  }}
                />
              </Route>
              <Route path="/register">
                <RegisterView />
              </Route>
              <Route path="/report">
                <ReportsView />
              </Route>
              <Route path="/">
                <MapView />
              </Route>
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
