
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
var trainName = "";
var destination = "";
var firstTrainTime;
var frequency;
var nextArrival = 0;
var minutesAway = 0;
var trainTimeTwo;
var currentTime = moment();

// Capture Button Click
$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  // Grabbed values from text boxes
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#train-time").val().trim();
  frequency = $("#frequency").val().trim();
  // trainTimeTwo is parsed and formated for readability in firebase
  trainTimeTwo = moment(firstTrainTime, 'hh:mm').format('hh:mm a');

  // Code for handling the push
  database.ref().push({
    //firebase ref name : js variable name
    trainName: trainName,
    destination: destination,
    submitedTimestamp: firebase.database.ServerValue.TIMESTAMP,
    trainTime_24h: firstTrainTime,
    trainTime_12h: trainTimeTwo,
    frequency_in_minutes: frequency,

  });
  $("#add-train").trigger("reset");
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    //find the difference between nextArrival time and current time.
    // console.log("current time is: " + moment(currentTime).format('hh:mm a'));

    var tFrequency = childSnapshot.val().frequency_in_minutes;
    // console.log("the frequency is: " + tFrequency);

    // pulls the first train time from firebase
    var firstTime = moment(childSnapshot.val().trainTime_12h, 'hh:mm a');
    // console.log("Starting time called firstTime is: " + moment(firstTime).format('hh:mm a'));

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log("First time in timestamp: " + firstTimeConverted);
    // console.log(moment(firstTimeConverted).format('LT'));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime + " minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // console.log("<--------------------------------------------------------------->");    
    

  $("#display").append(
     " <tr><td id='name-display'> " + childSnapshot.val().trainName +
     " </td><td id='destination-display'> " + childSnapshot.val().destination +
     " </td><td id='frequency-display'> " + "Every "+ childSnapshot.val().frequency_in_minutes + " min" +
     " </td><td id='nextArrival-display'> " + moment(nextTrain).format("hh:mm A") +
     " </td><td id='minutesAway-display'> " + tMinutesTillTrain + " minutes away" +
     " </td></tr>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

});



//--------------------------------QUESTIONS--------------------------------------
//How does the table know to update or loop for entries?

// var firstTime = moment(childSnapshot.val().trainTime_24h, 'hh:mm');
//     var arrivalTime = moment(childSnapshot.val().nextArrival, 'hh:mm A');
//     var duration = moment.duration(arrivalTime.diff(currentTime));
//     var hours = parseInt(duration.asHours());
//     var minutes = parseInt(duration.asMinutes());// -hours*60;
//     console.log("start time: " + moment(arrivalTime).format('LT'));
//     console.log("current time: " + moment(currentTime).format('LT'));
//     console.log(hours + ' hour and '+ minutes+' minutes');