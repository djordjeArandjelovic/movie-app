import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CardComponent = ({ movie }) => {
	const voteColor = (vote) => {
		let color = vote > 80 ? "green" : vote > 60 ? "yellow" : "red";
		return color;
	};
	const voteTextColor = (vote) => {
		let color = vote > 80 ? "#fff" : vote > 60 ? "#000" : "#fff";
		return color;
	};
	return (
		<Link key={movie?.id}>
			<Box
				bg={"blackAlpha.300"}
				width={"100%"}
				borderRadius={"lg"}
				overflow={"hidden"}
				position={"relative"}
				height={"100%"}
			>
				<Badge
					bg={voteColor(movie?.vote_average.toFixed(1) * 10)}
					color={voteTextColor(movie?.vote_average.toFixed(1) * 10)}
					position={"absolute"}
					right={0}
					padding={1.5}
					fontSize={"sm"}
				>
					{movie?.vote_average.toFixed(1) * 10 || "NaN"}
				</Badge>
				<Image
					mb={2}
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				/>

				<Flex padding={"0.1rem 1rem 0.5rem"} gap={1} flexDirection={"column"}>
					<Heading letterSpacing={"1px"} color={"green.500"} size={"md"}>
						{movie?.title || movie?.name}
					</Heading>
					<Text fontSize={"sm"}>
						{movie?.release_date || movie?.first_air_date}
					</Text>
				</Flex>
			</Box>
		</Link>
	);
};

export default CardComponent;
