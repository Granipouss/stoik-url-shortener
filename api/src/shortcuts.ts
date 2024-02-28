let uid = 0;

const getUid = () => `${++uid}`;

// In memory database
const Data = new Map<string, string>();

export const createShortCutForUrl = (url: string) => {
  const shortcut = getUid();
  Data.set(shortcut, url);
  return shortcut;
};

export const getUrlForShortcut = (shortcut: string) => {
  const url = Data.get(shortcut);
  if (!url) {
    throw new Error(`Could not find shortcut ${shortcut}`);
  }
  return url;
};
