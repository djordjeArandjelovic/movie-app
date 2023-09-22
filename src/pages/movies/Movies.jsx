import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	Grid,
	Heading,
	HStack,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import GenreMenu from "../../components/GenreMenu";
import PaginationComponent from "../../components/PaginationComponent";
import SearchComponent from "../../components/SearchComponent";
import {
	getMovies,
	getMoviesByGenre,
	movieGenre,
	searchMovies,
} from "../../services/api";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// PAGINATION
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// SEARCH
	const [input, setInput] = useState("");

	const handleSearch = (value) => {
		setInput(value);
	};

	// GENRE
	const [genre, setGenre] = useState([]);
	const [selectedGenreID, setSelectedGenreID] = useState(null);

	const handleGenre = (genreId) => {
		setSelectedGenreID(genreId);
	};

	useEffect(() => {
		movieGenre()
			.then((res) => setGenre(res.genres))
			.catch((err) => console.log(err.results));
	}, []);

	useEffect(() => {
		setIsLoading(true);
		searchMovies(input)
			.then((res) => {
				setMovies(res?.results);
			})
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, [input]);

	useEffect(() => {
		setIsLoading(true);
		getMovies(activePage)
			.then((res) => {
				setMovies(res?.results);
				setActivePage(res?.page);
				setTotalPages(res?.total_pages);
			})
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, [activePage]);
	return (
		<Box mt={6} mb={7}>
			<Heading letterSpacing={"1px"} textAlign={"center"}>
				Discover Movies
			</Heading>
			<Box width={"md"} margin={"auto"} mt={3}>
				<HStack>
					<SearchComponent
						movies={movies}
						input={input}
						setInput={setInput}
						handleSearch={handleSearch}
						placeholder={"Search movies..."}
					/>
					<GenreMenu genre={genre} handleGenre={handleGenre} />
				</HStack>
			</Box>
			<Grid
				templateColumns={{
					lg: "repeat(5, 1fr)",
					md: "repeat(3, 1fr)",
					sm: "repeat(2, 1fr)",
					base: "repeat(1, 1fr)",
				}}
				gap={6}
				mt={6}
			>
				{movies.map((movie) =>
					isLoading ? (
						<Card key={movie.id}>
							<Skeleton
								height={"250px"}
								borderRadius={"lg"}
								overflow={"hidden"}
								bg={"blackAlpha.300"}
							/>
							<CardBody>
								<SkeletonText />
							</CardBody>
						</Card>
					) : (
						<CardComponent key={movie.id} movie={movie} />
					)
				)}
			</Grid>
			<PaginationComponent
				activePage={activePage}
				setActivePage={setActivePage}
				totalPages={totalPages}
			/>
		</Box>
	);
};

export default Movies;
