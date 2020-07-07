const MOVIE_DB_API_KEY = "35d14eaae9088fc8e1bd8d64dd563d39";
const MOVIE_DB_BASE_URL = "https://api.themoviedb.org/3";

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseURL = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams).forEach(
      (paramName) => (baseURL += `&${paramName}=${queryParams[paramName]}`)
    );
  }
  return baseURL;
};

export const getTopMovies = async ({ page }) => {
  const fullURL = createMovieDbUrl("/movie/top_rated", {
    page,
  });
  return fetch(fullURL);
};

export const searchMovies = async ({ page, query }) => {
  const fullURL = createMovieDbUrl("/search/movie", {
    page,
    query,
  });
  return fetch(fullURL);
};

export const getMovieDetails = async ({ movieID }) => {
  const fullURL = createMovieDbUrl(`/movie/${movieID}`);
  return fetch(fullURL);
};
