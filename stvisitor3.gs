// === Settings ===
var URL = 'https://your-site.com'; // <-- встав свій сайт

// === RANDOM DELAY 20-60 SEC ===
function sleepRandom() {
  var delay = Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000;
  Logger.log("Waiting before asking: " + (delay / 1000) + " sec");
  Utilities.sleep(delay);
}

// === MAIN FUNCTION ===
function pingWebsite() {
  try {
    sleepRandom(); // delay

    var response = UrlFetchApp.fetch(URL, {
      method: 'get',
      muteHttpExceptions: true
    });

    Logger.log("Status: " + response.getResponseCode());

  } catch (e) {
    Logger.log("Error: " + e.message);
  }
}

// === CREATION OF RANDOM TRIGGER ===
function setupRandomDailyTriggers() {
  // We delete old triggers
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });

  // Morning (9–11)
  var morningHour = Math.floor(Math.random() * 3) + 9;
  var morningMinute = Math.floor(Math.random() * 60);

  // Evening (17–19)
  var eveningHour = Math.floor(Math.random() * 3) + 17;
  var eveningMinute = Math.floor(Math.random() * 60);

  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(morningHour)
    .nearMinute(morningMinute)
    .everyDays(1)
    .create();

  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(eveningHour)
    .nearMinute(eveningMinute)
    .everyDays(1)
    .create();

  Logger.log("Morning: " + morningHour + ":" + morningMinute);
  Logger.log("Evening: " + eveningHour + ":" + eveningMinute);
}

// === AUTO UPDATE DAILY ===
function autoRefreshTriggers() {
  setupRandomDailyTriggers();
}
