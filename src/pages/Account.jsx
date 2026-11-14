export default function Account({ user, onSignIn, onSignOut }) {
  return (
    <main className="account-page">
      <div className="account-pong" aria-hidden="true">
        <div className="pong-court">
          <span className="pong-paddle pong-paddle-left" />
          <span className="pong-paddle pong-paddle-right" />
          <span className="pong-ball" />
        </div>
      </div>
      {user ? (
        <section className="account-panel" aria-labelledby="account-heading">
          <h1 id="account-heading">My Account</h1>
          <p className="account-signed-in">
            Signed in as <strong>{user}</strong>
          </p>
          <div className="account-actions">
            <button type="button" onClick={onSignOut}>Log out</button>
          </div>
        </section>
      ) : (
        <section className="account-panel" aria-labelledby="account-heading">
          <h1 id="account-heading">Sign in</h1>
          <label>
            Username
            <input type="text" autoComplete="username" />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" />
          </label>
          <div className="account-actions">
            <button type="button" className="button" onClick={() => onSignIn('Mario')}>Log in</button>
            <button type="button" onClick={() => onSignIn('Mario')}>Sign up</button>
          </div>
        </section>
      )}
    </main>
  );
}
