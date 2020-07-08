import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";

// material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  text: {
    fontFamily: "'Nanum Gothic', cursive",
  },
});

const SidebarLinks = (props) => {
  const { handleDrawerClose, logOut, profile, classes } = props;
  return (
    <div>
      <div>
        <p className={classes.text}>Hello {profile.firstName}, Welcome!</p>
      </div>

      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            handleDrawerClose();
            logOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

SidebarLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SidebarLinks));
