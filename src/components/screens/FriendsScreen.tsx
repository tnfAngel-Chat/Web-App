'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Center, Stack, Heading, Text } from '@chakra-ui/react';

export default function HomeScreen() {
	const { getColorValue } = useThemeColors();

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
					<Heading as="h1">Amigos</Heading>
					<Text>Vaya.. Parece que no tienes</Text>
					<Text as="sup">
						Broma simplemente no he creado la página
					</Text>
				</Stack>
			</Center>
		</Box>
	);
}
