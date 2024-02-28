import { type FormEvent, useState, type ChangeEvent } from "react";

import { shortenUrl } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [error, setError] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setShortcut("");
    setUrl(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!url.trim()) return;
    shortenUrl(url)
      .then((val) => {
        setShortcut(val.shortcut);
      })
      .catch((err: unknown) => {
        console.error(err);
        setError(String(err));
      });
  };

  return (
    <main>
      <h1>URL shortener</h1>
      <form onSubmit={handleSubmit}>
        <input name="url" value={url} onChange={handleInput} />
        <button>Shorten</button>
      </form>

      {shortcut && (
        <textarea name="shortcut" readOnly value={shortcut}></textarea>
      )}

      {error && <p>{error}</p>}
    </main>
  );
}

export default App;
