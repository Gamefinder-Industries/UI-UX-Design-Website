export default function Account() {
  return (
    <main className="account-page">
      <div className="account-pong" aria-hidden="true">
        <div className="pong-court">
          <span className="pong-paddle pong-paddle-left" />
          <span className="pong-paddle pong-paddle-right" />
          <span className="pong-ball" />
        </div>
      </div>
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
          <button type="button" className="button" disabled>Log in</button>
          <button type="button" disabled>Sign up</button>
        </div>
      </section>
    </main>
  );
}
