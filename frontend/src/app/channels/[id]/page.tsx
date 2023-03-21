'use client';

import ChatScreen from '@/components/screens/ChatScreen';
import MainSidebar from '@/components/sidebars/MainSidebar';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSelectedChannel } from '@/store/slices/directChannelsSlice';

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
			<ChatScreen />
		</Flex>
	);
}
