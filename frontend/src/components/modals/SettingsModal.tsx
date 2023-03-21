import useColorValue from '@/hooks/useColorValue';
import {
	ModalCloseButton,
	ModalOverlay,
	ModalContent,
	useColorMode,
	ModalHeader,
	ModalBody,
	Switch,
	Stack,
	Modal,
	Text,
} from '@chakra-ui/react';

export default function SettingsModal({ isOpen, onClose }: any) {
	const { getColorValue } = useColorValue();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Modal isOpen={isOpen} size="full" onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={getColorValue('sidebarContent')}>
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
	);
}
