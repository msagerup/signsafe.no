const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyC7g93kmgarhYMnINU0knYn4U6Km6WhqdY",
    authDomain: "signsafe-62b14.firebaseapp.com",
    databaseURL: "https://signsafe-62b14.firebaseio.com",
    projectId: "signsafe-62b14",
    storageBucket: "signsafe-62b14.appspot.com",
    messagingSenderId: "131323910439",
    appId: "1:131323910439:web:025bacd8328b81e1b7b102",
    measurementId: "G-CYRN7381XF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  module.exports = {firebase}