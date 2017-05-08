// ========================================== START CODING BELOW!!

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC8AFu-Kbh6uHWzKSvxnZzXf5QFwvzasFI",
    authDomain: "train-time-3b050.firebaseapp.com",
    databaseURL: "https://train-time-3b050.firebaseio.com",
    projectId: "train-time-3b050",
    storageBucket: "train-time-3b050.appspot.com",
    messagingSenderId: "643705476807"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;
var trainTime;


// Capture Button Click
$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  // Grabbed values from text boxes
  name = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#train-time").val().trim();
  frequency = $("#frequency").val().trim();


  // Code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    trainTime: firebase.database.ServerValue.TIMESTAMP,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
  });
  $("#add-train").trigger("reset");
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

  $("#display").append(
     "<tr><td id='name-display'> " + childSnapshot.val().name +
     " </td><td id='role-display'> " + childSnapshot.val().destination +
     " </td><td id='date-display'> " + "Every "+ childSnapshot.val().frequency + " min" +
     " </td><td id='date-display'> " + childSnapshot.val().nextArrival +
     " </td><td id='rate-display'> " + childSnapshot.val().minutesAway +
     " </td></tr>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

});

var date = '2015-04-03';
var format = 'LLLL';
var result = moment(date).format(format);
console.log(result);

var date = new Date('2014/12/31');
var dateString = new Date(date.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
var dateStringNew = moment.(date).add(1, 'day').add(6, 'months').format(1);

console.log(dateString);
