import authReducer from "./authReducer";

import todoReducer from "./todoReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,

  firestore: firestoreReducer,
  // auth와 관련된 데이터를 firebase로부터 가져온다.
  firebase: firebaseReducer,
  todo: todoReducer
});

export default rootReducer;
