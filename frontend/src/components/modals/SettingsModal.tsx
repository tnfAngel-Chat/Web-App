import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useColorMode,
	Text,
	Stack,
	Switch,
} from '@chakra-ui/react';

export default function SettingsModal({ isOpen, onOpen, onClose }: any) {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Modal isOpen={isOpen} size="full" onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={`${colorMode}.primary.sidebarContent`}>
					<ModalHeader>Ajustes de usuario</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Text>Modo oscuro</Text>
							<Switch
								isChecked={colorMode === 'dark'}
								onChange={toggleColorMode}
								colorScheme="green"
								size="md"
							/>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
