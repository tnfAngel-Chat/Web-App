'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../layout/UsersSidebar';
import useThemeColors from '@/hooks/useThemeColors';
import Channel from '../channel/Channel';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import MainTopBar from '../layout/MainTopBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import InputBox from '../channel/InputBox';
import ChannelTopBarContent from '../channel/ChannelTopBarContent';

export function ChannelLoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Center
			h="100%"
			w="100%"
			bg={getColorValue('primaryBackground')}
		></Center>
	);
}

export default function ChannelScreen() {
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

		return <ChannelLoadingScreen />;
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
				<MainTopBar>
					<ChannelTopBarContent channel={channel} />
				</MainTopBar>
				<Box h="100%" maxW="100%" overflowX="auto">
					<Channel channel={channel} />
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
