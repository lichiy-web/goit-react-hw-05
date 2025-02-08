import axios from 'axios';
import api_read_access_token from './api_read_access_token';

const BASE_URL = 'https://api.themoviedb.org/3/';
// const TREDING_MOVIES_BASE_URL = 'https://api.themoviedb.org/3/trending/movie/';
// const MOVIE_DETAILS_BASE_URL = 'https://api.themoviedb.org/3/movie/';
// const MOVIE_CREDITS_BASE_URL = 'https://api.themoviedb.org/3/movie/{movie_id}/credits';
// const MOVIE_REVIEWS_BASE_URL = 'https://api.themoviedb.org/3/movie/{movie_id}/reviews';
// const MOVIE_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const IMG_BASE_URL = 'http://image.tmdb.org/t/p/';
const BACKGRND_SIZE = {
            s: "w300",
            m: "w780",
            l: "w1280",
            raw: "original"
}
const POSTER_SIZE = {
    xs: "w92",
    s: "w154",
    m: "w185",
    l: "w342",
    xl: "w500",
    xxl: "w780",
    raw: "original"
}



axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${api_read_access_token}`;
axios.defaults.headers.common['accept'] = 'application/json';

export const getTredingMovies = async (query, timeWindow = 'day' /* day | week */, page = 1) => {
    'trending/movie/day?language=en-US'
    return axios.get(`trending/${timeWindow}?query=${query}?language=en-US&page=${page}&`);
}

export const searchMovies = async (query, page = 1) => {
    return axios.get(`search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&`);
}
