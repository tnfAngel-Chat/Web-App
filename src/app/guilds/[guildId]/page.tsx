'use client';

import GuildScreen from '@/components/screens/GuildScreen';
import {
	setActivePage,
	setSelectedChannel,
	setSelectedGuild,
} from '@/store/slices/selectionsSlice';
import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SelectedGuildPage({
	params,
}: {
	params: { guildId: string };
}) {
	const { guildId } = params;

	const dispatch = useDispatch();

	dispatch(setActivePage('guild'));
	dispatch(setSelectedGuild({ guildId }));

	console.log('setting cum');

	return (
		<Flex h="100%" w="100%">
			<GuildScreen />
		</Flex>
	);
}
