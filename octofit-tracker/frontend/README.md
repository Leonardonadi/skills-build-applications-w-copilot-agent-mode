# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker, built with Vite, React Router, and Bootstrap.

## API configuration

For Codespaces, `VITE_CODESPACE_NAME` must be defined in `octofit-tracker/frontend/.env.local`. Copy `.env.example` to `.env.local` and replace the placeholder with the Codespace name only. Vite reads this value when its dev server starts, so restart the server after changing the file.

The frontend uses `https://$VITE_CODESPACE_NAME-8000.app.github.dev` when the value is set. When it is unset, API requests fall back to `http://localhost:8000` for local development.

Start the frontend from the workspace root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:
The frontend uses Vite for development serving and optimized production builds.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
