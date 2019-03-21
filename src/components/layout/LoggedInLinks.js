import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

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
    fontFamily: "'Gamja Flower', cursive"
  }
});

const LoggedInLinks = props => {
  const { classes, logOut } = props;
  return (
    <div className={classes.container}>
      {/* 커뮤니티와 캘린더를 넘나들 수 있게 */}

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
