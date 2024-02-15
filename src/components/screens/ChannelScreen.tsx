'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../layout/UsersSidebar';
import useThemeColors from '@/hooks/useThemeColors';
import Channel from '../channel/Channel';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import MainTopBar from '../layout/MainTopBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import InputArea from '../channel/InputArea';
import ChannelTopBarContent from '../channel/ChannelTopBarContent';
import { useRef } from 'react';
import GuildsBar from '../layout/GuildsBar';
import MainSidebar from '../layout/MainSidebar';

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
	const userSidebarRef = useRef<any>();
	const channelFlexRef = useRef<any>();
	const channelRef = useRef<any>();
	const router = useRouter();

	const channelsState = useSelector((state: RootState) => state.channels);
	const selectedState = useSelector((state: RootState) => state.selections);

	const collapsiblesState = useSelector(
		(state: RootState) => state.collapsibles
	);

	const channels = channelsState.channels;

	const channel = channels.find(
		(channel) => channel.id === selectedState.selectedDirectChannel
	);

	if (!channel) {
		router.prefetch('/friends');
		router.push('/friends');

		console.log('Going to friends...');

		return <ChannelLoadingScreen />;
	}

	return (
		<Flex h="100%" w="100%" ref={channelFlexRef} gap={0}>
			<GuildsBar />
			<MainSidebar selectedChannelId={channel.id} />
			<Stack
				bg={getColorValue('primaryBackground')}
				ref={channelRef}
				scrollSnapAlign="center"
				scrollSnapStop="always"
				h="100%"
				spacing="10px"
				w="100%"
			>
				<MainTopBar>
					<ChannelTopBarContent
						channel={channel}
						channelFlexRef={channelFlexRef}
						userSidebarRef={userSidebarRef}
						channelRef={channelRef}
					/>
				</MainTopBar>
				<Box h="100%" maxW="100%" overflowX="auto">
					<Channel channel={channel} />
				</Box>
				<InputArea channel={channel} />
			</Stack>
			{channel.type === ChannelTypes.Group &&
				collapsiblesState.showChannelMembers && (
					<UsersSidebar
						users={channel.recipients}
						userSidebarRef={userSidebarRef}
					/>
				)}
		</Flex>
	);
}
