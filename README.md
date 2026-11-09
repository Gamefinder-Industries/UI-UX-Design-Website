# GameFinder

GameFinder is a desktop React prototype. The prototype includes the Home page, reusable game cards, and the game details popup.

## Run it locally

Use Node.js 22.12+ or 24 LTS.

```sh
git clone https://github.com/Gamefinder-Industries/UI-UX-Design-Website.git
cd UI-UX-Design-Website
npm ci
npm run dev
```

Open the URL Vite prints in a desktop browser. Click a game card to see its details. The heart toggles a saved marker on Home until reload. Steam shows the retailer's current price.

## Where to make changes

- `src/games.js` holds the sample titles, prices, and descriptions. Art in `public/games` comes from the corresponding Steam product listings.
- `src/components/GameCards.jsx` renders the cards. `src/components/GameDetails.jsx` renders the popup.
- `src/pages/Home.jsx` holds the Home layout and filters. Add new page components in `src/pages`.
- `src/App.jsx` holds the shared header, wishlist, and game popup. All styles are in `src/styles.css`.

## Team handoff

- Build My Group and the shared library for the group task.
- Build On Sale and My Library, then connect them to the saved games.
- Once the three flows work, rehearse the demo and submit the text below.

## Team contribution statement

**Eli Schiffler:** I built the Home page with game filters, scrolling game rows, and reusable game cards and detail popups. I also added the game catalog and screenshots, made the GameFinder logo, and set up navigation and placeholder pages for the team to build on.

Team TODO: add the remaining members' contributions.

## Canvas submission

Team TODO: copy the text below into Canvas after adding the contribution statement and rehearsing the three tasks.

- Find a game for your friend group to play.
- Find a free game that fits your mood.
- Figure out what wishlisted games are currently having a deal, then open the chosen game's retailer page.

[GitHub repository](https://github.com/Gamefinder-Industries/UI-UX-Design-Website)
