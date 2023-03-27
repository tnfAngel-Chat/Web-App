'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Center } from '@chakra-ui/react';
import Image from 'next/image';

export default function LoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Center h="100%" w="100%" bg={getColorValue('primaryBackground')}>
			<Image
				src="https://www.tnfangel.xyz/assets/logo.webp"
				width={200}
				height={200}
				quality={100}
				style={{ borderRadius: '50%' }}
				alt="tnfAngel Chat"
			/>
		</Center>
	);
}
