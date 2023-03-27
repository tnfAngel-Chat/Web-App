'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdSettings } from 'react-icons/md';
import SettingsModal from '../modals/SettingsModal';

export default function IndexScreen() {
	const { getColorValue } = useThemeColors();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Center h="100%" w="100%" bg={getColorValue('appBackground')}>
			<Stack spacing="24px">
				<Heading as="h1">tnfAngel Chat</Heading>

				<Button
					rightIcon={<ArrowForwardIcon />}
					onMouseEnter={() => router.prefetch('/home')}
					onClick={() => router.push('/home')}
				>
					Empezar
				</Button>

				<SettingsModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
					/>
				<Button variant="outline" onClick={onOpen} rightIcon={<MdSettings />}>
					Abrir ajustes
				</Button>
			</Stack>
		</Center>
	);
}
