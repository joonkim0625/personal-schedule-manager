import React, { Component } from "react";

import LoggedInLinks from "./LoggedInLinks";
import { connect } from "react-redux";

// styles

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Divider from "@material-ui/core/Divider";

import SidebarLinks from "./SidebarLinks";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    backgroundColor: "#24292e",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    position: "absolute",
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: "center"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  homeTextStyle: {
    margin: "0 auto"
  },
  linksStyle: {
    display: "flex",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

class Navbar extends Component {
  state = {
    open: false,
    now: new Date()
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };
  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };
  handleDrawerToggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const { classes, theme, profile, auth } = this.props;
    const { open } = this.state;

    console.log(auth.uid);
    return (
      <React.Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="static"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              {auth.uid ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
              ) : null}

              {auth.uid === undefined ? (
                <span className={classes.homeTextStyle}>
                  Personal Schedule Manager
                </span>
              ) : (
                <span className={classes.homeTextStyle}>
                  {profile.firstName}'s Schedule Manager
                </span>
              )}

              <div className={classes.linksStyle}>
                {auth.uid ? <LoggedInLinks /> : null}
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={open}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <SidebarLinks
              handleDrawerClose={this.handleDrawerClose}
              profile={profile}
            />
          </Drawer>
        </div>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Navbar)
);
