'use client';

import ChatScreen from '@/components/screens/ChatScreen';
import MainSidebar from '@/components/partials/MainSidebar';
import { Flex } from '@chakra-ui/react';

export default function SelectedChannelPage({ params }: any) {
	const { id } = params;

	return (
		<Flex h="100%">
			<MainSidebar selectedChannelID={id} />
			<ChatScreen chatID={id} />
		</Flex>
	);
}
