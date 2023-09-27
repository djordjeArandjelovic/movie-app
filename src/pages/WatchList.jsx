import React, { useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, doc, deleteDoc } from "firebase/firestore";
import { Box, Button, Grid, Heading, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import CardComponent from "../components/CardComponent";

const WatchList = () => {
	const { user } = useAuth();
	const [watchList, setWatchList] = useState([]);
	const toast = useToast();

	useEffect(() => {
		if (!user) {
			return;
		}
		const movies = collection(db, "movies");
		const uidDocRef = doc(movies, user?.uid);
		const favouritesRef = collection(uidDocRef, "favourites");
		const favQuery = query(favouritesRef);

		getDocs(favQuery)
			.then((querySnapshot) => {
				const movies = [];
				querySnapshot?.forEach((doc) => {
					movies.push(doc?.data());
				});
				setWatchList(movies);
			})
			.catch((err) => console.log(err, "err from firebase"));
	}, [user]);

	const handleRemove = async (id) => {
		try {
			if (!user) {
				throw new Error("No user found");
			} else {
				const userFavColl = collection(db, "movies", user?.uid, "favourites");
				const movieDocRef = doc(userFavColl, id);
				await deleteDoc(movieDocRef);
				toast({
					title: "Success.",
					description: `Movie successfully removed from watchlist.`,
					status: "success",
					duration: 2500,
					position: "top",
				});
				const filteredWL = watchList.filter((movie) => movie.id != id);
				setWatchList(filteredWL);
			}
		} catch (error) {
			console.log(error, "error from handleRemove()");
		}
	};

	return (
		<Box mt={6}>
			<Heading>WatchList</Heading>
			{watchList?.length === 0 ? (
				<Text>Your WatchList is empty</Text>
			) : (
				<Grid
					templateColumns={{
						lg: "repeat(5, 1fr)",
						md: "repeat(3, 1fr)",
						sm: "repeat(2, 1fr)",
						base: "1fr",
					}}
					gap={6}
					mt={6}
				>
					{watchList.map((movie) => {
						return (
							<Box position={"relative"} key={movie.id}>
								<CardComponent movie={movie} type={"movie"} />
								<Button
									position={"absolute"}
									color={"red"}
									background={"gray.800"}
									top={"1%"}
									left={"1%"}
									size={"xs"}
									onClick={() => handleRemove(movie?.id?.toString())}
								>
									Remove
								</Button>
							</Box>
						);
					})}
				</Grid>
			)}
		</Box>
	);
};

export default WatchList;
