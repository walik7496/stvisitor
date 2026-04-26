// === НАЛАШТУВАННЯ ===
var URL = 'https://your-site.com'; // <-- встав свій сайт

// === ВИПАДКОВА ЗАТРИМКА 20–60 СЕК ===
function sleepRandom() {
  var delay = Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000;
  Logger.log("Очікування перед запитом: " + (delay / 1000) + " сек");
  Utilities.sleep(delay);
}

// === ОСНОВНА ФУНКЦІЯ ===
function pingWebsite() {
  try {
    sleepRandom(); // затримка

    var response = UrlFetchApp.fetch(URL, {
      method: 'get',
      muteHttpExceptions: true
    });

    Logger.log("Status: " + response.getResponseCode());

  } catch (e) {
    Logger.log("Error: " + e.message);
  }
}

// === СТВОРЕННЯ РАНДОМНИХ ТРИГЕРІВ ===
function setupRandomDailyTriggers() {
  // Видаляємо старі тригери
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });

  // Ранок (9–11)
  var morningHour = Math.floor(Math.random() * 3) + 9;
  var morningMinute = Math.floor(Math.random() * 60);

  // Вечір (17–19)
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

  Logger.log("Ранок: " + morningHour + ":" + morningMinute);
  Logger.log("Вечір: " + eveningHour + ":" + eveningMinute);
}

// === АВТООНОВЛЕННЯ ЩОДНЯ ===
function autoRefreshTriggers() {
  setupRandomDailyTriggers();
}