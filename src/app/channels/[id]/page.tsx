'use client';

import ChannelScreen from '@/components/screens/ChannelScreen';
import MainSidebar from '@/components/layout/MainSidebar';
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
			<MainSidebar selectedChannelID={id} />
			<ChannelScreen />
		</Flex>
	);
}
