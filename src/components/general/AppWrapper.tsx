'use client';

import { Box } from '@chakra-ui/react';
import useThemeColors from '@/hooks/useThemeColors';
import IndexLoadingScreen from '../screens/IndexLoadingScreen';
import AppSocket from './AppSocket';
import { useState } from 'react';

export default function AppWrapper({ children }: any) {
	const { getColorValue } = useThemeColors();
	const [isLoading, setIsLoading] = useState(true);
	return (
		<AppSocket onConnectionReady={() => setIsLoading(false)}>
			{isLoading ? (
				<IndexLoadingScreen />
			) : (
				<Box
					h="100%"
					w="100%"
					overflow="hidden"
					color={getColorValue('textColor')}
					bg={getColorValue('appBackground')}
					backgroundRepeat="no-repeat"
					backgroundSize="cover"
				>
					<Box
						h="100%"
						w="100%"
						scrollSnapType="x mandatory"
						scrollSnapStop="always"
						scrollBehavior="smooth"
						overflow="auto"
					>
						{children}
					</Box>
				</Box>
			)}
		</AppSocket>
	);
}
