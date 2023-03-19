'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IRawChannel } from '@/types/interfaces/Channel';
import { IRawUser, IUser } from '@/types/interfaces/User';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { useColorMode, Box, Stack } from '@chakra-ui/react';
import InputBox from '../chat/InputBox';
import MessagesBox from '../chat/MessagesBox';
import UserTopBar from '../chat/UserTopBar';
import { IMessage, IRawMessage } from '@/types/interfaces/Message';
import normalizeUser from '@/util/normalizeUser';
import normalizeChannel from '@/util/normalizeChannel';
import useColorValue from '@/hooks/useColorValue';
import normalizeMessage from '@/util/normalizeMessage';

export default function ChatScreen({ chatID }: { chatID: string }) {
	const { getColorValue } = useColorValue();

	const author: IUser = normalizeUser({
		type: UserTypes.User,
		id: '1',
		username: 'Lauty',
		avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
		status: UserStatusTypes.Online,
	});

	const users: IRawUser[] = [
		{
			type: UserTypes.User,
			id: '1',
			username: 'Ángel',
			status: UserStatusTypes.Online,
		},
		{
			type: UserTypes.User,
			id: '3',
			username: 'Juan',
			status: UserStatusTypes.DoNotDisturb,
			avatar: 'https://cdn.discordapp.com/attachments/1012394358504431707/1081922878389370940/random-shot-goose-head-yellow-beak-farm-209772525.jpg',
		},
		{
			type: UserTypes.User,
			id: '2',
			username: 'Lauty',
			status: UserStatusTypes.Idle,
			avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
			presence: 'TKM',
		},
		{
			type: UserTypes.User,
			username: 'Julio',
			id: '4',
			status: UserStatusTypes.Offline,
			avatar: 'https://cdn.discordapp.com/attachments/1012394358504431707/1081923094916120637/6201803e9abd9.jpeg',
		},
		{
			type: UserTypes.User,
			username: 'el pepe',
			id: '5',
			status: UserStatusTypes.Online,
		},
	];

	const rawChannels: IRawChannel[] = [
		{
			type: ChannelTypes.DirectMessage,
			id: '22',
			recipient: users[1],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '11',
			recipient: users[2],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '33',
			recipient: users[3],
		},
		{
			type: ChannelTypes.Group,
			id: '44',
			icon: 'https://discord.com/assets/f90fca70610c4898bc57b58bce92f587.png',
			name: 'uwu',
			members: [users[1], users[2]],
		},
		{
			type: ChannelTypes.Group,
			id: '55',
			members: [users[1], users[3], users[2]],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '60',
			recipient: users[4],
		},
	];

	const channels = rawChannels.map(normalizeChannel);

	const channel = channels.find((channel) => channel.id === chatID)!;

	const chats: Record<string, IRawMessage[]> = {
		'22': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
		],
		'11': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
		],
		'44': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
		],
	};

	const rawMessages = chats[channel.id] ?? [];

	const messages = rawMessages.map(normalizeMessage);

	return (
		<Stack
			h="100vh"
			w="100%"
			minW="400px"
			bg={getColorValue('primaryContentBackground')}
		>
			<Box h="44px" bg={getColorValue('secondaryContentBackground')}>
				<UserTopBar channel={channel} />
			</Box>
			<Box
				overflow="auto"
				display="flex"
				flexDirection="column-reverse"
				h="100%"
			>
				<MessagesBox channel={channel} messages={messages} />
			</Box>
			<Box minH="75px" bg={getColorValue('secondaryContentBackground')}>
				<InputBox channel={channel} />
			</Box>
		</Stack>
	);
}
