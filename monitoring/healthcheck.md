## Healthcheck and Monitoring

- Add a healthcheck endpoint to your Express backend at `/health` that returns `200 OK` and a JSON body:

```json
{ "status": "ok", "uptime": "<seconds>" }
```

- Configure uptime monitoring (e.g., UptimeRobot or Pingdom) to poll the `/health` endpoint.
- Use Sentry for error tracking; set `SENTRY_DSN` in your environment and initialize Sentry in your app.
- For server resource monitoring, consider using Render's built-in metrics or external tools like Datadog.
