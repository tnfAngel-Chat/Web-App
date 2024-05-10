'use client';

import useThemeColors from '@/hooks/useThemeColors';
import type { RootState } from '@/store';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Channel from '../channel/Channel';
import ChannelTopBarContent from '../channel/ChannelTopBarContent';
import InputArea from '../channel/InputArea';
import GuildsBar from '../layout/GuildsBar';
import MainSidebar from '../layout/MainSidebar';
import MainTopBar from '../layout/MainTopBar';
import UsersSidebar from '../layout/UsersSidebar';

export function ChannelLoadingScreen() {
	const { getColorValue } = useThemeColors();

	return <Center h='100%' w='100%' bg={getColorValue('primaryBackground')}></Center>;
}

export default function ChannelScreen() {
	const { getColorValue } = useThemeColors();
	const userSidebarRef = useRef<any>();
	const channelFlexRef = useRef<any>();
	const channelRef = useRef<any>();
	const router = useRouter();

	const channelsState = useSelector((state: RootState) => state.channels);
	const selectedState = useSelector((state: RootState) => state.selections);

	const collapsiblesState = useSelector((state: RootState) => state.collapsibles);

	const channels = channelsState.channels;

	const channel = channels.find((channel) => channel.id === selectedState.selectedDirectChannel);

	if (!channel) {
		router.prefetch('/friends');
		router.push('/friends');

		return <ChannelLoadingScreen />;
	}

	return (
		<Flex h='100%' w='100%' ref={channelFlexRef} gap={0}>
			<GuildsBar />
			<MainSidebar selectedChannelId={channel.id} />
			<Stack
				bg={getColorValue('primaryBackground')}
				ref={channelRef}
				scrollSnapAlign='center'
				scrollSnapStop='always'
				h='100%'
				spacing='10px'
				w='100%'
			>
				<MainTopBar>
					<ChannelTopBarContent
						channel={channel}
						channelFlexRef={channelFlexRef}
						userSidebarRef={userSidebarRef}
						channelRef={channelRef}
					/>
				</MainTopBar>
				<Box h='100%' maxW='100%' overflowX='auto'>
					<Channel channel={channel} />
				</Box>
				<InputArea channel={channel} />
			</Stack>
			{channel.type === ChannelTypes.Group && collapsiblesState.showChannelMembers && (
				<UsersSidebar users={channel.recipients} userSidebarRef={userSidebarRef} />
			)}
		</Flex>
	);
}
