import { client } from '@/client';
import useTheme from '@/hooks/useTheme';
import { modifyChannel, setChannels } from '@/store/slices/channelsSlice';
import { addMessage } from '@/store/slices/chatsSlice';
import { setGuilds } from '@/store/slices/guildsSlice';
import type { IRawChannel } from '@/types/interfaces/Channel';
import type { IRawGuild } from '@/types/interfaces/Guild';
import type { IRawMessage } from '@/types/interfaces/Message';
import type { IRawUser } from '@/types/interfaces/User';
import normalizeChannel from '@/util/normalizeChannel';
import normalizeGuild from '@/util/normalizeGuild';
import normalizeMessage from '@/util/normalizeMessage';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IUserPreferences {
	theme: string;
}

let isReconnection = false;

export default function AppSocket({ children, onConnectionReady }: any) {
	const [_theme, setTheme] = useTheme();
	const [_isConnected, setIsConnected] = useState(false);
	const dispatch = useDispatch();
	const toast = useToast();

	useEffect(() => {
		const socket = client.socket.connect();

		function onConnect() {
			setIsConnected(true);

			toast.closeAll();

			setTimeout(() => {
				if (isReconnection) {
					toast({
						title: 'Back online',
						description: 'You are connected to chat again.',
						status: 'success',
						position: 'top-right',
						duration: 5000,
						isClosable: true
					});
				}
			}, 500);
		}

		function onDisconnect() {
			setIsConnected(false);
			toast({
				title: 'Disconnected',
				description: 'You have been disconnected from chat.',
				status: 'error',
				position: 'top-right',
				duration: null
			});
			isReconnection = true;
		}

		function onReady({
			guilds,
			users,
			channels,
			preferences
		}: {
			guilds: IRawGuild[];
			users: IRawUser[];
			channels: IRawChannel[];
			preferences: IUserPreferences;
		}) {
			client.populate({
				users,
				channels
			});

			dispatch(setGuilds(guilds.map((guild) => normalizeGuild(guild))));

			dispatch(setChannels(channels.map((channel) => normalizeChannel(channel))));

			setTheme(preferences.theme);
			onConnectionReady();
		}

		function onMessageCreate(message: IRawMessage) {
			const channel = client.channels.resolve(message.channelId);

			dispatch(
				modifyChannel({
					channelId: message.channelId,
					newChannel: { ...channel, lastMessage: message.id }
				})
			);

			if (!client.sentMessagesIds.includes(message.nonce)) {
				dispatch(
					addMessage({
						channelId: message.channelId,
						message: normalizeMessage(message)
					})
				);
			}
		}

		socket?.on('connect', onConnect);
		socket?.on('disconnect', onDisconnect);
		socket?.on('ready', onReady);
		socket?.on('messageCreate', onMessageCreate);

		return () => {
			console.log('Disconnecting...');

			socket?.off('connect', onConnect);
			socket?.off('disconnect', onDisconnect);
			socket?.off('ready', onReady);
			socket?.off('messageCreate', onMessageCreate);
			socket?.disconnect();
		};
	}, []);

	return children;
}
