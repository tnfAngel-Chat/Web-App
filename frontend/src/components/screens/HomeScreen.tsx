'use client';

import useColorValue from '@/hooks/useColorValue';
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
	const { getColorValue } = useColorValue();

	return (
		<Box
			h="100%"
			w="100%"
			minW="500px"
			bg={getColorValue('primaryContentBackground')}
		>
			<Center h="100%">
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
