'use client';

import useColorValue from '@/hooks/useColorValue';
import { ArrowForwardIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Stack, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function IndexScreen() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { getColorValue } = useColorValue();
	const router = useRouter();

	return (
		<Center
			h="100%"
			w="100%"
			bg={getColorValue('sidebarContent')}
		>
			<Stack spacing="24px">
				<Heading as="h1">tnfAngel Chat</Heading>

				<Button
					rightIcon={<ArrowForwardIcon />}
					onMouseEnter={() => router.prefetch('/home')}
					onClick={() => router.push('/home')}
				>
					Empezar
				</Button>

				<Button
					variant="outline"
					leftIcon={
						colorMode === 'light' ? <MoonIcon /> : <SunIcon />
					}
					onClick={toggleColorMode}
				>
					Activar modo {colorMode === 'light' ? 'oscuro' : 'claro'}
				</Button>
			</Stack>
		</Center>
	);
}
