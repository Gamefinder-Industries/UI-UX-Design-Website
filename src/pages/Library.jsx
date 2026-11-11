import { useState } from 'react';
import GameCards from '../components/GameCards';
import HomeFilters from '../components/HomeFilters';
import { games, filterGames } from '../games';

// Placeholder lists until there is a real ownership model
const ownedIds = ['hollow-knight', 'hades', 'palia', 'unpacking'];
const likedIds = ['spiritfarer', 'celeste', 'short-hike', 'stardew'];

export default function Library({ savedGames, onToggle, onOpen }) {
  const [filters, setFilters] = useState({});

  const byId = ids => filterGames(games.filter(game => ids.includes(game.id)), filters, savedGames);
  const ownedGames = byId(ownedIds);
  const likedGames = byId(likedIds);

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
      <section aria-labelledby="liked-heading">
        <h2 id="liked-heading">Liked Games</h2>
        {likedGames.length > 0 ? (
          <GameCards games={likedGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        ) : (
          <p role="status">No liked games match these filters.</p>
        )}
      </section>
    </main>
  );
}
