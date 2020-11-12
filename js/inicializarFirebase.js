// Initialize Firebase
var config = {
    apiKey: "AIzaSyDPkdHQymoKSG_ka7HAsKkiQHMPme0C4aM",
    authDomain: "covid-rama-cea91.firebaseapp.com",
    databaseURL: "https://covid-rama-cea91.firebaseio.com",
    projectId: "covid-rama-cea91",
    storageBucket: "covid-rama-cea91.appspot.com",
    messagingSenderId: "352039329940",
    appId: "1:352039329940:web:f1748879a41b23d52a9481",
    measurementId: "G-5EZD4LDK6V"
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();