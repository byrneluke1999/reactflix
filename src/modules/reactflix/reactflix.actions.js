import { createAsyncActionCreator } from "../common/redux.helpers";
import * as flixService from "./reactflix.service";

export const keys = {
  GET_TOP_MOVIES: "GET_TOP_MOVIES",
  SEARCH_MOVIES: "SEARCH_MOVIES",
  GET_MOVIE_DETAILS: "GET_MOVIE_DETAILS",
};

export const getTopMovies = (page) =>
  createAsyncActionCreator(keys.GET_TOP_MOVIES, flixService.getTopMovies, {
    page,
  });

export const searchMovies = (query, page) =>
  createAsyncActionCreator(keys.searchMovies, flixService.searchMovies, {
    query,
    page,
  });

export const getMovieDetails = (movieID) =>
  createAsyncActionCreator(
    keys.GET_MOVIE_DETAILS,
    flixService.getMovieDetails,
    {
      movieID,
    }
  );
