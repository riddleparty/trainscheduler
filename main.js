$(document).ready(function () {
    // 1. Link to Firebase
    var trainData = new Firebase("https://myfirstdbproject-eba81.firebaseio.com/");

    $("#addTrainButton").on("click", function () {

        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);

        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }

        trainData.push(newTrain);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        return false;
    });

    trainData.on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));

        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
});
