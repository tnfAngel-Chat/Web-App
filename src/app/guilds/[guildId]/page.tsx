'use client';

import GuildScreen from '@/components/screens/GuildScreen';
import { setActivePage, setSelectedGuild } from '@/store/slices/selectionsSlice';
import { Flex } from '@chakra-ui/react';
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

	return (
		<Flex h='100%' w='100%'>
			<GuildScreen />
		</Flex>
	);
}
