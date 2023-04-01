'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../sidebars/UsersSidebar';
import useThemeColors from '@/hooks/useThemeColors';
import MessagesBox from '../chat/MessagesBox';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import UserTopBar from '../chat/UserTopBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import InputBox from '../chat/InputBox';

export function ChatLoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Center
			h="100%"
			w="100%"
			bg={getColorValue('primaryBackground')}
		></Center>
	);
}

export default function ChatScreen() {
	const { getColorValue } = useThemeColors();
	const router = useRouter();

	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);

	const collapsiblesState = useSelector(
		(state: RootState) => state.collapsibles
	);

	const channels = directChannelsState.channels;

	const channel = channels.find(
		(channel) => channel.id === directChannelsState.selectedChannelId
	);

	if (!directChannelsState.selectedChannelId || !channel) {
		router.prefetch('/home');
		router.push('/home');

		return <ChatLoadingScreen />;
	}

	return (
		<Flex h="100%" w="100%" gap={0}>
			<Stack
				bg={getColorValue('primaryBackground')}
				scrollSnapAlign="center"
				scrollSnapStop="always"
				h="100%"
				spacing="10px"
				w="100%"
			>
				<UserTopBar channel={channel} />
				<Box h="100%" maxW="100%" overflowX="auto">
					<MessagesBox channel={channel} />
				</Box>
				<InputBox channel={channel} />
			</Stack>
			{channel.type === ChannelTypes.Group &&
				collapsiblesState.showChannelMembers && (
					<UsersSidebar users={channel.members} />
				)}
		</Flex>
	);
}
