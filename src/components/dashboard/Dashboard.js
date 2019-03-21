import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import Calendar from "../calendar/Calendar";
import MeterFilter from "../layout/MeterFilter";
import NewTodoForm from "../todos/NewTodoForm";
import ShowDate from "../layout/ShowDate";
import NewTodoList from "../todos/NewTodoList";

import { CurrentDateContext } from "../../contexts/CurrentDateContext";

// material-ui

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// styles

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "12px"
  },
  expansionPanel: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center"
  },
  gridContainer: {
    flexWrap: "wrap-reverse"
  },

  todoGrid: {
    width: "100%",
    padding: "12px 0px 0px 0px !important"
  },
  calendarGrid: {
    width: "100%",
    padding: "0 0 0 1px !important"
  },
  todoGridContainer: {
    backgroundColor: "#24292e"
  },
  todoContainer: {
    minHeight: "190px"
  },
  sectionTitle: {
    margin: "20px 0 0 30px",
    color: "white",
    fontFamily: "'Gamja Flower', cursive",
    display: "inline-block"
  },
  showDate: {
    margin: "20px 0 0 20px"
  }
});

class Dashboard extends Component {
  render() {
    const {
      auth,
      todos,
      classes,
      currentDate,
      currentMonth,
      handleDateChange,
      handleMonthChange,
      handleNextMonth,
      handlePrevMonth
    } = this.props;

    // 할 일 퍼센트(전체) 계산을 위한 변수들
    let totalTodos =
      todos && todos.filter(item => item.authorId === auth.uid).length;

    let finishedTodos =
      todos &&
      todos
        .filter(item => item.authorId === auth.uid)
        .filter(item => item.isComplete === true).length;

    let leftTodos = finishedTodos / totalTodos;

    // 로그인이 되어있지 않다면 로그인 화면으로 리다이렉트
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid className={classes.gridContainer} container spacing={24}>
            <Grid
              className={classNames(
                classes.todoGrid,
                classes.todoGridContainer
              )}
              item
              sm={4}
              md={5}
              lg={5}
            >
              <ShowDate currentDate={currentDate} />
              <MeterFilter todos={todos} auth={auth} percent={leftTodos} />
              <NewTodoForm currentDate={currentDate} />

              <div>
                <div className={classes.todoContainer}>
                  <Typography className={classes.sectionTitle}>
                    오늘의 할 일
                  </Typography>
                  <NewTodoList
                    todos={todos}
                    auth={auth}
                    currentDate={currentDate}
                  />
                </div>
                <div className={classes.todoContainer}>
                  <Typography className={classes.sectionTitle}>
                    완료된 할 일
                  </Typography>
                  <NewTodoList
                    todos={todos}
                    auth={auth}
                    isDone
                    currentDate={currentDate}
                  />
                </div>
              </div>
            </Grid>
            <Grid className={classes.calendarGrid} item sm={8} md={7} lg={7}>
              <Calendar
                auth={auth}
                todos={todos}
                currentDate={currentDate}
                currentMonth={currentMonth}
                handleDateChange={handleDateChange}
                handleMonthChange={handleMonthChange}
                handleNextMonth={handleNextMonth}
                handlePrevMonth={handlePrevMonth}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

// loading data

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    todos: state.firestore.ordered.todos
  };
};

export default props => {
  const HOC = compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: "contents", orderBy: ["createdAt", "desc"] },
      { collection: "todos", orderBy: ["createdAt"] }
    ])
  )(withStyles(styles)(Dashboard));

  return (
    <CurrentDateContext.Consumer>
      {({
        state,
        handleDateChange,
        handleMonthChange,
        handleNextMonth,
        handlePrevMonth
      }) => (
        <HOC
          currentDate={state.currentDate}
          currentMonth={state.currentMonth}
          handleDateChange={handleDateChange}
          handleMonthChange={handleMonthChange}
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          {...props}
        />
      )}
    </CurrentDateContext.Consumer>
  );
};
