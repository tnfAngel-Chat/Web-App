'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdSettings } from 'react-icons/md';

export default function IndexScreen() {
	const { getColorValue } = useThemeColors();
	const router = useRouter();

	return (
		<Center h="100%" w="100%" bg={getColorValue('sidebarContent')}>
			<Stack spacing="24px">
				<Heading as="h1">tnfAngel Chat</Heading>

				<Button
					rightIcon={<ArrowForwardIcon />}
					onMouseEnter={() => router.prefetch('/home')}
					onClick={() => router.push('/home')}
				>
					Empezar
				</Button>

				<Button variant="outline" rightIcon={<MdSettings />}>
					Abrir ajustes
				</Button>
			</Stack>
		</Center>
	);
}
