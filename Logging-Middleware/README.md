

Reusable logging utility to send logs to Affordmed Test Server.


```js
const { setAuthToken, log } = require("./index");

// Set token once after login
setAuthToken("your-auth-token");

// Log an event
log("frontend", "error", "component", "Button failed to render");