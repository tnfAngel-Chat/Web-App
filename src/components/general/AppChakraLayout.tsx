'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box } from '@chakra-ui/react';
import { client } from '@/client';
import { useEffect, useState } from 'react';
import LoadingScreen from '../screens/LoadingScreen';

const socket = client.socket.connect();

export default function AppChakraLayout({ children }: any) {
	const { getColorValue } = useThemeColors();
	const [isLoading, setIsLoading] = useState(false);
	const [isConnected, setIsConnected] = useState(socket?.connected);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			setIsLoading(false);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket?.on('connect', onConnect);
		socket?.on('disconnect', onDisconnect);

		return () => {
			socket?.off('connect', onConnect);
			socket?.off('disconnect', onDisconnect);
		};
	}, []);

	return isLoading ? (
		<LoadingScreen />
	) : (
		<Box
			h="100%"
			w="100%"
			color={getColorValue('textColor')}
			bg={getColorValue('appBackground')}
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
		>
			{children}
		</Box>
	);
}
