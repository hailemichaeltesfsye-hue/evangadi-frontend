# Evangadi Forum — Frontend

React frontend for the Evangadi Forum application. Built with Vite, React Router, and Axios.

## Tech Stack
- React (Vite)
- React Router (`react-router-dom`)
- Axios for API calls

## Getting Started
```bash
npm install
npm run dev
```

## Backend Connection
Set the base URL in `src/axiosConfig.js`:
```js
const axiosBase = axios.create({
  baseURL: 'http://localhost:10000/api'
});
```

## Authentication Flow
- On login, the backend returns a JWT token, saved to `localStorage`.
- `App.jsx` checks the token on load via `GET /users/check` to restore the session.
- Protected pages require a valid token; otherwise the user is redirected to `/login`.

## Notes
This repo contains **frontend only**. The backend API lives in a separate repo: `evangadi-backend`.
