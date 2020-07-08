import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewTodo } from "../..//store/actions/todoActions";
import classNames from "classnames";

// material-ui

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  form: {
    margin: "20px 0 0 20px",
  },
  disabled: {
    display: "inline-block",
    margin: "15px 0 0 5px",
    fontSize: "1.2rem",

    color: "#f44336",
    fontFamily: "Nanum Gothic",
    cursor: "not-allowed",
  },
  input: {
    margin: theme.spacing.unit,
    fontSize: "1.2rem",

    minWidth: "45%",
    borderBottom: "1px solid white",
    color: "white",
    fontFamily: "Nanum Gothic",
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "transparent",
    },
  },
});

class NewTodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
      date: this.props.currentDate,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const { todo } = this.state;
    const { currentDate } = this.props;

    e.preventDefault();

    if (todo.trim() === "") {
      return false;
    }

    this.props.createNewTodo(currentDate, todo);

    this.setState({
      todo: "",
    });
  };

  render() {
    const { classes, todos, currentDate, auth } = this.props;

    let undoneTodosLength =
      todos &&
      todos
        .filter((item) => item.authorId === auth.uid)
        .filter(
          (item) =>
            compareDates(item.date.toDate(), currentDate) &&
            item.isComplete === false
        ).length;

    let doneTodosLength =
      todos &&
      todos
        .filter((item) => item.authorId === auth.uid)
        .filter(
          (item) =>
            compareDates(item.date.toDate(), currentDate) &&
            item.isComplete === true
        ).length;

    return (
      <div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          {doneTodosLength >= 20 || undoneTodosLength >= 20 ? (
            <p className={classNames(classes.disabled, classes.cssUnderline)}>
              There are too many things to do! Get some rest please.
            </p>
          ) : (
            <Input
              placeholder="What is your plan?"
              className={classNames(classes.input, classes.cssUnderline)}
              id="todo"
              type="text"
              name="newTodo"
              value={this.state.todo}
              onChange={this.handleChange}
              required
            />
          )}
        </form>
      </div>
    );
  }
}

NewTodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewTodo: (date, todo) => dispatch(createNewTodo(date, todo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewTodoForm));

function compareDates(a, b) {
  return a && a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}
