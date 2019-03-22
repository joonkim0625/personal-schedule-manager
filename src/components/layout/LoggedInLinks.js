import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex"
  },
  button: {
    color: "white",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "grey"
    },
    fontFamily: "'Nanum Gothic', cursive"
  }
});

const LoggedInLinks = props => {
  const { classes, logOut } = props;
  return (
    <div className={classes.container}>
      <Button className={classes.button} onClick={logOut}>
        로그아웃
      </Button>
    </div>
  );
};

LoggedInLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(LoggedInLinks));
