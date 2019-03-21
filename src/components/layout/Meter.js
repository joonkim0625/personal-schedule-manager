import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  customWidth: {
    maxWidth: 500
  },
  noMaxWidth: {
    maxWidth: "none"
  },
  container: {
    marginTop: "20px",
    display: "flex",
    marginLeft: "25px",
    alignItems: "center",
    minWidth: "310px"
  },
  textPercent: {
    fontSize: "15px",
    marginLeft: "15px"
  }
});

const toolTipText = "오늘 할 일 목록의 진행 상황을 보여주는 막대입니다.";

class Meter extends Component {
  static defaultProps = {
    percent: 0, // a number between 0 and 1, inclusive
    width: 100, // the overall width
    height: 10, // the overall height
    rounded: true, // if true, use rounded corners
    color: "#4caf50", // the fill color
    animate: false, // if true, animate when the percent changes
    label: "showing the percentage of completed tasks", // a label to describe the contents (for accessibility)
    leftTodos: 0
  };

  render() {
    const {
      percent,
      width,
      height,
      label,
      rounded,
      animate,
      color,
      classes
    } = this.props;

    let r = rounded ? Math.ceil(height / 2) : 0;
    let w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
    let style = animate ? { transition: "width 500ms, fill 250ms" } : null;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Tooltip title={toolTipText}>
            <svg width={width} height={height} aria-label={label}>
              <rect width={width} height={height} fill="#ccc" rx={r} ry={r} />
              <rect
                width={w}
                height={height}
                fill={color}
                rx={r}
                ry={r}
                style={style}
              />
            </svg>
          </Tooltip>
          <span className={classes.textPercent}>
            {" "}
            {(percent * 100).toFixed(0)} % 완료
          </span>
        </div>
      </React.Fragment>
    );
  }
}

Meter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Meter);
