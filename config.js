'use strict';

const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') dotenv.load();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  GITHUB_KEY: process.env.GITHUB_KEY,
  ISSUES_REPO: process.env.ISSUES_REPO,
  HIVEAGE_TOKEN: process.env.HIVEAGE_TOKEN,
  HIVEAGE_ENDPOINT: process.env.HIVEAGE_ENDPOINT,
}


module.exports = (key) => {
  if (!key) return config
  return config[key]
}
