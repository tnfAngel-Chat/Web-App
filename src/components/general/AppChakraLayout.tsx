'use client';

import { client } from '@/client';
import { Box } from '@chakra-ui/react';
import useTheme from '@/hooks/useTheme';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { IRawUser, IUser } from '@/types/interfaces/User';
import useThemeColors from '@/hooks/useThemeColors';
import { IChannel, IRawChannel } from '@/types/interfaces/Channel';
import normalizeChannel from '@/util/normalizeChannel';
import IndexLoadingScreen from '../screens/IndexLoadingScreen';
import { setChannels } from '@/store/slices/directChannelsSlice';
import normalizeUser from '@/util/normalizeUser';

const socket = client.socket.connect();

interface IUserPreferences {
	theme: string;
}

export default function AppChakraLayout({ children }: any) {
	const [theme, setTheme] = useTheme();
	const { getColorValue } = useThemeColors();
	const dispatch = useDispatch();
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
			users,
			channels,
			preferences,
		}: {
			users: IRawUser[];
			channels: IRawChannel[];
			preferences: IUserPreferences;
		}) {
			if (!ignore) {
				users.forEach((user) =>
					client.users.cache.set(user.id, normalizeUser(user))
				);

				dispatch(
					setChannels(
						channels.map((channel) => normalizeChannel(channel))
					)
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
	}, [dispatch, setTheme]);

	/*<Box
			h="100%"
			w="100%"
			sx={{
				'*': {
					'scrollbarWidth': 'thin',
					'scrollbarColor': 'blue transparent',
				},
				'*::-webkit-scrollbar': {
					width: '5px',
				},
				'*::-webkit-scrollbar-track': {
					background: 'transparent',
				},
				'*::-webkit-scrollbar-track:hover': {
					background: '#fff',
				},
				'*::-webkit-scrollbar-thumb': {
					'backgroundColor': 'blue',
					'borderRadius': '20px',
				},
			}}
		>
			{*/
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
	) /*}
		</Box>*/;
}
