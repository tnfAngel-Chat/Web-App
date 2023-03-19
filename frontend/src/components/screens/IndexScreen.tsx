'use client';

import useColorValue from '@/hooks/useColorValue';
import { ArrowForwardIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Stack, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

export default function IndexScreen() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { getColorValue } = useColorValue();

	return (
		<Center h="100vh" bg={getColorValue('sidebarContent')}>
			<Stack spacing="24px">
				<Heading as="h1">tnfAngel Chat</Heading>

				<Link href="/home">
					<Button rightIcon={<ArrowForwardIcon />}>
						Empezar
					</Button>
				</Link>

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
