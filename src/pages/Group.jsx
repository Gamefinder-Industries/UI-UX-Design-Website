const friends = ['Ozzy', 'Zachary', 'Joydeep', 'KeenDawg', 'Rucha', 'Robert'];

export default function Group() {
  return (
    <main className="group-page" aria-label="My Group">
      <section className="group-panel" aria-labelledby="friends-heading">
        <h2 id="friends-heading">Friends (67)</h2>
        <ul>
          {friends.map((name) => (
            <li key={name}>
              <span className="group-avatar" aria-hidden="true" />
              <span>{name}</span>
              <button type="button" aria-label={`Add ${name}`} disabled>+</button>
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
            <button type="button" aria-label="Remove Brian Jones" disabled>− Remove</button>
          </li>
        </ul>
        <div className="group-game">
          <p>No game chosen.</p>
          <button type="button" disabled>Choose a Game for This Group</button>
        </div>
      </section>
    </main>
  );
}
