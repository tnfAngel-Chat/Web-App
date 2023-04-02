'use client';

import MainSidebar from '@/components/layout/MainSidebar';
import HomeScreen from '@/components/screens/HomeScreen';
import { Flex } from '@chakra-ui/react';

export default function HomePage() {
	return (
		<Flex h="100%" w="100%">
			<MainSidebar selectedChannelID="home" />
			<HomeScreen />
		</Flex>
	);
}
