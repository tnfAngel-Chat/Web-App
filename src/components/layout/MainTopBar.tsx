'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Flex } from '@chakra-ui/react';

export default function MainTopBar({ children }: Readonly<{ children: any }>) {
	const { getColorValue } = useThemeColors();

	return (
		<Box h='44px' bg={getColorValue('secondaryBackground')} w='100%' py='5px' px={['15px', '20px']}>
			<Flex h='100%' maxH='100%' alignItems='center'>
				{children}
			</Flex>
		</Box>
	);
}
