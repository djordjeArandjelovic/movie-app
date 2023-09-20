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
import { getShows } from "../../services/api";

const Shows = () => {
	const [shows, setShows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getShows()
			.then((res) => setShows(res?.results))
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, []);
	return (
		<Box mt={6}>
			<Heading>Movies</Heading>
			<Grid templateColumns={"repeat(4, 1fr)"} gap={6} mt={6}>
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
		</Box>
	);
};

export default Shows;
