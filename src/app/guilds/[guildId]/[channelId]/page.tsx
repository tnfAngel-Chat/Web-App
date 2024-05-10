'use client';

import GuildChannelScreen from '@/components/screens/GuildChannelScreen';
import { setActivePage, setSelectedChannel, setSelectedGuild } from '@/store/slices/selectionsSlice';
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

	return <GuildChannelScreen />;
}
