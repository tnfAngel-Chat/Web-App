'use client';

import ChannelScreen from '@/components/screens/ChannelScreen';
import {
	setActivePage,
	setSelectedChannel,
} from '@/store/slices/selectionsSlice';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

export default function SelectedChannelPage({
	params,
}: {
	params: { channelId: string };
}) {
	const { channelId } = params;

	const dispatch = useDispatch();

	dispatch(setSelectedChannel({ channelId }));
	dispatch(setActivePage('direct'));

	return (
		<Flex h="100%" w="100%">
			<ChannelScreen />
		</Flex>
	);
}
