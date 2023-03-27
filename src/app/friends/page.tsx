'use client';

import FriendsScreen from '@/components/screens/FriendsScreen';
import MainSidebar from '@/components/sidebars/MainSidebar';
import { Flex } from '@chakra-ui/react';

export default function FriendsPage() {	
	return (
		<Flex h="100%" w="100%">
			<MainSidebar selectedChannelID="friends" />
			<FriendsScreen />
		</Flex>
	);
}
