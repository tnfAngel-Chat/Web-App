'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	useColorMode,
	Box,
	Center,
	Stack,
	Heading,
	Button,
} from '@chakra-ui/react';

export default function HomeScreen() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box w="100%" bg={`${colorMode}.primary.primaryContentBackground`}>
			<Center h="100vh">
				<Stack spacing="24px">
					<Heading as="h1">Bienvenido a tnfAngel Chat</Heading>
					<Button
						rightIcon={
							colorMode === 'light' ? <MoonIcon /> : <SunIcon />
						}
						onClick={toggleColorMode}
						variant="outline"
					>
						Activar modo{' '}
						{colorMode === 'light' ? 'oscuro' : 'claro'}
					</Button>
				</Stack>
			</Center>
		</Box>
	);
}
