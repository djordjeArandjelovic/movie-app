import {
	Box,
	Card,
	CardBody,
	Grid,
	Heading,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import PaginationComponent from "../components/PaginationComponent";
import { getTrending } from "../services/api";

const Home = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// PAGINATION
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		getTrending(activePage)
			.then((res) => {
				setData(res?.results);
				setActivePage(res?.page);
				setTotalPages(res?.total_pages);
			})
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, [activePage]);

	return (
		<Box mt={6} mb={7}>
			<Heading>Trending now</Heading>
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
				{data.map((movie) =>
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
						<CardComponent movie={movie} key={movie.id} />
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

export default Home;
