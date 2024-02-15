'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Center } from '@chakra-ui/react';
import Image from 'next/image';

export default function LoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Box
			h="100%"
			w="100%"
			bg={getColorValue('appBackground')}
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
		>
			<Center h="100%" w="100%" bg={getColorValue('primaryBackground')}>
				<Image
					src="logo.svg"
					width={200}
					height={200}
					quality={100}
					style={{ borderRadius: '50%' }}
					alt="tnfAngel Chat"
				/>
			</Center>
		</Box>
	);
}
