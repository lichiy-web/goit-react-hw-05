import axios from 'axios';
import { api_read_access_token } from './api_access';
// console.log(`api_read_access_token = ${api_read_access_token}`);

const BASE_URL = 'https://api.themoviedb.org/3/';

const IMG_BASE_URL = 'http://image.tmdb.org/t/p/';
const sizes = {
    poster: {
        xs: "w92",
        s: "w154",
        m: "w185",
        l: "w342",
        xl: "w500",
        xxl: "w780",
        raw: "original",
    },
    backdrop: {
        s: "w300",
        m: "w780",
        l: "w1280",
        raw: "original",
    },
    profile: {
        s: "w45",
        m: "w185",
        l: "h632",
        raw: "original"
    }
}

export const getImgUrl = (imgName, type = 'poster' /* poster || backdrop | profile */, size = 'raw') => {
    // console.log('imgUrl = '+ IMG_BASE_URL + sizes[type][size] + imgName);
    if (!sizes[type] || !sizes[type][size]) throw new Error('Incorrect image type or size.');
    return IMG_BASE_URL + sizes[type][size] + imgName;
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${api_read_access_token}`;
axios.defaults.headers.common['accept'] = 'application/json';

export const getTrendingMovies = async (timeWindow = 'day' /* day | week */, page = 1) => {
    return axios.get(`trending/movie/${timeWindow}?language=en-US&page=${page}`);
}

export const getMovieDetails = async (id) => {
    return axios.get(`movie/${id}?language=en-US`);
}

export const getMovieReviews = async (id, page = 1) => {
    return axios.get(`movie/${id}/reviews?language=en-US&page=${page}`);
}

export const getMovieCredits = async (id) => {
    return axios.get(`movie/${id}/credits?language=en-US`);
}

export const searchMovies = async (query, page = 1) => {
    return axios.get(`search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`);
}