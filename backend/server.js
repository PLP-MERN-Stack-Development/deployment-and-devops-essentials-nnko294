const express = require('express');
const Sentry = require('@sentry/node');
require('dotenv').config();

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const app = express();

if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/', (req, res) => {
  res.send('Hello from sample backend');
});

if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = app;
