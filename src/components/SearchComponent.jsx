import React from "react";
import { BsSearch } from "react-icons/bs";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchComponent = ({ input, handleSearch, placeholder }) => {
	return (
		<InputGroup>
			<InputLeftElement children={<BsSearch />} />
			<Input
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
