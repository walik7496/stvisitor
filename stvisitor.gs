// Arrays for various parameters
var userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0',
  'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36'
];

var acceptLanguages = [
  'en-US,en;q=0.9',
  'ru-RU,ru;q=0.8,en-US;q=0.7',
  'uk-UA,uk;q=0.9,en-US;q=0.8',
  'en-GB,en;q=0.9',
  'fr-FR,fr;q=0.9,en;q=0.8'
];

var referers = [
  'https://www.google.com/',
  'https://www.bing.com/',
  'https://www.yahoo.com/',
  'https://www.example.com/',
  'https://www.wikipedia.org/'
];

var acceptEncodings = [
  'gzip, deflate, br',
  'gzip, deflate',
  'gzip',
  'deflate, br',
  'identity'
];

var cacheControl = [
  'no-cache',
  'max-age=0',
  'no-store',
  'private, no-store'
];

// Function to select a random element from an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function redirectToWebsite() {
  try {
    var url = 'your_url_here';
    
    // Select random User-Agent, Accept-Language, Referer, Accept-Encoding, and Cache-Control
    var randomUserAgent = getRandomElement(userAgents);
    var randomAcceptLanguage = getRandomElement(acceptLanguages);
    var randomReferer = getRandomElement(referers);
    var randomAcceptEncoding = getRandomElement(acceptEncodings);
    var randomCacheControl = getRandomElement(cacheControl);

    var options = {
      'method': 'get',
      'headers': {
        'User-Agent': randomUserAgent,
        'Accept-Language': randomAcceptLanguage,
        'Referer': randomReferer,
        'Accept-Encoding': randomAcceptEncoding,
        'Cache-Control': randomCacheControl,
        'Connection': 'keep-alive',  // Additional header for more natural appearance
        'Upgrade-Insecure-Requests': '1',
        'TE': 'Trailers' // Additional header for more natural appearance
      }
    };

    var response = UrlFetchApp.fetch(url, options);
    Logger.log("Request successfully completed: " + response.getContentText());
    
  } catch (e) {
    Logger.log("Error: " + e.message);
  }

  // Create a new trigger with a random interval
  createRandomTrigger();
}

function createRandomTrigger() {
  // Remove all existing triggers to avoid overlap
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'redirectToWebsite') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Define a random interval in minutes (from 1 to 5 hours)
  var randomIntervalHours = Math.floor(Math.random() * 5) + 1; // Random number from 1 to 5
  var randomIntervalMinutes = randomIntervalHours * 60;

  // Create a new trigger
  ScriptApp.newTrigger('redirectToWebsite')
    .timeBased()
    .after(randomIntervalMinutes * 60 * 1000) // Convert minutes to milliseconds
    .create();

  Logger.log("New trigger created with an interval of: " + randomIntervalHours + " hours");
}
