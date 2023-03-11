'use client';

import FriendsScreen from '@/components/screens/FriendsScreen';
import MainSidebar from '@/components/partials/MainSidebar';
import { Flex } from '@chakra-ui/react';

export default function FriendsPage() {
	return (
		<Flex>
			<MainSidebar selectedChannelID="friends" />
			<FriendsScreen />
		</Flex>
	);
}
