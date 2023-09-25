import {
	Box,
	Flex,
	Heading,
	HStack,
	Image,
	Spinner,
	Text,
	Badge,
	Button,
	Tag,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoComponent from "../../components/VideoComponent";
import { getDetails, getVideos } from "../../services/api";

const MovieDetails = () => {
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [video, setVideo] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		getDetails("movie", id)
			.then((res) => setDetails(res))
			.catch((err) => console.log(err.results))
			.finally(() => setIsLoading(false));

		getVideos("movie", id).then((res) => {
			const { results } = res;
			const onlyTrailer = results?.filter(
				(movie) => movie.type === "Trailer" && movie?.official === true
			);
			if (onlyTrailer) {
				setVideo(onlyTrailer[0]);
			} else {
				return;
			}
		});
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
							src={`https://image.tmdb.org/t/p/w300${details?.poster_path}`}
						/>

						<Flex
							width={"50%"}
							margin={"auto"}
							direction={"column"}
							align={"center"}
							gap={10}
						>
							<Flex align={"baseline"} gap={5}>
								<Heading>
									{details?.title}
									<br />
									<Badge
										borderRadius={"full"}
										padding={2}
										fontSize={"sm"}
										colorScheme={"green"}
									>
										{details?.vote_average.toFixed(1)}/10
									</Badge>
									<br />
									<Text fontSize={"sm"} as={"span"}>
										{details?.tagline}
									</Text>
								</Heading>
								<Heading color={"red.500"} fontSize={"sm"}>
									Runtime: {details?.runtime} mins
								</Heading>
							</Flex>
							<Text>{details?.overview}</Text>

							<Flex>
								{details?.genres?.map((genre) => {
									return (
										<Tag colorScheme={"cyan"} mr="2" mt="2" key={genre.id}>
											{genre.name}
										</Tag>
									);
								})}
							</Flex>
						</Flex>
					</HStack>

					<Box>
						<Heading mt={5} fontSize={"2xl"}>
							Details:
						</Heading>
						<Flex direction={"column"}>
							<Text fontSize={"xl"}>
								Release date:
								<Text ml={2} as={"span"} fontSize={"lg"} fontWeight={"bold"}>
									{new Date(details?.release_date).toLocaleDateString()}
								</Text>
							</Text>
							<Text fontSize={"xl"}>
								Budget:
								<Text ml={2} as={"span"} fontSize={"lg"} fontWeight={"bold"}>
									{details?.budget === "0" ? "Unknown" : `$${details?.budget}`}
								</Text>
							</Text>
						</Flex>
						<Button mt={2}>Add to Watchlist</Button>
					</Box>

					<Box mt={6} mb={5}>
						<Text mb={2}>Watch the trailer:</Text>
						{video !== null && <VideoComponent id={video.key} />}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default MovieDetails;
