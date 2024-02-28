import { type FormEvent, useState, type ChangeEvent } from "react";

import { shortenUrl } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setShortcut("");
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!url.trim()) return;

    if (loading) return;
    setLoading(true);
    setError("");
    setShortcut("");

    try {
      const response = await shortenUrl(url);
      setShortcut(response.shortcut);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="body px-3 my-6">
      <h1 className="is-size-1 has-text-centered">URL shortener</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="field has-addons" disabled={loading}>
          <p className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="https://..."
              name="url"
              aria-label="url"
              value={url}
              onChange={handleInput}
            />
          </p>
          <p className="control">
            <button
              className={"button is-primary" + (loading ? " is-loading" : "")}
              type="submit"
              disabled={loading}
            >
              Shorten
            </button>
          </p>
        </fieldset>
      </form>

      {shortcut && (
        <>
          <span className="icon is-large">
            <i className="material-symbols-outlined is-size-2">
              arrow_downward
            </i>
          </span>

          <input
            className="input"
            type="text"
            name="shortcut"
            aria-label="shortcut"
            readOnly
            value={shortcut}
            onClick={(ev) => (ev.target as HTMLInputElement).select()}
          />
        </>
      )}

      {error && <p className="has-text-danger">{error}</p>}
    </main>
  );
}

export default App;
