'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../sidebars/UsersSidebar';
import useColorValue from '@/hooks/useColorValue';
import MessagesBox from '../chat/MessagesBox';
import { Box, Flex } from '@chakra-ui/react';
import UserTopBar from '../chat/UserTopBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ChatScreen() {
	const { getColorValue } = useColorValue();
	const router = useRouter();

	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);

	const chatsState = useSelector((state: RootState) => state.chats);

	const channels = directChannelsState.channels;

	const channel = channels.find(
		(channel) => channel.id === directChannelsState.selectedChannelId
	);

	if (!directChannelsState.selectedChannelId || !channel) {
		router.prefetch('/home');
		router.push('/home');

		return <></>;
	}

	const messages = chatsState.chats[channel.id] ?? [];

	return (
		<Flex
			flexDirection="column"
			h="100%"
			w="100%"
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
