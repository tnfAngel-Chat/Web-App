'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IRawChannel } from '@/types/interfaces/Channel';
import { IRawUser, IUser } from '@/types/interfaces/User';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import InputBox from '../chat/InputBox';
import MessagesBox from '../chat/MessagesBox';
import UserTopBar from '../chat/UserTopBar';
import { IRawMessage } from '@/types/interfaces/Message';
import normalizeUser from '@/util/normalizeUser';
import normalizeChannel from '@/util/normalizeChannel';
import useColorValue from '@/hooks/useColorValue';
import normalizeMessage from '@/util/normalizeMessage';
import UsersSidebar from '../sidebars/UsersSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatScreen() {
	const { getColorValue } = useColorValue();
	const router = useRouter();

	const rawAuthor: IRawUser = {
		type: UserTypes.User,
		id: '1',
		username: 'Lauty',
		avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
		status: UserStatusTypes.Online,
	};

	const author: IUser = normalizeUser(rawAuthor);

	const chats: Record<string, IRawMessage[]> = {
		'22': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		],
		'11': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		],
		'44': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba mensaje de abajo',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		],
		'55': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		],
	};

	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);
	const channels = directChannelsState.channels;

	const channel = channels.find(
		(channel) => channel.id === directChannelsState.selectedChannelId
	);

	if (!directChannelsState.selectedChannelId || !channel) {
		router.prefetch('/home');
		router.push('/home');
		return <></>;
	}

	const rawMessages = chats[channel.id] ?? [];

	const messages = rawMessages.map(normalizeMessage);

	return (
		<Flex
			flexDirection="column"
			h="100vh"
			w="100%"
			minW="700px"
			gap={0}
			bg={getColorValue('primaryContentBackground')}
		>
			<Box h="44px" bg={getColorValue('secondaryContentBackground')}>
				<UserTopBar channel={channel} />
			</Box>
			<Flex h="100%" w="100%" overflow="hidden" flex="1">
				<MessagesBox channel={channel} messages={messages} />
				{channel.type === ChannelTypes.Group && (
					<UsersSidebar users={channel.members} />
				)}
			</Flex>
		</Flex>
	);
}
