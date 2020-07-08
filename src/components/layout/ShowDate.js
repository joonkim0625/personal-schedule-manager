import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

const styles = (theme) => ({
  dateText: {
    fontSize: "26px",
    color: "white",
    fontFamily: "'Nanum Gothic', cursive ",
  },

  redText: {
    color: red[500],
  },
  blueText: {
    color: blue[500],
  },
  container: {
    margin: "8px 0 0 28px",
  },
});

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

class ShowDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDay: this.props.currentDate.toLocaleDateString("en", {
        weekday: "long",
      }),
    };
  }

  render() {
    const { classes, currentDate } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.container}>
          <Typography className={classes.dateText}>
            <span>
              {currentDate.toLocaleString("en-US", { year: "numeric" })}
            </span>
            {` `}
            <span>
              {currentDate.toLocaleString("en-US", { month: "long" })}
            </span>{" "}
            <span>
              {currentDate.toLocaleDateString("en-US", { day: "numeric" })}
            </span>{" "}
            <span
              className={classNames(
                this.state.currentDay === "Sunday" ? classes.redText : "",
                this.state.currentDay === "Saturday" ? classes.blueText : "",
                classes.dateText
              )}
            >
              {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </span>
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

ShowDate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowDate);
