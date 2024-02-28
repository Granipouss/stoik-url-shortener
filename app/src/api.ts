// API is available at import.meta.env.VITE_API_URL

export type ShortenApiResponse = { shortcut: string };

export const shortenUrl = async (url: string): Promise<ShortenApiResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}shorten`, {
    mode: "cors",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) throw response.statusText;

  return await response.json();
};
