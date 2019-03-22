import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewTodo } from "../..//store/actions/todoActions";
import classNames from "classnames";

// material-ui

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  form: {
    margin: "20px 0 0 20px"
  },
  input: {
    margin: theme.spacing.unit,
    fontSize: "1.2rem",
    width: "60%",
    minWidth: "45%",
    borderBottom: "1px solid white",
    color: "white",
    fontFamily: "Nanum Gothic"
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "transparent"
    }
  }
});

class NewTodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
      date: this.props.currentDate
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    const { todo } = this.state;
    const { currentDate } = this.props;

    e.preventDefault();

    if (todo.trim() === "") {
      return false;
    }

    this.props.createNewTodo(currentDate, todo);

    this.setState({
      todo: ""
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Input
            placeholder="할 일을 적어주세요!"
            className={classNames(classes.input, classes.cssUnderline)}
            id="todo"
            type="text"
            name="newTodo"
            value={this.state.todo}
            onChange={this.handleChange}
            required
          />
        </form>
      </div>
    );
  }
}

NewTodoForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewTodo: (date, todo) => dispatch(createNewTodo(date, todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewTodoForm));
