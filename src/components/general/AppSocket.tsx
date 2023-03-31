import { client } from '@/client';
import useTheme from '@/hooks/useTheme';
import useThemeColors from '@/hooks/useThemeColors';
import { RootState } from '@/store';
import { addMessage } from '@/store/slices/chatsSlice';
import { setChannels } from '@/store/slices/directChannelsSlice';
import { IRawChannel } from '@/types/interfaces/Channel';
import { IRawMessage } from '@/types/interfaces/Message';
import { IRawUser } from '@/types/interfaces/User';
import normalizeChannel from '@/util/normalizeChannel';
import normalizeMessage from '@/util/normalizeMessage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IUserPreferences {
	theme: string;
}

export default function AppSocket({ children, onConnectionReady }: any) {
	const [theme, setTheme] = useTheme();
	const [isConnected, setIsConnected] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const socket = client.socket.connect();

		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
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
			client.populate({
				users,
				channels,
			});

			dispatch(
				setChannels(
					channels.map((channel) => normalizeChannel(channel))
				)
			);

			setTheme(preferences.theme);
			onConnectionReady();
		}

		function onMessageCreate(message: IRawMessage) {
			if (!client.sentMessagesIds.includes(message.nonce)) {
				dispatch(
					addMessage({
						channelId: message.channelId,
						message: normalizeMessage(message),
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
