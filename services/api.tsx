export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovie = async ({ query }: { query: string }) => {
  if (!TMDB_CONFIG.API_KEY || TMDB_CONFIG.API_KEY.length === 0) {
    throw new Error(`API KEY is missing`);
  }
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity_desc`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        `Fail to fetch movie ${response.statusText} (Stutas: ${response.status})`,
      );
    }
    const data = await response.json();
    if (!Array.isArray(data.results)) {
      throw new Error("An invalid structure");
    }
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fail to fetch movie ${error.message}`);
    }
  }
  throw new Error(`An unknonw Error when fetching movie`);
};
