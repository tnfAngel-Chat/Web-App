'use client';

import MainSidebar from '@/components/sidebars/MainSidebar';
import HomeScreen from '@/components/screens/HomeScreen';
import { Flex } from '@chakra-ui/react';

export default function HomePage() {
	return (
		<Flex>
			<MainSidebar selectedChannelID="home" />
			<HomeScreen />
		</Flex>
	);
}
