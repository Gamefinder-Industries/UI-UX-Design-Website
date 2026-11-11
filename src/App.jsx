import { useState } from 'react';
import GameDetails from './components/GameDetails';
import Home from './pages/Home';
import Library from './pages/Library';
import OnSale from './pages/OnSale';
import Group from './pages/Group';
import Account from './pages/Account';

const pages = {
  'My Library': Library,
  'On Sale': OnSale,
  'My Group': Group,
  'My Account': Account,
};

const navItems = ['Home', 'My Library', 'On Sale', 'My Group'];

export default function App() {
  const [page, setPage] = useState('Home');
  const [openGame, setOpenGame] = useState(null);
  // The cards and popup share one wishlist.
  const [savedGames, setSavedGames] = useState([]);

  const Page = pages[page];

  function goToPage(name) {
    if (name === page) return;
    setPage(name);
    window.scrollTo(0, 0);
  }

  function toggleSavedGame(id) {
    setSavedGames(current => {
      if (current.includes(id)) {
        return current.filter(savedId => savedId !== id);
      }

      return [...current, id];
    });
  }

  return (
    <>
      <header className="site-header">
        <span className="brand">
          <img src={`${import.meta.env.BASE_URL}gamefinder.svg`} alt="" width="36" height="36" />
          Gamefinder
        </span>
        <nav aria-label="Main navigation">
          {navItems.map(name => (
            <button
              key={name}
              type="button"
              aria-current={page === name ? 'page' : undefined}
              onClick={() => goToPage(name)}
            >
              {name}
            </button>
          ))}
        </nav>
        <button
          className="account-button"
          type="button"
          aria-current={page === 'My Account' ? 'page' : undefined}
          onClick={() => goToPage('My Account')}
        >
          My Account
        </button>
      </header>
      {/* Keep the Home filters when switching pages. */}
      <div hidden={page !== 'Home'}>
        <Home savedGames={savedGames} onToggle={toggleSavedGame} onOpen={setOpenGame} />
      </div>
      {Page && <Page savedGames={savedGames} onToggle={toggleSavedGame} onOpen={setOpenGame} />}
      {openGame && (
        <GameDetails
          key={openGame.id}
          game={openGame}
          saved={savedGames.includes(openGame.id)}
          onToggle={toggleSavedGame}
          onClose={() => setOpenGame(null)}
        />
      )}
    </>
  );
}
