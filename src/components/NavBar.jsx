import React from "react";
import {
	Container,
	Flex,
	Box,
	Text,
	Show,
	HStack,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";
import { useAuth } from "../context/useAuth";

const NavBar = () => {
	const { user, googleSignIn, logout } = useAuth();
	const toast = useToast();

	const handleGoogle = async () => {
		try {
			await googleSignIn();
			toast({
				title: "Success.",
				description: `Welcome`,
				status: "success",
				duration: 2500,
				position: "top",
			});
		} catch (error) {
			toast({
				title: "Error.",
				description: error?.message,
				status: "error",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
		}
	};

	return (
		<Box py={4} bg={"blackAlpha.200"}>
			<Container maxW={"container.xl"}>
				<Flex justify={"space-between"}>
					<HStack>
						<Link to={"/"}>
							<Box
								fontWeight={"bold"}
								color={"red"}
								letterSpacing={"widest"}
								fontFamily={"mono"}
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
					</HStack>
					<Show above="md">
						<Flex gap={4} align={"center"}>
							<Link to={"/"}>Home</Link>
							<Link to={"/movies"}>Movies</Link>
							<Link to={"/shows"}>TV Shows</Link>
							{user && (
								<Menu>
									<MenuButton>
										<Avatar
											size={"sm"}
											name={user?.displayName || user?.email}
										/>
									</MenuButton>
									<MenuList>
										<Link to={"/watchlist"}>
											<MenuItem>WatchList</MenuItem>
										</Link>
										<MenuItem onClick={logout}>Logout</MenuItem>
									</MenuList>
								</Menu>
							)}
							{!user && (
								<Box as="button" onClick={handleGoogle}>
									Login
								</Box>
							)}
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
