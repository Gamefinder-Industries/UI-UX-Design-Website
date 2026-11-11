import { useState } from 'react';
import GameCards from '../components/GameCards';
import HomeFilters from '../components/HomeFilters';
import { games, filterGames } from '../games';

// On sale means the game has a pre-discount price
const onSaleGames = games.filter(game => game.original);

export default function OnSale({ savedGames, onToggle, onOpen }) {
  const [filters, setFilters] = useState({});

  const visibleGames = filterGames(onSaleGames, filters, savedGames);

  return (
    <main>
      <HomeFilters filters={filters} onChange={setFilters} />
      <section aria-labelledby="sale-heading">
        <h1 id="sale-heading">On Sale</h1>
        {visibleGames.length > 0 ? (
          <GameCards games={visibleGames} savedGames={savedGames} onToggle={onToggle} onOpen={onOpen} />
        ) : (
          <p role="status">No sale games match these filters.</p>
        )}
      </section>
    </main>
  );
}
