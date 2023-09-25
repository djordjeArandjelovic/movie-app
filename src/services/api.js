import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "f0ee1a65033e67391f5cb7dee14c36bd";

// TRENDING

export const getTrending = async (page) => {
	const res = await axios.get(
		`${baseUrl}/trending/all/day?api_key=${apiKey}&page=${page}`
	);
	return res?.data;
};

// SEARCH ALL

export const searchAll = async (searchText) => {
	const res = await axios.get(
		`${baseUrl}/search/multi?api_key=${apiKey}&query=${searchText}`
	);
	return res?.data;
};

// MOVIES

export const getMovies = async (page, genreID) => {
	const res = await axios.get(
		`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${genreID}`
	);
	return res?.data;
};

// SEARCH MOVIES

export const searchMovies = async (searchText) => {
	const res = await axios.get(
		`${baseUrl}/search/movie?api_key=${apiKey}&query=${searchText}`
	);
	return res?.data;
};

// MOVIE DETAILS

export const getDetails = async (media_type, id) => {
	const res = await axios.get(
		`${baseUrl}/${media_type}/${id}?api_key=${apiKey}`
	);
	return res?.data;
};

// MOVIE GENRE

export const movieGenre = async () => {
	const res = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
	return res?.data;
};

// GET VIDEOS

export const getVideos = async (mediaType, mediaID) => {
	const res = await axios.get(
		`${baseUrl}/${mediaType}/${mediaID}/videos?api_key=${apiKey}`
	);
	return res?.data;
};

// GET MOVIES BY GENRE ??????? TODO:

export const getMoviesByGenre = async (selectedGenreID) => {
	const res = await axios.get(
		`${baseUrl}/discover/movie?api_key=${apiKey}&genre_ids=${selectedGenreID}`
	);
	return res?.data;
};

// TV SHOW

export const getShows = async (page, genreID) => {
	const res = await axios.get(
		`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&with_genres=${genreID}`
	);
	return res?.data;
};

// SEARCH SHOWS

export const searchShows = async (searchText) => {
	const res = await axios.get(
		`${baseUrl}/search/tv?api_key=${apiKey}&query=${searchText}`
	);
	return res?.data;
};

// TV GENRE

export const tvGenre = async () => {
	const res = await axios.get(`${baseUrl}/genre/tv/list?api_key=${apiKey}`);
	return res?.data;
};
