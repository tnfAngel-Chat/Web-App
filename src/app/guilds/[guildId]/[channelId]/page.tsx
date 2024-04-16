'use client';

import GuildChannelScreen from '@/components/screens/GuildChannelScreen';
import { setActivePage, setSelectedChannel, setSelectedGuild } from '@/store/slices/selectionsSlice';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

export default function SelectedGuildChannelPage({
	params
}: Readonly<{
	params: { guildId: string; channelId: string };
}>) {
	const { guildId, channelId } = params;

	const dispatch = useDispatch();

	dispatch(setSelectedChannel({ guildId, channelId }));
	dispatch(setSelectedGuild({ guildId }));
	dispatch(setActivePage('guild'));

	return (
		<Flex h='100%' w='100%'>
			<GuildChannelScreen />
		</Flex>
	);
}
