import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
	Button,
	FormControl,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { useRef } from "react";

const SearchComponent = ({ input, handleSearch, placeholder }) => {
	const gameRef = useRef();

	return (
		<InputGroup>
			<InputLeftElement children={<BsSearch />} />
			<Input
				ref={gameRef}
				borderRadius={20}
				fontWeight={"light"}
				placeholder={placeholder}
				variant="filled"
				value={input}
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</InputGroup>
	);
};

export default SearchComponent;
