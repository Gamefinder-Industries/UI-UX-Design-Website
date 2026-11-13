import { useRef, useState } from "react";
import { games } from "../games";
import { gameImage, Price } from "../components/GameCards";

const friends = ["Ozzy", "Zachary", "Joydeep", "KeenDawg", "Rucha", "Robert"];

const ownedIds = ["hollow-knight", "hades", "palia", "unpacking"];

const ownedGames = games.filter((game) => ownedIds.includes(game.id));

export default function Group() {
  const dialogRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [groupGame, setGroupGame] = useState(null);

  function openModal() {
    setSelectedGame(null);
    setIsModalOpen(true);
    dialogRef.current.showModal();
  }

  function closeModal() {
    dialogRef.current.close();
    setIsModalOpen(false);
  }

  function selectGame(id) {
    setSelectedGame((current) => (current === id ? null : id));
  }

  function addGameToGroup() {
    if (!selectedGame) return;

    setGroupGame(selectedGame);
    closeModal();
  }

  const chosenGame = games.find((game) => game.id === groupGame);

  return (
    <main className="group-page" aria-label="My Group">
      <section className="group-panel" aria-labelledby="friends-heading">
        <h2 id="friends-heading">Friends (67)</h2>
        <ul>
          {friends.map((name) => (
            <li key={name}>
              <span className="group-avatar" aria-hidden="true" />
              <span>{name}</span>
              <button type="button" aria-label={`Add ${name}`} disabled>
                +
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="group-panel" aria-labelledby="group-heading">
        <h2 id="group-heading">Group</h2>
        <ul>
          <li>
            <span className="group-avatar" aria-hidden="true" />
            <span>Eli (You)</span>
            <span className="group-leader">Leader</span>
          </li>
          <li>
            <span className="group-avatar" aria-hidden="true" />
            <span>Brian Jones</span>
            <button type="button" aria-label="Remove Brian Jones" disabled>
              − Remove
            </button>
          </li>
        </ul>
        <div className="group-game">
          <div className="group-game-left">
            {chosenGame ? (
              <div className="group-chosen-game">
                <img src={gameImage(chosenGame)} alt="" />

                <div className="group-chosen-game-info">
                  <strong>{chosenGame.name}</strong>
                  <Price game={chosenGame} />
                  <span>{chosenGame.genre}</span>
                  <span>☆ {chosenGame.rating.toFixed(1)}</span>
                </div>
              </div>
            ) : (
              <p>No game chosen.</p>
            )}

            <button type="button" onClick={openModal}>
              Choose a Game for This Group
            </button>
          </div>

          {chosenGame && (
            <a
              className="button group-steam-button"
              href={`https://store.steampowered.com/app/${chosenGame.steamId}/`}
              target="_blank"
              rel="noreferrer"
            >
              View on Steam ↗
            </a>
          )}
        </div>
      </section>

      <dialog ref={dialogRef} onClose={() => setIsModalOpen(false)}>
        <div className="dialog-header">
          <h2>Choose a Game for This Group</h2>
          <button
            type="button"
            className="close"
            aria-label="Close dialog"
            onClick={closeModal}
          >
            ×
          </button>
        </div>

        <div className="group-game-options">
          {ownedGames.map((game) => (
            <button
              type="button"
              className="group-game-option"
              key={game.id}
              aria-pressed={selectedGame === game.id}
              onClick={() => selectGame(game.id)}
            >
              <img src={gameImage(game)} alt="" />
              <span className="group-game-option-info">
                <strong>{game.name}</strong>
                <Price game={game} />
                <span>{game.genre}</span>
                <span>☆ {game.rating.toFixed(1)}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="group-game-footer">
          <p>Selected game will be added to this group.</p>

          <div className="group-game-actions">
            <button type="button" onClick={closeModal}>
              Cancel
            </button>

            <button
              type="button"
              className="button"
              disabled={!selectedGame}
              onClick={addGameToGroup}
            >
              Add to Group
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
