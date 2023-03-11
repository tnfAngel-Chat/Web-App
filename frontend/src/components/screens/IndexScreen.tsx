'use client';

import { ArrowForwardIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Stack, useColorMode } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';

export default function IndexScreen() {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Center h="100vh" bg={`${colorMode}.primary.sidebarContent`}>
			<Stack spacing="24px">
				<Heading as="h1">tnfAngel Chat</Heading>

				<Button
					rightIcon={<ArrowForwardIcon />}
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
