import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { movieGenre } from "../services/api";

const GenreMenu = ({ onSelectGenre, selectedGenre }) => {
	const [genre, setGenre] = useState([]);
	const [currentGenre, setCurrentGenre] = useState("");
	useEffect(() => {
		movieGenre()
			.then((res) => setGenre(res.genres))
			.catch((err) => console.log(err.results));
	}, []);
	return (
		<Box marginLeft={3}>
			<Menu>
				<MenuButton
					fontWeight={"light"}
					letterSpacing={"1px"}
					as={Button}
					rightIcon={<ChevronDownIcon />}
				>
					{currentGenre || "Genres"}
				</MenuButton>
				<MenuList>
					{genre?.map((genre) => (
						<MenuItem
							onClick={() => (
								onSelectGenre(genre?.id), setCurrentGenre(genre?.name)
							)}
							key={genre?.id}
						>
							{genre?.name}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default GenreMenu;
