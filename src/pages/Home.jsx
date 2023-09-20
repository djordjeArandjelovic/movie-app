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
import { getTrenging } from "../services/api";

const Home = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getTrenging()
			.then((res) => setData(res.results))
			.catch((err) => console.log(err.message))
			.finally(setIsLoading(false));
	}, []);

	return (
		<Box mt={6}>
			<Heading>Trending now</Heading>
			<Grid templateColumns={"repeat(4, 1fr)"} gap={6} mt={6}>
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
		</Box>
	);
};

export default Home;
