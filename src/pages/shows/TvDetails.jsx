import {
	Badge,
	Box,
	Flex,
	Heading,
	HStack,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../../services/api";

const TvDetails = () => {
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		// getDetails("tv", id)
		// 	.then((res) => setDetails(res))
		// 	.catch((err) => console.log(err.results))
		// 	.finally(() => setIsLoading(false));
		try {
			getDetails("tv", id);
			setDetails(res?.data);
		} catch (error) {
			console.log(error);
		}
	}, []);
	return (
		<Box mt={6}>
			{isLoading ? (
				<Box textAlign={"center"}>
					<Spinner size={"lg"} />
				</Box>
			) : (
				<Box>
					<HStack align={"center"} justify={"center"}>
						<Image
							borderRadius={"lg"}
							src={`https://image.tmdb.org/t/p/w200${details?.poster_path}`}
						/>
						<Flex
							width={"50%"}
							margin={"auto"}
							direction={"column"}
							align={"center"}
							gap={10}
						>
							<Heading textAlign={"center"}>
								{details?.name} <br />
								<Badge
									borderRadius={"full"}
									padding={2}
									fontSize={"sm"}
									colorScheme={"green"}
								>
									{details?.vote_average.toFixed(1)}/10
								</Badge>
								<br />
								<Text as={"span"} fontSize={"sm"}>
									{details?.tagline}
								</Text>
							</Heading>
							<Text>{details?.overview}</Text>
						</Flex>
					</HStack>
					<Heading mt={5} fontSize={"2xl"}>
						Details:
					</Heading>
					<Flex direction={"column"}>
						<Text>
							First air date:
							<Text as={"span"} ml={2} fontSize={"lg"} fontWeight={"bold"}>
								{new Date(details?.first_air_date).toLocaleDateString()}
							</Text>
						</Text>
						<Text>Seasons: {details?.number_of_seasons}</Text>
						<Text> Episodes: {details?.number_of_episodes}</Text>
						<Text>
							Next episode air:
							{details?.next_episode_to_air || "Not filming anymore"}
						</Text>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default TvDetails;
