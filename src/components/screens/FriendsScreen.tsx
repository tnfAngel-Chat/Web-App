'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import Friends from '../friends/Friends';
import FriendsTopBarContent from '../friends/FriendsTopBarContent';
import GuildsBar from '../layout/GuildsBar';
import MainSidebar from '../layout/MainSidebar';
import MainTopBar from '../layout/MainTopBar';

export default function FriendsScreen() {
	const { getColorValue } = useThemeColors();
	const friendsFlexRef = useRef<any>();
	const friendsRef = useRef<any>();

	return (
		<Flex h='100%' w='100%' ref={friendsFlexRef} gap={0}>
			<GuildsBar />
			<MainSidebar selectedChannelId='friends' />
			<Stack
				ref={friendsRef}
				bg={getColorValue('primaryBackground')}
				scrollSnapAlign='center'
				scrollSnapStop='always'
				h='100%'
				spacing='10px'
				w='100%'
			>
				<MainTopBar>
					<FriendsTopBarContent friendsFlexRef={friendsFlexRef} friendsRef={friendsRef} />
				</MainTopBar>
				<Box h='100%' maxW='100%' overflowX='auto'>
					<Friends />
				</Box>
			</Stack>
		</Flex>
	);
}
