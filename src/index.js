import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import CurrentDateProvider from "./contexts/CurrentDateContext";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore
      })
    ),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
  )
);

// auth가 확인된 뒤에 렌더링을 해주도록 함.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <CurrentDateProvider>
        <App />
      </CurrentDateProvider>
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
});
