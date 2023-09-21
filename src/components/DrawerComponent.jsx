import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	useDisclosure,
	Button,
	Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function DrawerComponent() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button ref={btnRef} colorScheme="red" onClick={onOpen}>
				Open
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="top"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent bg={"blackAlpha.800"}>
					<DrawerCloseButton />

					<DrawerBody>
						<Flex flexDirection={"column"} gap={4} align={"center"}>
							<Link as={"button"} onClick={onClose} to={"/"}>
								<Text
									letterSpacing={"1px"}
									fontSize={"lg"}
									fontWeight={"semibold"}
									transition=".5s"
									_hover={{
										color: "red",
										transform: "scale(1.2)",
									}}
								>
									Home
								</Text>
							</Link>
							<Link as={"button"} onClick={onClose} to={"/movies"}>
								<Text
									letterSpacing={"1px"}
									fontSize={"lg"}
									fontWeight={"semibold"}
									transition=".5s"
									_hover={{
										color: "red",
										transform: "scale(1.2)",
									}}
								>
									Movies
								</Text>
							</Link>
							<Link as={"button"} onClick={onClose} to={"/shows"}>
								<Text
									letterSpacing={"1px"}
									fontSize={"lg"}
									fontWeight={"semibold"}
									transition=".5s"
									_hover={{
										color: "red",
										transform: "scale(1.2)",
									}}
								>
									Tv Shows
								</Text>
							</Link>
							<Link as={"button"} onClick={onClose} to={"/search"}>
								<Text
									letterSpacing={"1px"}
									fontSize={"lg"}
									fontWeight={"semibold"}
									transition=".5s"
									_hover={{
										color: "red",
										transform: "scale(1.2)",
									}}
								>
									Search
								</Text>
							</Link>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
export default DrawerComponent;
