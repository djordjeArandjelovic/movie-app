import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "f0ee1a65033e67391f5cb7dee14c36bd";

// TRENDING

export const getTrenging = async (page = 1) => {
	const res = await axios.get(
		`${baseUrl}/trending/all/day?api_key=${apiKey}&page=${page}`
	);
	return res?.data;
};

// MOVIES

export const getMovies = async (page = 1) => {
	const res = await axios.get(
		`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}`
	);
	return res?.data;
};

// TV SHOW

export const getShows = async (page = 1) => {
	const res = await axios.get(
		`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}`
	);
	return res?.data;
};
