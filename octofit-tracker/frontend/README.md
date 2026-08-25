# Octofit Tracker Frontend

React 19 presentation tier for Octofit Tracker.

## Environment variable

Define `VITE_CODESPACE_NAME` when running in GitHub Codespaces.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds the API base URL as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api
```
