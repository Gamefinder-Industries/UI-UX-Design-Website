import { useEffect, useRef, useState } from 'react';
import { discount, gameStoreUrl } from '../games';
import { gameImage, Price, WishlistButton } from './GameCards';

const defaultPhotos = ['cover', 'play', 'play-2', 'play-3'];

export default function GameDetails({ game, saved, onToggle, onClose }) {
  const dialog = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = game.photos ?? defaultPhotos;

  useEffect(() => {
    const element = dialog.current;
    // The native dialog keeps keyboard focus inside the popup.
    element.showModal();
    return () => element.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="dialog-title"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header className="dialog-header">
        <h2 id="dialog-title">Game Details</h2>
        <button className="close" aria-label="Close dialog" onClick={onClose}>×</button>
      </header>
      <div className="details">
        <div className="details-media">
          <img
            className="details-preview"
            src={gameImage(game, photos[activePhoto])}
            alt={activePhoto === 0 ? `${game.name} cover art` : `${game.name} gameplay screenshot ${activePhoto}`}
          />
          <div className="photo-thumbnails" role="group" aria-label="Game photos" style={{ '--photo-count': photos.length }}>
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                aria-label={index === 0 ? 'Show cover art' : `Show gameplay screenshot ${index}`}
                aria-pressed={activePhoto === index}
                onClick={() => setActivePhoto(index)}
              >
                <img src={gameImage(game, photo)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="details-info">
          <h3>{game.name}</h3>
          <p>{game.genre} · ☆ {game.rating.toFixed(1)}</p>
          <p>{game.description}</p>
          <div className="details-price">
            <Price game={game} />
            {game.original && <span>{discount(game)}% off</span>}
            <WishlistButton game={game} saved={saved} onToggle={onToggle} />
          </div>
          <a className="button" href={gameStoreUrl(game)} target="_blank" rel="noreferrer">
            View on Steam ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
