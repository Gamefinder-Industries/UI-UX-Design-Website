# Gamefinder

A React + Vite website based on our Figma prototype.

## Get started

Install Node.js 22.12+ or Node.js 24 LTS, then run:

```sh
git clone https://github.com/Gamefinder-Industries/UI-UX-Design-Website.git
cd UI-UX-Design-Website
npm ci
npm run dev
```

If you already cloned the project, pull the latest changes and run `npm ci` before starting it.

Open the local URL printed in the terminal. Vite updates the page when you save source changes. Use `npm run dev` instead of Live Server or opening `index.html` directly.

## Project structure

```text
index.html          HTML entry point
package.json        Dependencies and commands
vite.config.js      Vite and React configuration
src/
  main.jsx          Starts React
  App.jsx           Main page layout
  styles.css        Shared styling
  components/       Reusable React components
assets/             Images and icons imported by components
public/             Files served directly, such as a favicon
```

Empty folders contain `.gitkeep` placeholders so Git tracks them. Remove the placeholders when adding files.

## Commands

- `npm run dev`: Start the development server.
- `npm run build`: Generate a production build in `dist/`.
- `npm run preview`: Preview the production build after building.

## Working on the site

- Edit `src/App.jsx` and add components in `src/components/` for page content.
- Edit `src/styles.css` for appearance and responsive layouts.
- Use React state and event handlers for interactions.
- Import images from `assets/`, or reference files in `public/` using paths from the site root.
- Commit `package-lock.json` when dependencies change. Generated `node_modules/` and `dist/` files are ignored by Git.
