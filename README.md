# Gamefinder

A React + Vite website based on our Figma prototype.

## Get started

Install Node.js 22.12+ (or Node.js 24 LTS), then run:

```sh
git clone https://github.com/Gamefinder-Industries/UI-UX-Design-Website.git
cd UI-UX-Design-Website
npm ci
npm run dev
```

Open the local URL printed in the terminal. Changes to source files update the page while the development server runs.

## Project structure

```text
index.html          HTML entry point
package.json        Dependencies and commands
vite.config.js      Vite and React configuration
public/             Files served directly, such as a favicon
src/
  main.jsx          Starts React and imports shared CSS
  App.jsx           Main page layout
  styles.css        Shared styles
  components/       Reusable React components
  assets/           Images and icons imported by components
```

Empty folders contain `.gitkeep` files so Git tracks them. Remove those placeholders when adding actual files.

## Commands

- `npm run dev`: Start the development server.
- `npm run build`: Generate a production build in `dist/`.
- `npm run preview`: Preview the production build locally after building.

Commit `package-lock.json` when dependencies change. Generated files in `node_modules/` and `dist/` are ignored by Git.

The initial page is a placeholder; the Figma screens have not been implemented yet.
