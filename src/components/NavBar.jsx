import React from "react";
import { Container, Flex, Box, Text, Show } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";

const NavBar = () => {
	return (
		<Box py={4} bg={"blackAlpha.200"}>
			<Container maxW={"container.xl"}>
				<Flex justify={"space-between"}>
					<Link to={"/"}>
						<Box
							// fontSize={"2xl"}
							fontWeight={"bold"}
							color={"red"}
							letterSpacing={"widest"}
							fontFamily={"mono"}
							// display={"flex"}
						>
							<span className="biggest">N</span>
							<span className="big">E</span>
							<span className="small">T</span>
							<span className="smallest">F</span>
							<span className="small">L</span>
							<span className="big">E</span>
							<span className="biggest">X</span>
						</Box>
					</Link>
					<Show above="md">
						<Flex gap={4} align={"center"}>
							<Link to={"/"}>Home</Link>
							<Link to={"/movies"}>Movies</Link>
							<Link to={"/shows"}>TV Shows</Link>
							<Link to={"/search"}>Search</Link>
						</Flex>
					</Show>
					<Show below="md">
						<Flex align={"center"}>
							<DrawerComponent />
						</Flex>
					</Show>
				</Flex>
			</Container>
		</Box>
	);
};

export default NavBar;
