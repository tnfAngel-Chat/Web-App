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
			<ModalContent m='5px' color={getColorValue('textColor')} bg={getColorValue('modalBackground')}>
				<ModalHeader>Add a server</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack>
						<Text>WIP</Text>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
