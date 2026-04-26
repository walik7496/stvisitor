// === НАЛАШТУВАННЯ ===
var URL = 'https://your-site.com'; // <-- встав свій сайт

// === ОСНОВНА ФУНКЦІЯ ===
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

// === СТВОРЕННЯ 2 ВИПАДКОВИХ ТРИГЕРІВ НА ДЕНЬ ===
function setupRandomDailyTriggers() {
  // Видаляємо старі тригери
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });

  // Випадковий час для першого запуску (між 9:00 і 12:00)
  var morningHour = Math.floor(Math.random() * 3) + 9; // 9-11
  var morningMinute = Math.floor(Math.random() * 60);

  // Випадковий час для другого запуску (між 17:00 і 20:00)
  var eveningHour = Math.floor(Math.random() * 3) + 17; // 17-19
  var eveningMinute = Math.floor(Math.random() * 60);

  // Тригер 1
  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(morningHour)
    .nearMinute(morningMinute)
    .everyDays(1)
    .create();

  // Тригер 2
  ScriptApp.newTrigger('pingWebsite')
    .timeBased()
    .atHour(eveningHour)
    .nearMinute(eveningMinute)
    .everyDays(1)
    .create();

  Logger.log("Ранковий запуск: " + morningHour + ":" + morningMinute);
  Logger.log("Вечірній запуск: " + eveningHour + ":" + eveningMinute);
}