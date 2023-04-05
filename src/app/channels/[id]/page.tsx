'use client';

import ChannelScreen from '@/components/screens/ChannelScreen';
import MainSidebar from '@/components/layout/MainSidebar';
import GuildsBar from '@/components/layout/GuildsBar';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSelectedChannel } from '@/store/slices/channelsSlice';

export default function SelectedChannelPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const dispatch = useDispatch();

	dispatch(setSelectedChannel(id));

	return (
		<Flex h="100%" w="100%">
			<ChannelScreen />
		</Flex>
	);
}
