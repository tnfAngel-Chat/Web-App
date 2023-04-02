'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Stack, Flex } from '@chakra-ui/react';
import MainTopBar from '../layout/MainTopBar';
import FriendsTopBarContent from '../friends/FriendsTopBarContent';
import Friends from '../friends/Friends';

export default function HomeScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Flex
			scrollSnapAlign="center"
			scrollSnapStop="always"
			minW="500px"
			h="100%"
			w="100%"
			gap={0}
		>
			<Stack
				bg={getColorValue('primaryBackground')}
				scrollSnapAlign="center"
				scrollSnapStop="always"
				h="100%"
				spacing="10px"
				w="100%"
			>
				<MainTopBar>
					<FriendsTopBarContent />
				</MainTopBar>
				<Box h="100%" maxW="100%" overflowX="auto">
					<Friends />
				</Box>
			</Stack>
		</Flex>
	);
}
