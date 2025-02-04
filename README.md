# Redirect to Website with Randomized Headers

This project contains a script that redirects to a specified website at random intervals, using randomized HTTP headers to simulate real traffic. It uses Google Apps Script to perform the HTTP requests and create time-based triggers for executing the script.

## Features

- **Randomized HTTP Headers**: The script randomizes several HTTP headers to simulate real users visiting a website. These headers include:
  - `User-Agent`: Simulates different browser types and operating systems.
  - `Accept-Language`: Simulates different language preferences.
  - `Referer`: Simulates different referring websites.
  - `Accept-Encoding`: Simulates different types of content encoding.
  - `Cache-Control`: Simulates various caching behaviors.
- **Automatic Trigger Creation**: After each request, a new time-based trigger is created to run the script at a random interval, between 1 and 5 hours.
- **Error Handling**: Logs any errors encountered during the request process.

## Setup

1. Open the [Google Apps Script editor](https://script.google.com).
2. Create a new project or open an existing one.
3. Copy and paste the provided code into the script editor.

## Code Explanation

### Arrays for Parameters

The following arrays store different values for HTTP headers:

```javascript
var userAgents = [ ... ];
var acceptLanguages = [ ... ];
var referers = [ ... ];
var acceptEncodings = [ ... ];
var cacheControl = [ ... ];
```

## Configuration

- **URL: Replace the 'your_url_here' placeholder in the redirectToWebsite function with the URL you want to redirect to.
  Example:
  ```javascript
  var url = 'https://www.example.com';
  ```
## Logging

- **The script logs the following information:
  - The response content of the HTTP request (if successful).
  - Any errors encountered during the execution.
  - The interval in hours for the new trigger.
## Scheduling

The script runs automatically at random intervals, between 1 and 5 hours, as specified by the createRandomTrigger function.

## License

This project is open-source and licensed under the MIT License.
