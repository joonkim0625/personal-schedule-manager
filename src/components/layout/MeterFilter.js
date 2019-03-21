import React, { Component } from "react";
import PropTypes from "prop-types";
import Meter from "./Meter";
import { CurrentDateContext } from "../../contexts/CurrentDateContext";
import isSameDay from "date-fns/is_same_day";

// material-ui

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  // button: {
  //   margin: theme.spacing.unit
  // },
  // customWidth: {
  //   maxWidth: 500
  // },
  // noMaxWidth: {
  //   maxWidth: "none"
  // }
});

// const toolTipText =
//   "작성된 할 일의 진행상황을 보여주는 막대입니다. 전체 할 일은 등록된 모든 할 일, 이 달의 할 일은 현재 보고있는 달에 등록된 할 일, 그리고 오늘의 할 일은 보고있는 해당 날의 등록된 할 일들을 나타냅니다.";

// **********

function compareDates(a, b) {
  return a && a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

class MeterFilter extends Component {
  // static defaultProps = {
  //   value: null
  // };
  constructor(props) {
    super(props);

    this.state = {
      value: 2,
      expanded: null
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  // **********
  // TODO: 토글이 발생할 때 필터 업데이트가 안되도록..

  // componentDidMount() {
  //   this.setState({
  //     value: this.props.value
  //   });
  // }

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  // handleTodayMeter = () => {
  //   this.setState({
  //     selected: "todayMeter"
  //   });
  // };
  // handleMonthMeter = () => {
  //   this.setState({
  //     selected: "monthMeter"
  //   });
  // };
  // handleAllMeter = () => {
  //   this.setState({
  //     selected: "allMeter"
  //   });
  // };

  render() {
    const { todos, auth, currentDate, currentMonth, classes } = this.props;

    // 전체 할 일 개수
    let totalTodos =
      todos && todos.filter(item => item.authorId === auth.uid).length;

    // 선택된 달의 할 일 개수
    let monthTodos =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(
          item =>
            new Date(item.date.toDate()).getMonth() === currentMonth.getMonth()
        ).length;
    // 선택된 날의 할 일 개수

    let todayTodos =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(item => compareDates(item.date.toDate(), currentDate)).length;

    // 전체 할 일 중 완료된 것들
    let finishedAll =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(item => item.isComplete === true).length;
    // 이번 달 할 일 중 완료된 것들

    let finishedMonth =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(
          item =>
            new Date(item.date.toDate()).getMonth() ===
              currentMonth.getMonth() && item.isComplete === true
        ).length;

    // 오늘 할 일 중 완료된 것들

    let finishedToday =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(
          item =>
            compareDates(item.date.toDate(), currentDate) &&
            item.isComplete === true
        ).length;

    // 각각의 완료 퍼센트
    let leftAllTodos = finishedAll / totalTodos;

    leftAllTodos = leftAllTodos ? finishedAll / totalTodos : 0;

    let leftMonthTodos = finishedMonth / monthTodos;

    leftMonthTodos = leftMonthTodos ? finishedMonth / monthTodos : 0;
    // let leftTodayTodos = finishedToday / todayTodos;

    let leftTodayTodos = finishedToday / todayTodos;
    // NaN값이 들어오면 0을 표기
    leftTodayTodos = leftTodayTodos ? finishedToday / todayTodos : 0;

    // console.log(leftAllTodos, leftMonthTodos, leftTodayTodos);

    const { value, expanded } = this.state;

    const authorId = auth.uid;

    return (
      <React.Fragment>
        {/* <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab className={classes.tabs} label="전체 할 일" />
              <Tab className={classes.tabs} label="이 달의 할 일" />
              <Tab className={classes.tabs} label="오늘의 할 일" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              {" "}
              <Meter todos={todos} auth={auth} percent={leftAllTodos} />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              {" "}
              <Meter todos={todos} auth={auth} percent={leftMonthTodos} />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              {" "}
              <Meter todos={todos} auth={auth} percent={leftTodayTodos} />
            </TabContainer>
          )}
        </div> */}

        {/* ------ */}
        {/* <div className="buttons">
          <button
            className={this.state.selected === "allMeter" ? "active" : ""}
            onClick={this.handleAllMeter}
          >
            전체 할 일 완료 상황
          </button>
          <button
            className={this.state.selected === "monthMeter" ? "active" : ""}
            onClick={this.handleMonthMeter}
          >
            이 달의 할 일 완료 상황
          </button>
          <button
            className={this.state.selected === "todayMeter" ? "active" : ""}
            onClick={this.handleTodayMeter}
          >
            오늘의 할 일 완료 상황
          </button>
        </div>
        <div>
          {this.state.selected === "allMeter" ? (
            <Meter todos={todos} auth={auth} percent={leftAllTodos} />
          ) : this.state.selected === "monthMeter" ? (
            <Meter todos={todos} auth={auth} percent={leftMonthTodos} />
          ) : this.state.selected === "todayMeter" ? (
            <Meter todos={todos} auth={auth} percent={leftTodayTodos} />
          ) : null}
        </div> */}
        {/* ------ */}
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
