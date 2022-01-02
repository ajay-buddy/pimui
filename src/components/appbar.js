import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import history from "../history";
import { ROUTES } from "../routes";
import { accessToken, removeAccessToken } from "../app/utils";
import Candidates from "../pages/admin";

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
            OTSOFTS
          </Typography>
          {!accessToken ? (
            <>
              <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.REGISTER)}>
                Register
              </Button>
            </>
          ) : (
            <>
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
              <Button color="inherit" onClick={() => navigate(ROUTES.PROFILE)}>
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.APPLICATIONS)}
              >
                Applications
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.CANDIDATES)}
              >
                Candidates
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.ADMINS)}>
                Admins
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.JOBS)}>
                Jobs
              </Button>
              {/* <Button color="inherit" onClick={() => navigate(ROUTES.VENDORS)}>
                Vendors
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.CUSTOMER)}>
                Customers
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.PURCHASE)}>
                Purchase
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.ORDERS)}>
                Orders
              </Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
