'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Center, Stack, Heading, Button } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';

export default function HomeScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Box
			scrollSnapAlign="center"
			scrollSnapStop="always"
			h="100%"
			w="100%"
			minW="500px"
			bg={getColorValue('primaryContentBackground')}
		>
			<Center h="100%">
				<Stack spacing="24px">
					<Heading as="h1">Bienvenido a tnfAngel Chat</Heading>
					<Button variant="outline" rightIcon={<MdSettings />}>
						Abrir ajustes
					</Button>
				</Stack>
			</Center>
		</Box>
	);
}
