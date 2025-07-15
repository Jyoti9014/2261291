
const axios = require("axios");

const VALID_STACKS = ["frontend", "backend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = {
  frontend: ["api", "component", "hook", "page", "state", "style"],
  backend: [
    "cache", "controller", "cron_job", "db", "domain", "handler",
    "repository", "route", "service"
  ],
  common: ["auth", "config", "middleware", "utils"]
};

let AUTH_TOKEN = "QAhDUr";

function setAuthToken(token) {
  AUTH_TOKEN = token;
}

function isValid(stack, level, pkg) {
  return (
    VALID_STACKS.includes(stack) &&
    VALID_LEVELS.includes(level) &&
    (
      VALID_PACKAGES[stack].includes(pkg) ||
      VALID_PACKAGES.common.includes(pkg)
    )
  );
}

async function log(stack, level, pkg, message) {
  if (!AUTH_TOKEN) {
    console.error("Auth token not set. Use setAuthToken(token).");
    return;
  }

  if (!isValid(stack, level, pkg)) {
    console.error('Invalid log data: stack=${stack}, level=${level}, package=${pkg}');
    return;
  }

  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: 'Bearer ${AUTH_TOKEN}'
        }
      }
    );
    console.log("✅ Log Sent:", res.data.message);
  } catch (err) {
    console.error("❌ Failed to send log:", err.response?.data || err.message);
  }
}

module.exports = { log, setAuthToken };