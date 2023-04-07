'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import UsersSidebar from '../layout/UsersSidebar';
import useThemeColors from '@/hooks/useThemeColors';
import { Center, Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import GuildsBar from '../layout/GuildsBar';
import GuildSidebar from '../layout/GuildSidebar';
import { RootState } from '@/store';

import { useSelector } from 'react-redux';

export function ChannelLoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Center
			h="100%"
			w="100%"
			bg={getColorValue('primaryBackground')}
		></Center>
	);
}

export default function GuildScreen() {
	const router = useRouter();
	const { getColorValue } = useThemeColors();
	const channelFlexRef = useRef<any>();
	const channelRef = useRef<any>();
	const selectedState = useSelector((state: RootState) => state.selections);
	const guildsState = useSelector((state: RootState) => state.guilds);

	const guild = guildsState.guilds.find(
		(guildState) => guildState.id === selectedState.selectedGuild
	);

	if (!guild) {
				console.log('Sending to friends (no guild) GuildScren');

		router.prefetch('/friends');
		router.push('/friends');

		return <ChannelLoadingScreen />;
	}

	return (
		<Flex h="100%" w="100%" ref={channelFlexRef} gap={0}>
			<GuildsBar />
			<GuildSidebar guild={guild} />
			<Stack
				bg={getColorValue('primaryBackground')}
				ref={channelRef}
				scrollSnapAlign="center"
				scrollSnapStop="always"
				h="100%"
				spacing="10px"
				w="100%"
			>
				<Center w="100%" h="100%">
					Bienvenido a el servidor
				</Center>
			</Stack>
		</Flex>
	);
}
