const express = require('express');
const Sentry = require('@sentry/node');
const mongoose = require('mongoose');
require('dotenv').config();

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const app = express();

if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
}

let dbStatus = 'not-configured';
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  dbStatus = 'connecting';
  mongoose.connect(mongoUri, {
    // Recommended options are default in mongoose 7+
  })
    .then(() => {
      dbStatus = 'connected';
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      dbStatus = 'error';
      console.error('MongoDB connection error:', err.message || err);
    });
}

app.get('/health', (req, res) => {
  const payload = { status: 'ok', uptime: process.uptime() };
  if (mongoUri) payload.dbStatus = dbStatus;
  res.status(200).json(payload);
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
