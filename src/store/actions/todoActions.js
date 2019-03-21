export const createNewTodo = (date, todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database

    const firestore = getFirestore();

    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("todos")
      .add({
        todo,
        createdAt: new Date(),
        date: date,
        authorId,
        isComplete: false
      })
      .then(() => {
        dispatch({
          type: "CREATE_TODO",
          // todo: todo
          todo
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_TODO_ERROR",
          err
        });
      });
  };
};

export const checkTodo = (todoId, newStatus) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("todos")
      .doc(todoId)
      .update({
        isComplete: newStatus
      })
      .then(() => {
        dispatch({
          type: "UPDATE_STATUS",
          newStatus
        });
      })
      .catch(err => {
        dispatch({
          type: "UPDATE_STATUS_ERROR",
          err
        });
      });
  };
};

export const editTodo = (todoId, todo) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("todos")
      .doc(todoId)
      .update({
        todo: todo
      })
      .then(() => {
        dispatch({
          type: "EDIT_TODO",
          todo
        });
      })
      .catch(err => {
        dispatch({
          type: "EDIT_TODO_ERROR",
          err
        });
      });
  };
};

// 수정 필요함 매개변수 등등
export const deleteTodo = todoId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // const firebase = getFirebase();
    firestore
      .collection("todos")
      .doc(todoId)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_TODO"
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_TODO_ERROR",
          err
        });
      });
  };
};
