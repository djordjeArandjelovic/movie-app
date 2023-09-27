import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	getDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import VideoComponent from "../../components/VideoComponent";
import { useAuth } from "../../context/useAuth";
import { getDetails, getVideos } from "../../services/api";
import { db } from "../../firebase";
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
	useToast,
} from "@chakra-ui/react";

const MovieDetails = () => {
	const { user, uid } = useAuth();
	const { id } = useParams();
	const toast = useToast();
	const [details, setDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [video, setVideo] = useState(null);
	const [isInWL, setisInWL] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const movieDetails = await getDetails("movie", id);
				setDetails(movieDetails);

				const videoData = await getVideos("movie", id);
				const onlyTrailer = videoData.results?.find(
					(movie) => movie.type === "Trailer" && movie.official === true
				);
				if (onlyTrailer) {
					setVideo(onlyTrailer);
				}

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		if (uid !== null && details) {
			console.log(uid, "uid");
			console.log("this");
			const moviesRef = collection(db, "movies");
			const userDocRef = doc(moviesRef, uid);
			const favourites = collection(userDocRef, "favourites");
			const favouritesQuery = query(favourites, where("id", "==", details?.id));

			getDocs(favouritesQuery)
				.then((querySnapshot) => {
					setisInWL(!querySnapshot?.empty);
				})
				.catch((err) => {
					console.log(err, "error from geting docs");
				});
		}
	}, [details, uid]);

	const moviesCollection = collection(db, "movies");

	const addMovie = async (movieData) => {
		console.log(movieData);
		try {
			if (!user) {
				throw new Error("No user found");
			}
			const userDocRef = doc(moviesCollection, user?.uid);
			const favouritesCollection = collection(userDocRef, "favourites");
			const userFavColl = doc(favouritesCollection, movieData?.id?.toString());

			const docSnap = await getDoc(userFavColl);

			if (docSnap?.exists()) {
				toast({
					title: "Error.",
					description: `Movie already in the list`,
					status: "error",
					duration: 2500,
					position: "top",
				});
			} else {
				await setDoc(userFavColl, movieData);
				setisInWL(true);
				toast({
					title: "Success.",
					description: `Movie added to watchlist`,
					status: "success",
					duration: 2500,
					position: "top",
				});
			}
		} catch (error) {
			console.error("Error from addMovie():", error);
		}
	};

	const handleSave = () => {
		if (!user) {
			toast({
				title: "Error.",
				description: "Please log in",
				status: "error",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
		} else {
			addMovie(details);
		}
	};

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
									<Text as={"span"} fontSize={"sm"}>
										{details?.tagline}
									</Text>
								</Heading>
								<Heading color={"red.500"} fontSize={"sm"}>
									Runtime: {details?.runtime} mins
								</Heading>
							</Flex>
							<Text>{details?.overview}</Text>

							<Flex>
								{details?.genres?.map((genre) => (
									<Tag colorScheme={"cyan"} mr="2" mt="2" key={genre?.id}>
										{genre?.name}
									</Tag>
								))}
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
									{details?.budget === 0 ? "Unknown" : `$${details?.budget}`}
								</Text>
							</Text>
						</Flex>
						<Button onClick={handleSave} mt={2}>
							{isInWL === true ? "Already in WatchList" : "Add to Watchlist"}
						</Button>
					</Box>

					<Box mt={6} mb={5}>
						<Text mb={2}>Watch the trailer:</Text>
						{video !== null && <VideoComponent id={video?.key} />}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default MovieDetails;
