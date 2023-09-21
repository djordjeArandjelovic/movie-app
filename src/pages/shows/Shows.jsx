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
import PaginationComponent from "../../components/PaginationComponent";
import SearchComponent from "../../components/SearchComponent";
import SearchMovies from "../../components/SearchComponent";

import { getShows, searchShows } from "../../services/api";

const Shows = () => {
	const [shows, setShows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// PAGINATION
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// SEARCH
	const [input, setInput] = useState("");

	const handleSearch = (value) => {
		setInput(value);
	};

	useEffect(() => {
		setIsLoading(true);
		searchShows(input)
			.then((res) => {
				setShows(res?.results);
			})
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, [input]);

	useEffect(() => {
		setIsLoading(true);
		getShows(activePage)
			.then((res) => {
				setShows(res?.results);
				setActivePage(res?.page);
				setTotalPages(res?.total_pages);
			})
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, [activePage]);
	return (
		<Box mt={6} mb={7}>
			<Heading letterSpacing={"1px"} textAlign={"center"}>
				Discover TvShows
			</Heading>
			<Box width={"full"} mt={3}>
				<SearchComponent
					input={input}
					handleSearch={handleSearch}
					placeholder={"Search Shows..."}
				/>
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
				{shows.map((show) =>
					isLoading ? (
						<Card key={show.id}>
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
						<CardComponent key={show.id} movie={show} />
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

export default Shows;
