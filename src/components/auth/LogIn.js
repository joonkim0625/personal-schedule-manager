import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { logIn } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import classNames from "classnames";

// img
import logo from "../../images/schedule-logo.png";
// material-ui
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "@material-ui/core/Link";

// styles

const styles = theme => ({
  root: {},
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  img: {
    width: "4rem",
    marginBottom: "20px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    fontFamily: "'Nanum Gothic', cursive",
    marginTop: theme.spacing.unit * 3,
    color: "white",
    backgroundColor: "#24292e",
    "&:hover": {
      backgroundColor: "grey"
    }
  },
  button: {
    color: "white",
    backgroundColor: "#24292e"
  },
  text: {
    marginTop: "20px"
  },
  registerButton: {
    color: "white",
    backgroundColor: "#24292e",
    "&:hover": {
      backgroundColor: "grey"
    },
    fontFamily: "'Nanum Gothic', cursive"
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#24292e"
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "grey"
    }
  },
  fontStyle: {
    fontFamily: "'Nanum Gothic', cursive"
  },
  errorMsg: {
    margin: "8px 0 0 0",
    fontFamily: "'Nanum Gothic', cursive",
    textAlign: "center"
  }
});

// link to

const LinkToSignUp = props => <RouterLink to="/signup" {...props} />;

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state);
  };

  render() {
    const { classes, authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <main className={classNames(classes.main, classes.root)}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div>
            <img className={classes.img} alt="logo" src={logo} />
          </div>
          <Typography className={classes.fontStyle} component="h1" variant="h5">
            로그인
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                className={classes.fontStyle}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                htmlFor="email"
              >
                이메일
              </InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoFocus
                onChange={this.handleChange}
                className={classes.fontStyle}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                className={classes.fontStyle}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                htmlFor="password"
              >
                비밀번호
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.handleChange}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              접속하기
            </Button>
            <div>
              {authError ? (
                <p className={classes.errorMsg}>{authError}</p>
              ) : null}
            </div>
          </form>
          <div>
            <p className={classes.text}>아직 회원이 아니신가요?</p>
            <Link component={LinkToSignUp} underline="none">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.registerButton}
              >
                회원가입
              </Button>
            </Link>
          </div>
          <div />
        </Paper>
      </main>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

// authError를 받아오기 위해
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispactchToProps = dispatch => {
  return {
    logIn: creds => dispatch(logIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispactchToProps
)(withStyles(styles)(LogIn));
