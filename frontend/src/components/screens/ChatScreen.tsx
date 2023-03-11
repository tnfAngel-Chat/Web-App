'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IDirectMessageChannel } from '@/types/interfaces/Channel';
import { IUser } from '@/types/interfaces/User';
import { useColorMode, Box, Stack } from '@chakra-ui/react';
import InputBox from '../chat/InputBox';
import MessagesBox from '../chat/MessagesBox';
import UserTopBar from '../chat/UserTopBar';

export default function ChatScreen({ chatID }: { chatID: string }) {
	const { colorMode } = useColorMode();

	const users: IUser[] = [
		{
			type: UserTypes.User,
			id: '1',
			username: 'Ángel',
			status: UserStatusTypes.Online,
			avatarId: '3132',
		},
		{
			type: UserTypes.User,
			id: '3',
			username: 'Juan',
			status: UserStatusTypes.DoNotDisturb,
			avatarId:
				'https://cdn.discordapp.com/attachments/1012394358504431707/1081922878389370940/random-shot-goose-head-yellow-beak-farm-209772525.jpg',
		},
		{
			type: UserTypes.User,
			id: '2',
			username: 'Lauty',
			status: UserStatusTypes.Idle,
			avatarId:
				'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
		},
		{
			type: UserTypes.User,
			username: 'Julian',
			id: '2',
			status: UserStatusTypes.Offline,
			avatarId:
				'https://cdn.discordapp.com/attachments/1012394358504431707/1081923094916120637/6201803e9abd9.jpeg',
		},
	];

	const channels: IDirectMessageChannel[] = [
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
	];

	const channel = channels.find((channel) => channel.id === chatID)!;

	return (
		<Stack
			h="100vh"
			w="100%"
			minW="400px"
			bg={`${colorMode}.primary.primaryContentBackground`}
		>
			<Box
				h="44px"
				bg={`${colorMode}.primary.secondaryContentBackground`}
			>
				<UserTopBar channel={channel} />
			</Box>
			<Box
				overflow="auto"
				display="flex"
				flexDirection="column-reverse"
				h="100%"
			>
				<MessagesBox channel={channel} />
			</Box>
			<Box
				minH="75px"
				bg={`${colorMode}.primary.secondaryContentBackground`}
			>
				<InputBox channel={channel} />
			</Box>
		</Stack>
	);
}
