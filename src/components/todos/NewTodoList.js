import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteTodo } from "../../store/actions/todoActions";
import { checkTodo } from "../../store/actions/todoActions";
import { editTodo } from "../../store/actions/todoActions";

import ContentEditable from "react-contenteditable";
import classNames from "classnames";

// material-ui
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import green from "@material-ui/core/colors/green";

const styles = (theme) => ({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500],
    },
  },
  checked: {},

  checkBox: {
    color: grey[400],
  },
  textStyle: {
    color: grey[100],
    fontSize: "1.1rem",
    display: "inline-block",
  },
  icon: {
    color: grey[300],
    fontSize: "1.2rem",
    marginLeft: "10px",
    cursor: "pointer",
  },

  todoListBox: {
    display: "table",
    fontFamily: "'Nanum Gothic', cursive",
  },
  todoListItems: {
    display: "table-cell",
    verticalAlign: "middle",
    fontFamily: "'Nanum Gothic', cursive",
  },
});

// 작성 날짜 비교
function compareDates(a, b) {
  return a && a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

class NewTodoList extends Component {
  deleteTodo = (todoId) => {
    this.props.deleteTodo(todoId);
  };

  checkTodo = (key, newStatus) => {
    this.props.checkTodo(key, newStatus);
  };

  editTodo = (todoId, todo) => {
    this.props.editTodo(todoId, todo);
  };

  disableNewlines = (event) => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  validateNumber = (event) => {
    const keyCode = event.keyCode || event.which;
    const string = String.fromCharCode(keyCode);
    const regex = /[0-9,]|\./;

    if (!regex.test(string)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  pasteAsPlainText = (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand("selectAll", false, null);
    }, 0);
  };

  // clearTimeOut을 위한 변수
  timer = null;

  render() {
    const { currentDate } = this.props;
    const { todos, isDone, auth, classes } = this.props;

    const renderTodoList = currentDate ? (
      <div>
        <ul>
          {todos &&
            todos
              .filter((item) => item.authorId === auth.uid)
              .filter((item) =>
                isDone
                  ? item.isComplete &&
                    compareDates(item.date.toDate(), currentDate)
                  : !item.isComplete &&
                    compareDates(item.date.toDate(), currentDate)
              )
              .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())
              .map((item) => {
                return (
                  <div key={item.id} className={classes.todoListBox}>
                    <Checkbox
                      className={classNames(
                        classes.todoListItems,
                        classes.checkBox
                      )}
                      type="checkbox"
                      checked={item.isComplete}
                      onChange={() => this.checkTodo(item.id, !item.isComplete)}
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                    <Typography
                      className={classNames(
                        classes.textStyle,
                        classes.todoListItems
                      )}
                    >
                      <Tooltip title="Click to edit.">
                        <ContentEditable
                          html={item.todo}
                          onKeyPress={this.disableNewlines}
                          onPaste={this.pasteAsPlainText}
                          onFocus={this.highlightAll}
                          onChange={(e) => {
                            clearTimeout(this.timer);
                            let value = e.target.value;
                            this.timer = setTimeout(() => {
                              this.editTodo(item.id, value);
                            }, 1000);
                          }}
                          // handle innerHTML change
                          tagName="span"
                        />
                      </Tooltip>
                    </Typography>

                    <span
                      className={classes.todoListItems}
                      onClick={() => this.deleteTodo(item.id)}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon
                          className={classNames(
                            classes.icon,
                            classes.todoListItems
                          )}
                        />
                      </Tooltip>
                    </span>
                  </div>
                );
              })}
        </ul>
      </div>
    ) : null;

    return <div>{renderTodoList}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    checkTodo: (todoId, newStatus) => dispatch(checkTodo(todoId, newStatus)),
    editTodo: (todoId, todo) => dispatch(editTodo(todoId, todo)),
  };
};

NewTodoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(NewTodoList));
