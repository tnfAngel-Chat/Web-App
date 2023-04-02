'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Center } from '@chakra-ui/react';
import Home from '../home/Home';

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
				<Home />
			</Center>
		</Box>
	);
}
