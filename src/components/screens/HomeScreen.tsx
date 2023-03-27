'use client';

import useThemeColors from '@/hooks/useThemeColors';
import {
	Box,
	Center,
	Stack,
	Heading,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import SettingsModal from '../modals/SettingsModal';

export default function HomeScreen() {
	const { getColorValue } = useThemeColors();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			scrollSnapAlign="center"
			scrollSnapStop="always"
			h="100%"
			w="100%"
			minW="500px"
			bg={getColorValue('primaryBackground')}
		>
			<Center h="100%">
				<Stack spacing="24px">
					<Heading as="h1">Bienvenido a tnfAngel Chat</Heading>
					<SettingsModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
					/>
					<Button
						variant="outline"
						onClick={onOpen}
						rightIcon={<MdSettings />}
					>
						Abrir ajustes
					</Button>
				</Stack>
			</Center>
		</Box>
	);
}
