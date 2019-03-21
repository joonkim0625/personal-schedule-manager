import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import classNames from "classnames";
// style sheet
import "./Calendar.css";
// date fns
import dateFns, { startOfToday } from "date-fns";
import isSameDay from "date-fns/is_same_day";

// material-ui

import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  margin: {
    margin: "6px",
    fontSize: "82.5%"
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  hidden: {
    visibility: "hidden"
  },
  yearText: {
    color: red[500]
  },
  monthText: {
    color: grey[900]
  }
});

class Calendar extends Component {
  componentDidMount() {
    const today = startOfToday();

    this.setState({
      currentDate: today
    });
  }

  renderHeader() {
    const {
      currentMonth,
      handlePrevMonth,
      handleNextMonth,
      classes
    } = this.props;

    const dateFormatMonth = "MMMM";
    const dateFormatYear = "YYYY";

    return (
      <div className="header row flex-middle">
        <div className="flexContainer">
          <span className="icon" onClick={handlePrevMonth}>
            <ArrowBackIcon />
          </span>

          {/* <span>{dateFns.format(currentMonth, dateFormat)}</span> */}
          <div>
            <span className={classes.monthText}>
              {dateFns.format(currentMonth, dateFormatMonth)}
            </span>
            <span> {dateFns.format(currentMonth, dateFormatYear)}</span>
          </div>

          <span onClick={handleNextMonth} className="icon">
            <ArrowForwardIcon />
          </span>
        </div>
      </div>
    );
  }

  renderDays() {
    const { currentMonth } = this.props;

    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`col col-center ${dateFns.format(
            dateFns.addDays(startDate, i),
            dateFormat
          )}`}
          key={i}
        >
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { handleDateChange, currentDate, currentMonth, classes } = this.props;

    const { todos, auth } = this.props;

    const authorId = auth.uid;

    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    let undoneTodosLength;
    let doneTodosLength;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        const hasTodo = containsTodo(todos, day, authorId);

        undoneTodosLength =
          todos &&
          todos
            .filter(item => item.authorId === auth.uid)
            .filter(
              item =>
                compareDates(item.date.toDate(), cloneDay) &&
                item.isComplete === false
            ).length;

        doneTodosLength =
          todos &&
          todos
            .filter(item => item.authorId === auth.uid)
            .filter(
              item =>
                compareDates(item.date.toDate(), cloneDay) &&
                item.isComplete === true
            ).length;

        days.push(
          <div
            className={classNames(
              `col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, currentDate)
                  ? "selected"
                  : ""
              } ${hasTodo ? "hasTodo" : ""}`,
              classes.cellStyle
            )}
            key={day}
            onClick={() => {
              handleDateChange(dateFns.parse(cloneDay));
              this.props.history.push(
                `/${dateFns.format(cloneDay, "MM-DD-YYYY")}`
              );
            }}
          >
            <span className="number badge1 " databadge={undoneTodosLength}>
              <span className="badge2" databadgedone={doneTodosLength} />
              {formattedDate}
            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <React.Fragment>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.firestore.ordered.todos,
    auth: state.firebase.auth
  };
};

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "contents", orderBy: ["createdAt", "desc"] },
    { collection: "todos", orderBy: ["createdAt"] }
  ])
)(withRouter(withStyles(styles)(Calendar)));

// todo가 있으면 달력에 표시를 해준다.
function containsTodo(todos, date, authorId) {
  return (
    todos &&
    todos.some(todo => {
      return isSameDay(todo.date.toDate(), date) && todo.authorId === authorId;
    })
  );
}

function compareDates(a, b) {
  return a && a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}
