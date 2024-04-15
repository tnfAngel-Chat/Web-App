import useThemeColors from '@/hooks/useThemeColors';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text
} from '@chakra-ui/react';

export default function AddServerModal({ isOpen, onClose }: any) {
	const { getColorValue } = useThemeColors();

	return (
		<Modal isOpen={isOpen} size='lg' isCentered onClose={onClose}>
			<ModalOverlay backdropFilter='blur(5px)' />
			<ModalContent color={getColorValue('textColor')} bg={getColorValue('modalBackground')}>
				<ModalHeader>Añadir un servidor</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack>
						<Text>En proceso</Text>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
