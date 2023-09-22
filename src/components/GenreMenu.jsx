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

const GenreMenu = ({ genre, handleGenre }) => {
	return (
		<Box marginLeft={3}>
			<Menu>
				<MenuButton
					fontWeight={"light"}
					letterSpacing={"1px"}
					as={Button}
					rightIcon={<ChevronDownIcon />}
				>
					Genres
				</MenuButton>
				<MenuList>
					{genre?.map((genre) => (
						<MenuItem onClick={() => handleGenre(genre?.id)} key={genre?.id}>
							{genre?.name}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default GenreMenu;
