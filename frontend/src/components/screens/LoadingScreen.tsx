'use client';

import { Center, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

export default function LoadingScreen() {
	const { colorMode } = useColorMode();

	return (
		<Center h="100%" w="100%" bg={`${colorMode}.sidebarContent`}>
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
