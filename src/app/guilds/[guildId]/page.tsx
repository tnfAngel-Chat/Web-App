'use client';

import GuildScreen from '@/components/screens/GuildScreen';
import { setActivePage, setSelectedGuild } from '@/store/slices/selectionsSlice';
import { useDispatch } from 'react-redux';

export default function SelectedGuildPage({
	params
}: Readonly<{
	params: { guildId: string };
}>) {
	const { guildId } = params;

	const dispatch = useDispatch();

	dispatch(setActivePage('guild'));
	dispatch(setSelectedGuild({ guildId }));

	return <GuildScreen />;
}
