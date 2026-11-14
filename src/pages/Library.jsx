import { useState } from 'react';
import GameCards from '../components/GameCards';
import HomeFilters from '../components/HomeFilters';
import { games, filterGames } from '../games';

// Placeholder owned list until there is a real ownership model
const ownedIds = ['hollow-knight', 'hades', 'palia', 'unpacking'];

export default function Library({ savedGames, onToggle, onOpen }) {
  const [filters, setFilters] = useState({});

  const byId = ids => filterGames(games.filter(game => ids.includes(game.id)), filters, savedGames);
  const ownedGames = byId(ownedIds);
  // The wishlist is whatever the user has hearted, in the order they saved it.
  const wishlistGames = byId(savedGames);

  return (
    <main>
      <HomeFilters filters={filters} onChange={setFilters} />
      <section aria-labelledby="owned-heading">
        <h1 id="owned-heading">Owned Games</h1>
        {ownedGames.length > 0 ? (
          <GameCards games={ownedGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        ) : (
          <p role="status">No owned games match these filters.</p>
        )}
      </section>
      <section aria-labelledby="wishlist-heading">
        <h2 id="wishlist-heading">Wishlist</h2>
        {wishlistGames.length > 0 ? (
          <GameCards games={wishlistGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        ) : (
          <p role="status">Your wishlist is empty. Tap the heart on a game to add it.</p>
        )}
      </section>
    </main>
  );
}
