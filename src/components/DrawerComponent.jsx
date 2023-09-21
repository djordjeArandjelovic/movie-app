import {
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	useDisclosure,
	Button,
	Text,
	keyframes,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BsChevronDoubleDown } from "react-icons/bs";

const bounce = keyframes`
  0 {
    transform:  scale(1);
  }
  50% {
    transform:  scale(1.2);
  }
  100% {
	transform:  scale(1);
  }
`;

function DrawerComponent() {
	const animation = `${bounce} infinite 2s`;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button
				children={<BsChevronDoubleDown />}
				variant={"ghost"}
				ref={btnRef}
				fontSize={"3xl"}
				colorScheme="red"
				onClick={onOpen}
				animation={animation}
			/>
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
							{/* <Link as={"button"} onClick={onClose} to={"/search"}>
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
							</Link> */}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
export default DrawerComponent;
