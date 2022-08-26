var TimerRunning;
var IdleTime;
var TimerPause;

async function apiOnTabClose() {
  let res = await fetch("https://dummy.restapiexample.com/api/v1/create", {
    method: 'POST',
    body: JSON.stringify({
      "name":"Ankur",
      "salary":"50,00,000",
      "age":"32"
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
}

function startTimer() {
  var player = GetPlayer();
  var TotalTimeSpent = player.GetVar("TimeSpent");
  setIdleTimeout(IdleTime * 1000);
  TimerRunning = true;
  intervals = setInterval(function () {
    if (!TimerPause) {
      TotalTimeSpent = TotalTimeSpent + 1;
      player.SetVar("TimeSpent", TotalTimeSpent);
      console.log("TimeSpent", TotalTimeSpent);
    }
  }, 1000);
}

function exe_at_interval() {
  setInterval(function () {
    var endDate = new Date();
    var player = GetPlayer();
    var startDate = new Date(player.GetVar("StartTime"));
    let isCompleted = player.GetVar("IsCompleted");
    console.log("exe_at_interval TotalTimeSpent:", TotalTimeSpent);
    if (isCompleted != 1) {
      send_data(startDate, endDate, endDate, isCompleted);
    }
  }, 30000);
}

window.restartIN = function () {
  console.log("aborted");
  var endDate = new Date();
  var player = GetPlayer();
  var startDate = new Date(player.GetVar("StartTime"));
  send_data(startDate, endDate, endDate, -1);
};

function storeData() {
  var player = GetPlayer();
  console.log("timeSpent", player.GetVar("TimeSpent"));
  console.log("wrongAttempCount", player.GetVar("wrongAttemptCount"));
}