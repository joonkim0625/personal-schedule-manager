import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// initialize firebase
var config = {
  apiKey: "AIzaSyCHrCtlZb9qJU4Qgmv5Mn2dxPCrTGsUQxU",
  authDomain: "myplanner-app.firebaseapp.com",
  databaseURL: "https://myplanner-app.firebaseio.com",
  projectId: "myplanner-app",
  storageBucket: "myplanner-app.appspot.com",
  messagingSenderId: "554061046342"
};

firebase.initializeApp(config);

export default firebase;
