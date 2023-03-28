'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box } from '@chakra-ui/react';
import { client } from '@/client';
import { useEffect, useState } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { IChannel } from '@/types/interfaces/Channel';
import { IUser } from '@/types/interfaces/User';
import { useDispatch } from 'react-redux';
import { addChannel } from '@/store/slices/directChannelsSlice';

const socket = client.socket.connect();

export default function AppChakraLayout({ children }: any) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const [isLoading, setIsLoading] = useState(true);
	const [isConnected, setIsConnected] = useState(socket?.connected);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			setIsLoading(false);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onReady({
			channels,
			users,
		}: {
			channels: IChannel[];
			users: IUser[];
		}) {
			channels.forEach((channel) => dispatch(addChannel(channel)));
		}

		socket?.on('connect', onConnect);
		socket?.on('disconnect', onDisconnect);

		socket?.on('ready', onReady);

		return () => {
			socket?.off('connect', onConnect);
			socket?.off('ready', onConnect);
			socket?.off('disconnect', onDisconnect);
		};
	}, []);

	return isLoading ? (
		<LoadingScreen />
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
			<Box h="100%" w="100%" scrollSnapType="x mandatory" scrollSnapStop="always" scrollBehavior="smooth" overflow="auto">
				{children}
			</Box>
		</Box>
	);
}
