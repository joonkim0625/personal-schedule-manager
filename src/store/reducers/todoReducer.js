const initState = {};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_TODO":
      console.log("created a new todo", action.todo);
      return state;

    case "CREATE_TODO_ERROR":
      console.log("creating a new todo failed", action.err);
      return state;

    case "UPDATE_STATUS":
      console.log("todo status updated", action.newStatus);
      return state;

    case "UPDATE_STATUS_ERROR":
      console.log("checking status failed", action.err);
      return state;

    case "EDIT_TODO":
      console.log("todo title edited", action.todo);
      return state;

    case "EDIT_TODO_ERROR":
      console.log("editing title failed", action.err);
      return state;

    case "DELETE_TODO":
      console.log("deleted a todo", action.todoName);
      return state;

    case "DELETE_TODO_ERROR":
      console.log("deleting a todo failed", action.err);
      return state;

    default:
      return state;
  }
};

export default todoReducer;
