import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const PaginationComponent = ({ activePage, setActivePage, totalPages }) => {
	return (
		<Flex gap={2} mt={5} justify={"center"}>
			<Button isDisabled={activePage === 1} onClick={() => setActivePage(1)}>
				{"<<"}
			</Button>
			<Button
				isDisabled={activePage === 1}
				onClick={() => setActivePage(activePage - 1)}
			>
				Prev
			</Button>
			<Text fontSize={"2xl"}>
				{activePage} of {totalPages}
			</Text>
			<Button
				isDisabled={activePage === totalPages}
				onClick={() => setActivePage(activePage + 1)}
			>
				Next
			</Button>
		</Flex>
	);
};

export default PaginationComponent;
