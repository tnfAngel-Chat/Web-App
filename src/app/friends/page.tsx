'use client';

import { client } from '@/client';
import FriendsScreen from '@/components/screens/FriendsScreen';
import MainSidebar from '@/components/sidebars/MainSidebar';
import { Flex } from '@chakra-ui/react';

export default function FriendsPage() {
	console.log(client.config);
	console.log('ola');
	
	return (
		<Flex h="100%" w="100%">
			<MainSidebar selectedChannelID="friends" />
			<FriendsScreen />
		</Flex>
	);
}
