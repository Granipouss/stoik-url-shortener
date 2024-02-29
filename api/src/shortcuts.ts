import { nanoid } from "nanoid";

type Entry = {
  shortcut: string; // Primary Key
  url: string;
  createdAt: number;
  hits: number;
};

// In memory database
const Data = new Map<string, Entry>();

export const createShortCutForUrl = (url: string) => {
  const shortcut = nanoid();
  Data.set(shortcut, { shortcut, url, createdAt: Date.now(), hits: 0 });
  return shortcut;
};

export const getUrlForShortcut = (shortcut: string, hit = false) => {
  const entry = Data.get(shortcut);
  if (!entry) {
    throw new Error(`Could not find shortcut ${shortcut}`);
  }
  if (hit) {
    console.log(`This is the ${entry.hits + 1}th time ${shortcut} is used.`);
    Data.set(shortcut, { ...entry, hits: entry.hits + 1 });
  }
  return entry.url;
};
