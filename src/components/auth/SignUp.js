import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

// material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    fontFamily: "'Gamja Flower', cursive",
    marginTop: theme.spacing.unit * 3,
    color: "white",
    backgroundColor: "#24292e",
    "&:hover": {
      backgroundColor: "grey"
    }
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
    fontFamily: "'Gamja Flower', cursive"
  },
  errorMsg: {
    margin: "8px 0 0 0",
    fontFamily: "'Gamja Flower', cursive",
    textAlign: "center"
  },
  logInButton: {
    color: "white",
    backgroundColor: "#24292e",
    "&:hover": {
      backgroundColor: "grey"
    },
    fontFamily: "'Gamja Flower', cursive"
  },
  text: {
    marginTop: "20px"
  }
});

// link to

const LinkToLogIn = props => <RouterLink to="/login" {...props} />;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { classes, auth, authError } = this.props;

    if (auth.uid) return <Redirect to="/" />;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.fontStyle} component="h1" variant="h5">
            회원가입
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
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                className={classes.fontStyle}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                htmlFor="lastName"
              >
                성
              </InputLabel>
              <Input
                name="lastName"
                type="text"
                id="lastName"
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
                htmlFor="firstName"
              >
                이름
              </InputLabel>
              <Input
                name="firstName"
                type="text"
                id="firstName"
                onChange={this.handleChange}
                className={classes.fontStyle}
                classes={{
                  underline: classes.cssUnderline
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              등록하기
            </Button>
            <div>
              {authError ? (
                <p className={classes.errorMsg}>{authError}</p>
              ) : null}
            </div>
          </form>
          <div>
            <p className={classes.text}>이미 회원이신가요?</p>
            <Link component={LinkToLogIn} underline="none">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.logInButton}
              >
                로그인 하러가기
              </Button>
            </Link>
          </div>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
