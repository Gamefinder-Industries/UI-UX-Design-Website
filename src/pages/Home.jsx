import { useState } from 'react';
import GameCards from '../components/GameCards';
import HomeFilters from '../components/HomeFilters';
import { games, filterGames } from '../games';

export default function Home({ savedGames, onToggle, onOpen }) {
  const [filters, setFilters] = useState({});

  // Filter once so every row shares the result
  const visibleGames = filterGames(games, filters, savedGames);
  const saleGames = visibleGames.filter(game => game.original);
  const cozyGames = visibleGames.filter(game => game.genre === 'Cozy');

  return (
    <main>
      <HomeFilters filters={filters} onChange={setFilters} />
      {saleGames.length > 0 && (
        <section aria-labelledby="sale-heading">
          <h2 id="sale-heading">On Sale Games</h2>
          <GameCards games={saleGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        </section>
      )}
      <section aria-labelledby="all-heading">
        <h1 id="all-heading">All Games</h1>
        {visibleGames.length > 0 ? (
          <GameCards games={visibleGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        ) : (
          <p role="status">No games match these filters.</p>
        )}
      </section>
      {cozyGames.length > 0 && (
        <section aria-labelledby="cozy-heading">
          <h2 id="cozy-heading">Cozy Games</h2>
          <GameCards games={cozyGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        </section>
      )}
    </main>
  );
}
