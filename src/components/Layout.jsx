import { Container } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
	return (
		<>
			<NavBar />
			<main>
				<Container maxW={"container.xl"}>{children}</Container>
			</main>
			{/* TODO: FOOTER */}
		</>
	);
};

export default Layout;
