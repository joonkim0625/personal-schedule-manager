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
import Badge from "@material-ui/core/Badge";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  margin: {
    // margin: theme.spacing.unit * 1

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

// TODO: 나중에 url 값에 의하여 해당 캘린더 cell을 보여줄 수 있도록 설계해야 한다.

class Calendar extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentDate: new Date(),
  //     currentMonth: new Date()
  //   };
  // }

  componentDidMount() {
    //  일단 3월달 로 시작하게 만든 다음에 currentDate을 업데이트 해주면 될 수도..
    const today = startOfToday();

    this.setState({
      currentDate: today
    });
  }

  // handleDateChange = date => {
  //   this.setState({
  //     currentDate: date
  //   });
  // };

  // handleNextMonth = () => {
  //   this.setState({
  //     currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
  //   });
  // };

  // handlePrevMonth = () => {
  //   this.setState({
  //     currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
  //   });
  // };

  renderHeader() {
    const {
      currentMonth,
      handlePrevMonth,
      handleNextMonth,
      classes
    } = this.props;
    const dateFormat = "MMMM YYYY";
    const dateFormatMonth = "MMMM";
    const dateFormatYear = "YYYY";

    return (
      <div className="header row flex-middle">
        {/* <div className="col col-start">
          <span className="icon" onClick={handlePrevMonth}>
            <ArrowBackIcon />
          </span>
          <div className="col col-center">
            <span>{dateFns.format(currentMonth, dateFormat)}</span>
          </div>
          <div className="col col-end" onClick={handleNextMonth}>
            <span className="icon">
              <ArrowForwardIcon />
            </span>
          </div>
        </div> */}
        {/* --- */}
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

    // 선택된 날의 완료되지 않은 할 일 갯수

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
