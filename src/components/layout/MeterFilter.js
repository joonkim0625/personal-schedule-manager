import React, { Component } from "react";
import PropTypes from "prop-types";
import Meter from "./Meter";
import { CurrentDateContext } from "../../contexts/CurrentDateContext";
import isSameDay from "date-fns/is_same_day";

// material-ui

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

// material-ui related functions

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  container: {
    width: "100%"
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    width: "calc(100% / 3)"
  },
  appBar: {
    backgroundColor: "#24292e"
  }
});

function compareDates(a, b) {
  return a && a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

class MeterFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null
    };
  }

  render() {
    const { todos, auth, currentDate } = this.props;
    const authorId = auth.uid;

    // 선택된 날의 할 일 개수

    let todayTodos =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(item => compareDates(item.date.toDate(), currentDate)).length;

    // 오늘 할 일 중 완료된 것의 수

    let finishedToday =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(
          item =>
            compareDates(item.date.toDate(), currentDate) &&
            item.isComplete === true
        ).length;

    let leftTodayTodos = finishedToday / todayTodos;
    // NaN값이 들어오면 0을 표기
    leftTodayTodos = leftTodayTodos ? finishedToday / todayTodos : 0;

    return (
      <React.Fragment>
        {containsTodo(todos, currentDate, authorId) ? (
          <Meter todos={todos} auth={auth} percent={leftTodayTodos} />
        ) : null}
      </React.Fragment>
    );
  }
}

MeterFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default props => {
  const HOC = withStyles(styles)(MeterFilter);

  return (
    <CurrentDateContext.Consumer>
      {({ state }) => (
        <HOC
          currentDate={state.currentDate}
          currentMonth={state.currentMonth}
          {...props}
        />
      )}
    </CurrentDateContext.Consumer>
  );
};

function containsTodo(todos, date, authorId) {
  return (
    todos &&
    todos.some(todo => {
      return isSameDay(todo.date.toDate(), date) && todo.authorId === authorId;
    })
  );
}
