'use client';

import ChannelScreen from '@/components/screens/ChannelScreen';
import { setActivePage, setSelectedChannel } from '@/store/slices/selectionsSlice';
import { useDispatch } from 'react-redux';

export default function SelectedChannelPage({
	params
}: Readonly<{
	params: { channelId: string };
}>) {
	const { channelId } = params;

	const dispatch = useDispatch();

	dispatch(setSelectedChannel({ channelId }));
	dispatch(setActivePage('direct'));

	return <ChannelScreen />;
}
