'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Flex } from '@chakra-ui/react';

export default function MainTopBar({ children }: { children: any }) {
	const { getColorValue } = useThemeColors();

	return (
		<Box h='44px' bg={getColorValue('secondaryBackground')} w='100%' padding='5px 20px 5px 20px'>
			<Flex h='100%' maxH='100%' alignItems='center'>
				{children}
			</Flex>
		</Box>
	);
}
