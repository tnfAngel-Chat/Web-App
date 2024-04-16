'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { type RootState } from '@/store';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import normalizeUser from '@/util/normalizeUser';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Channel from '../channel/Channel';
import ChannelTopBarContent from '../channel/ChannelTopBarContent';
import InputArea from '../channel/InputArea';
import GuildSidebar from '../layout/GuildSidebar';
import GuildsBar from '../layout/GuildsBar';
import MainTopBar from '../layout/MainTopBar';
import UsersSidebar from '../layout/UsersSidebar';

export function ChannelLoadingScreen({ guild }: any) {
	const { getColorValue } = useThemeColors();

	return (
		<Flex>
			<GuildsBar />
			{guild && <GuildSidebar guild={guild} />}
			<Center h='100%' w='100%' bg={getColorValue('primaryBackground')}></Center>
		</Flex>
	);
}

export default function GuildChannelScreen() {
	const router = useRouter();
	const { getColorValue } = useThemeColors();
	const userSidebarRef = useRef<any>();
	const channelFlexRef = useRef<any>();
	const channelRef = useRef<any>();
	const channelsState = useSelector((state: RootState) => state.channels);
	const selectedState = useSelector((state: RootState) => state.selections);
	const guildsState = useSelector((state: RootState) => state.guilds);

	const collapsiblesState = useSelector((state: RootState) => state.collapsibles);

	const channels = channelsState.channels;

	const guild = guildsState.guilds.find((guildState) => guildState.id === selectedState.selectedGuild);

	if (!guild) {
		router.prefetch('/friends');
		router.push('/friends');

		return <ChannelLoadingScreen guild={undefined} />;
	}

	console.log(selectedState);

	const channel = channels.find((channel) => channel.id === selectedState.guilds[guild.id]);

	if (!channel) {
		console.log('Sending to friends (no channel) GuildchannelScreen');

		router.prefetch(`/guilds/${guild.id}`);
		router.push(`/guilds/${guild.id}`);

		return <ChannelLoadingScreen guild={guild} />;
	}

	return (
		<Flex h='100%' w='100%' ref={channelFlexRef} gap={0}>
			<GuildsBar />
			<GuildSidebar guild={guild} />
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
			{channel.type === ChannelTypes.Text && collapsiblesState.showChannelMembers && (
				<UsersSidebar
					users={[
						{
							type: UserTypes.User,
							id: '1',
							username: 'Ángel',
							status: UserStatusTypes.Online,
							presence: 'Hola'
						},
						{
							type: UserTypes.User,
							id: '3',
							username: 'Juan',
							status: UserStatusTypes.DoNotDisturb,
							avatar: 'https://media.discordapp.net/attachments/770017179512471598/965703809366110268/makesweet-hn74h8.gif'
						}
					].map(normalizeUser)}
					userSidebarRef={userSidebarRef}
				/>
			)}
		</Flex>
	);
}
