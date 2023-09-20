import {
	Box,
	Card,
	CardBody,
	Grid,
	Heading,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { getMovies } from "../../services/api";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getMovies()
			.then((res) => setMovies(res?.results))
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, []);
	return (
		<Box mt={6}>
			<Heading>Movies</Heading>
			<Grid templateColumns={"repeat(4, 1fr)"} gap={6} mt={6}>
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
		</Box>
	);
};

export default Movies;
