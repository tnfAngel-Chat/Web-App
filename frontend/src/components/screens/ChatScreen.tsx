'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../sidebars/UsersSidebar';
import useThemeColors from '@/hooks/useThemeColors';
import MessagesBox from '../chat/MessagesBox';
import { Box, Flex, Stack } from '@chakra-ui/react';
import UserTopBar from '../chat/UserTopBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import InputBox from '../chat/InputBox';

export default function ChatScreen() {
	const { getColorValue } = useThemeColors();
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
			h="100%"
			w="100%"
			gap={0}
			bg={getColorValue('primaryContentBackground')}
		>
			<Flex
				scrollSnapAlign="center"
				scrollSnapStop="always"
				h="100%"
				gap="10px"
				w="100%"
				direction="column"
			>
				<UserTopBar channel={channel} />
				<MessagesBox channel={channel} messages={messages} />
				<InputBox channel={channel} />
			</Flex>
			{channel.type === ChannelTypes.Group && (
				<UsersSidebar users={channel.members} />
			)}
		</Flex>
	);
}
