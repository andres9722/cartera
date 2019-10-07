import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDFxhH23f1hl4H3hvx1TlDOVepYiE34Vp4",
  authDomain: "cartera-6f442.firebaseapp.com",
  databaseURL: "https://cartera-6f442.firebaseio.com",
  projectId: "cartera-6f442",
  storageBucket: "",
  messagingSenderId: "641914629584",
  appId: "1:641914629584:web:2d5b64fdacb881c80c1dd5",
  measurementId: "G-NLV67NE481"
};

const init = () => firebase.initializeApp(config);

const login = ({ email, password }) => {
  const provider = new firebase.auth().createUserWithEmailAndPassword(
    email,
    password
  );

  return provider;
};

const signOut = () => firebase.auth().signOut();

export { init, login, signOut };
