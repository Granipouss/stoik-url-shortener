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
    <main>
      <h1>URL shortener</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <input name="url" value={url} onChange={handleInput} />
          <button>Shorten</button>
        </fieldset>
      </form>

      {shortcut && (
        <textarea name="shortcut" readOnly value={shortcut}></textarea>
      )}

      {error && <p>{error}</p>}
    </main>
  );
}

export default App;
