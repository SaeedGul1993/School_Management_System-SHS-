import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAkBOZ8KwoZX8rjeJBTj8YJJ0wH99eZF2Y",
    authDomain: "schoolmanagementsystem-33759.firebaseapp.com",
    databaseURL: "https://schoolmanagementsystem-33759.firebaseio.com",
    projectId: "schoolmanagementsystem-33759",
    storageBucket: "schoolmanagementsystem-33759.appspot.com",
    messagingSenderId: "587954978887",
    appId: "1:587954978887:web:032d9ce49b7565dbb8b162",
    measurementId: "G-R65HF37P4J"
  };

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;