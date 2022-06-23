import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import history from "../history";
import { PAGELIMIT, ROUTES } from "../routes";
import { accessToken, removeAccessToken } from "../app/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const navigate = (route) => (window.location.href = route);

export default function HeaderAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CBrains
          </Typography>
          {!accessToken ? (
            <>
              <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </Button>
              {/* <Button color="inherit" onClick={() => navigate(ROUTES.REGISTER)}>
                Register
              </Button> */}
            </>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  removeAccessToken();
                  window.location.reload();
                }}
              >
                Logout
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.HOME)}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(`${ROUTES.CANDIDATES}?limit=${PAGELIMIT}&page=1`)}
              >
                Candidates
              </Button>
              <Button color="inherit" onClick={() => navigate(`${ROUTES.ADMIN}?limit=${PAGELIMIT}&page=1`)}>
                Admins
              </Button>

              <Button color="inherit" onClick={() => navigate(`${ROUTES.SPOCS}?limit=${PAGELIMIT}&page=1`)}>
                Spoc
              </Button>
              <Button color="inherit" onClick={() => navigate(`${ROUTES.JOB}?limit=${PAGELIMIT}&page=1`)}>
                Job
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(`${ROUTES.APPLICATIONS}?limit=${PAGELIMIT}&page=1`)}
              >
                Applications
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
