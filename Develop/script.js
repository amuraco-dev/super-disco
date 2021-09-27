// Time Variables for Functions
var timeID = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4", "#5"];
var timeSlots = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];
var alteredtimeSlots = [
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
];

// Local Storage Variables
var planner = [];
var localStorageData = JSON.parse(localStorage.getItem("planner-items"));

// Planner Functions that track time slots and update based on time of day

if (localStorageData !== null) {
  planner = localStorageData;
}

for (var i = 0; i < timeID.length; i++) {
  var descriptions = $(timeID[i]);
  var buttons = descriptions.parent().parent().find("button");

  if (
    moment().format("MMMM Do YYYY, HH:mm:ss") <
    moment().format("MMMM Do YYYY") + ", " + timeSlots[i]
  ) {
    descriptions.attr("class", "future");
    planner.forEach(function (item) {
      if (idsCollection[i] === "#" + item["input-id"]) {
        descriptions.val(item["input-value"]);
      }
    });
  } else if (
    moment().format("MMMM Do YYYY, HH:mm:ss") >=
      moment().format("MMMM Do YYYY") + ", " + timeSlots[i] &&
    moment().format("MMMM Do YYYY, HH:mm:ss") <
      moment().format("MMMM Do YYYY") + ", " + alteredtimeSlots[i]
  ) {
    descriptions.attr("class", "present");
    $(".present").attr("disabled", "disabled");
    buttons.attr("disabled", true);
    planner.forEach(function (item) {
      if (idsCollection[i] === "#" + item["input-id"]) {
        descriptions.val(item["input-value"]);
      }
    });
  } else if (
    moment().format("MMMM Do YYYY, HH:mm:ss") >
    moment().format("MMMM Do YYYY") + ", " + alteredtimeSlots[i]
  ) {
    descriptions.attr("class", "past");
    $(".past").attr("disabled", "disabled");
    buttons.attr("disabled", true);
  }
}

// Variables and function for on click functionality

$("button").on("click", function() {
    event.preventDefault();
    var container = $(this).parent().parent();  
    var inputValue = container.find("input").val();
    var inputId = container.find("input").attr("id");
    var textObj = {
      "input-id": inputId,
      "input-value": inputValue };
    
    if (textObj["input-value"] !== "") {
      planner.push(textObj);
      localStorage.setItem("planner-items", JSON.stringify(planner));
    }
  });