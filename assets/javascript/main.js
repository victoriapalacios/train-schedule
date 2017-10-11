$( document ).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRLpQv-fQsfCIuajBJycgWC6KDhwOrzUc",
    authDomain: "employee-data-mgmt-e9e74.firebaseapp.com",
    databaseURL: "https://employee-data-mgmt-e9e74.firebaseio.com",
    projectId: "employee-data-mgmt-e9e74",
    storageBucket: "",
    messagingSenderId: "907972987819"
  };
  firebase.initializeApp(config);

  // Below is our variable that refrences the database
  var database = firebase.database();
  // Below are all our other variables with user inputs and calculating train times
  var name = '';
  var destination = '';
  var firstTrainTime = '';
  var frequency = '';
  var firstTimeConverted = '';
  var currentTime = '';
  var timeDifference = '';
  var tRemainder = '';
  var minutesTillTrain = '';
  var nextTrain = '';
  var nextTrainFormatted = '';
  var newTrain = '';

  //Below is our onClick function when we click "Submit"
  $("#submit-btn").on("click", function() {
    event.preventDefault();

    name = $("#name-input").val();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Below is how we use moment.js to calcualte time
    firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    currentTime = moment();
    timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = timeDifference % frequency;
    minutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

    // Create variables in firebase to match variables in js here so we can push and store our data
    newTrain = {
      name: name,
      destination: destination,
      frequency: frequency,
      nextTrainFormatted: nextTrainFormatted,
      minutesTillTrain: minutesTillTrain
    };

    //Below code is how we push iputs to firebase when we click submit
    database.ref().push(newTrain);
    // Below function is how we pull inputs into our table when we click submit
  });

  database.ref().on("child_added", function(snapshot) {
  // Below code is how we place our values into the table
  $(".train-schedule").append("<tr><td>"
    + snapshot.val().name + "<td>"
    + snapshot.val().destination + "</td>"
    + "<td>" + snapshot.val().frequency + "</td>"
    + "<td>" + snapshot.val().nextTrainFormatted + "</td>"
    + "<td>" + snapshot.val().minutesTillTrain +
    "</td></tr>");

  });
});
