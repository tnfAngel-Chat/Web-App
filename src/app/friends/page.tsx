'use client';

import FriendsScreen from '@/components/screens/FriendsScreen';
import MainSidebar from '@/components/layout/MainSidebar';
import { Flex } from '@chakra-ui/react';
import GuildsBar from '@/components/layout/GuildsBar';

export default function FriendsPage() {
	return (
		<Flex h="100%" w="100%">
			<FriendsScreen />
		</Flex>
	);
}
