import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";

// material-ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Link as RouterLink } from "react-router-dom";

const styles = theme => ({
  text: {
    fontFamily: "'Gamja Flower', cursive"
  }
});

const SidebarLinks = props => {
  const { handleDrawerClose, logOut, profile, classes } = props;
  return (
    // 대쉬보드로의 이동도 이곳에서 가능해야 함.
    <div>
      <div>
        <p className={classes.text}>{profile.firstName}님, 환영합니다!</p>
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
          로그아웃
        </Button>
      </div>

      {/* 로그인을 무조건 먼저 해야되는 프로그램이라면 이 로그인 버튼이 필요없을 수도 있다. */}
      {/* <Link onClick={handleDrawerClose} component={LinkToLogIn}>
        로그인
      </Link> */}
    </div>
  );
};

SidebarLinks.propTypes = {
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
)(withStyles(styles)(SidebarLinks));
