// === Settings ===
var URL = 'https://your-site.com'; // <-- встав свій сайт

// === MAIN FUNCTION ===
function pingWebsite() {
  try {
    var response = UrlFetchApp.fetch(URL, {
      method: 'get',
      muteHttpExceptions: true
    });

    Logger.log("Status: " + response.getResponseCode());
  } catch (e) {
    Logger.log("Error: " + e.message);
  }
}

// === GENERATION OF 2 RANDOM TRIGGER PER DAY ===
function setupRandomDailyTriggers() {
  // We delete old triggers
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });

  // Random time for first launch (between 9am and 12pm)
  var morningHour = Math.floor(Math.random() * 3) + 9; // 9-11
  var morningMinute = Math.floor(Math.random() * 60);

  // Random time for second launch (between 5:00 PM and 8:00 PM)
  var eveningHour = Math.floor(Math.random() * 3) + 17; // 17-19
  var eveningMinute = Math.floor(Math.random() * 60);

  // Trigger 1
  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(morningHour)
    .nearMinute(morningMinute)
    .everyDays(1)
    .create();

  // Trigger 2
  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(eveningHour)
    .nearMinute(eveningMinute)
    .everyDays(1)
    .create();

  Logger.log("Morning launch: " + morningHour + ":" + morningMinute);
  Logger.log("Evening launch: " + eveningHour + ":" + eveningMinute);
}
