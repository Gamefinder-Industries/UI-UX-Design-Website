import { useEffect, useRef, useState } from 'react';
import { discount } from '../games';

export function gameImage(game, kind = 'cover') {
  return `${import.meta.env.BASE_URL}games/${game.id}-${kind}.jpg`;
}

export function Price({ game }) {
  return (
    <span className="price">
      <strong>{game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}</strong>
      {game.original && <s>${game.original.toFixed(2)}</s>}
    </span>
  );
}

// Jagged starburst outline for the sale sticker, points alternate outer/inner radius
const STICKER_POINTS = Array.from({ length: 24 }, (_, i) => {
  const radius = i % 2 === 0 ? 48 : 40;
  const angle = (Math.PI * i) / 12;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ');

export function DiscountSticker({ game }) {
  return (
    <svg className="discount" viewBox="0 0 100 100" aria-label={`${discount(game)} percent off`} role="img">
      <polygon points={STICKER_POINTS} />
      <text x="50" y="44">{discount(game)}%</text>
      <text x="50" y="64">off</text>
    </svg>
  );
}

export function WishlistButton({ game, saved, onToggle }) {
  return (
    <button
      className="heart"
      aria-label={`${saved ? 'Remove' : 'Save'} ${game.name} ${saved ? 'from' : 'to'} wishlist`}
      aria-pressed={saved}
      onClick={() => onToggle(game.id)}
    >
      {saved ? '♥' : '♡'}
    </button>
  );
}

export default function GameCards({ games, savedGames, onToggle, onOpen }) {
  const row = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function checkScroll() {
    const { scrollLeft, scrollWidth, clientWidth } = row.current;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }

  // Recheck the arrows when the row resizes or filters change its length.
  useEffect(() => {
    checkScroll();
    const observer = new ResizeObserver(checkScroll);
    observer.observe(row.current);
    return () => observer.disconnect();
  }, [games.length]);

  function scrollCards(direction) {
    const container = row.current;
    const [first, second] = container.children;
    // Use the distance between cards so each click lands on a card edge.
    const step = second.offsetLeft - first.offsetLeft;
    const cardsPerPage = Math.max(1, Math.floor(container.clientWidth / step));

    container.scrollBy({
      left: direction * step * cardsPerPage,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <div className="game-carousel">
      <div className="game-row" ref={row} tabIndex={0} onScroll={checkScroll}>
        {games.map(game => (
          <article className="game-card" key={game.id}>
            <button
              className="card-button"
              onClick={() => onOpen(game)}
            >
              <img src={gameImage(game)} alt="" />
              {game.original && <DiscountSticker game={game} />}
              <span className="card-info">
                <strong className="game-name">{game.name}</strong>
                <Price game={game} />
                <span className="card-meta">
                  <span>{game.genre}</span>
                  <span>{game.players === 1 ? '1 player' : `Up to ${game.players} players`}</span>
                </span>
                <span className="rating">☆ {game.rating.toFixed(1)}</span>
              </span>
            </button>
            <WishlistButton game={game} saved={savedGames.includes(game.id)} onToggle={onToggle} />
          </article>
        ))}
      </div>
      {canScrollLeft && (
        <button className="carousel-arrow carousel-left" type="button" aria-label="Scroll games left" onClick={() => scrollCards(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>
      )}
      {canScrollRight && (
        <button className="carousel-arrow carousel-right" type="button" aria-label="Scroll games right" onClick={() => scrollCards(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      )}
    </div>
  );
}
