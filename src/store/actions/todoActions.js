import { getFirebase } from "react-redux-firebase";

export const createNewTodo = (date, todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database

    const firebase = getFirebase();
    const firestore = getFirestore();

    const authorId = getState().firebase.auth.uid;

    const todos = getState().firestore.ordered.todos;

    // 이게.. 무슨 그런.. 머랄까 .. 만들 때 조건을 통해서 없으면 생성하고 있으면 업데이트를 하게 해야할 것 같다.

    // const dateFilter = todos.find(todo => todo.createdAt === date);

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
