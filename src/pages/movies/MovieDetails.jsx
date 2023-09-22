import {
	Box,
	Flex,
	Heading,
	HStack,
	Image,
	Spinner,
	Text,
	Badge,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../../services/api";

const MovieDetails = () => {
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		getDetails("movie", id)
			.then((res) => setDetails(res))
			.catch((err) => console.log(err.results))
			.finally(() => setIsLoading(false));
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
							<Heading>
								{details?.title} <br />{" "}
								<Text fontSize={"sm"} as={"span"}>
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
						<Text fontSize={"xl"}>
							Release date:{" "}
							<Text ml={2} as={"span"} fontSize={"lg"} fontWeight={"bold"}>
								{details?.release_date}
							</Text>
						</Text>
						<Text fontSize={"xl"}>
							Budget:
							<Text ml={2} as={"span"} fontSize={"lg"} fontWeight={"bold"}>
								{details?.budget === "0" ? "Unknown" : `$${details?.budget}`}
							</Text>
						</Text>
						<Text></Text>
						<Text></Text>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default MovieDetails;
