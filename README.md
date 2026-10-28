# TMS Demo App

Small demo React app showing how UI code can support Playwright automation. Mock data only, with no backend.

| | Link |
|---|---|
| Live demo | https://demo-playwright-support.netlify.app |
| Sample Playwright tests | https://github.com/srinivasulu956/qa-playwright-tests |

Stack: Vite, React 18, MUI 5, Kendo React Grid, React Hook Form, React Router, react-toastify.

Screens: login, header, side nav, dashboard, a loads grid (search, status filter, sort, paging), a create/edit load dialog, and a carriers table. The demo login is in `src/constants/app.js` (`DEMO_USER`). Data resets on every page reload.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:5300.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 5300 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the build on port 5300 |
| `npm run lint` | ESLint, with no warnings allowed |

## UI rules that support Playwright

| Rule | Example | Where |
|---|---|---|
| Every input has a visible label | `getByLabel('Origin')` | `src/pages/login/LoginPage.jsx`, `src/pages/loads/load-form-dialog/LoadFormDialog.jsx` |
| Icon-only buttons have an `aria-label` naming the action and the record | `Edit load LD-1001` | `src/pages/loads/load-grid-cells.jsx`, `src/layout/header/Header.jsx` |
| Grid rows have `data-testid="<entity>-row-<id>"` | `load-row-1001` (Kendo, through `rowRender`) | `src/pages/loads/load-grid-helpers.js` |
| Loaders are named, and the grid area sets `aria-busy` while loading | `Loading loads` | `src/pages/loads/LoadsPage.jsx` |
| The side nav is a named `nav` landmark, and its links set `aria-current` | `Main navigation` | `src/layout/side-nav/SideNav.jsx` |
| Dialogs are named by their title | `Create load` | `src/pages/loads/load-form-dialog/LoadFormDialog.jsx` |
| Errors and toasts use `role="alert"` | MUI `Alert`, react-toastify | |
| Buttons are disabled while saving, and their text stays the same | `Sign in`, `Save` | |

## Deploy

The app is a static build, so any static host works. `public/_redirects` (Netlify) and `vercel.json` (Vercel) make a page refresh on a route like `/loads` serve the app instead of a 404.
