'use client';

import useThemeColors from '@/hooks/useThemeColors';
import IndexLoadingScreen from '../screens/IndexLoadingScreen';
import { client } from '@/client';
import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { IUser } from '@/types/interfaces/User';
import { IChannel } from '@/types/interfaces/Channel';
import { addChannel } from '@/store/slices/directChannelsSlice';
import normalizeChannel from '@/util/normalizeChannel';
import useTheme from '@/hooks/useTheme';

const socket = client.socket.connect();

interface IUserPreferences {
	theme: string;
}

export default function AppChakraLayout({ children }: any) {
	const dispatch = useDispatch();
	const [theme, setTheme] = useTheme();
	const { getColorValue } = useThemeColors();
	const [isLoading, setIsLoading] = useState(true);
	const [isConnected, setIsConnected] = useState(socket?.connected);

	useEffect(() => {
		let ignore = false;

		function onConnect() {
			if (!ignore) {
				setIsConnected(true);
			}
		}

		function onDisconnect() {
			if (!ignore) setIsConnected(false);
		}

		function onReady({
			channels,
			users,
			preferences,
		}: {
			channels: IChannel[];
			users: IUser[];
			preferences: IUserPreferences;
		}) {
			if (!ignore) {
				channels.forEach((channel) =>
					dispatch(addChannel(normalizeChannel(channel)))
				);

				setTheme(preferences.theme);

				setIsLoading(false);
			}
		}

		socket?.on('connect', onConnect);
		socket?.on('disconnect', onDisconnect);

		socket?.on('ready', onReady);

		return () => {
			ignore = true;

			socket?.off('connect', onConnect);
			socket?.off('ready', onConnect);
			socket?.off('disconnect', onDisconnect);
		};
	}, [dispatch]);

	return isLoading ? (
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
	);
}
