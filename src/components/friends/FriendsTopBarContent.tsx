'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Center, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { MdAdd, MdPeople, MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import OverflownText from '../misc/OverflownText';
import StatusIndicator from '../user/StatusIndicator';

export default function FriendsTopBarContent() {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	return (
		<>
			<Flex gap="8px" h="100%" minW="30px" maxH="100%">
				<Center>
					<Icon as={MdPeople} boxSize="24px" />
				</Center>
				<Center minW="0px">
					<OverflownText fontSize="lg">Friends</OverflownText>
				</Center>
				<Center minW="0px">
					<OverflownText
						fontSize="sm"
						color={getColorValue('textMutedColor')}
					>
						20
					</OverflownText>
				</Center>
			</Flex>
			<Spacer />
			<Flex gap="24px">
				<Center>
					<IconButton
						aria-label="Search Friend"
						bg="transparent"
						size="sm"
						fontSize="24px"
						icon={<MdSearch />}
					/>
				</Center>
				<Center>
					<IconButton
						aria-label="Add Friend"
						bg="transparent"
						size="sm"
						fontSize="24px"
						icon={<MdAdd />}
					/>
				</Center>
			</Flex>
		</>
	);
}
