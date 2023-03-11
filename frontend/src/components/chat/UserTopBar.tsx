'use client';

import { IDirectMessageChannel } from '@/types/interfaces/Channel';
import {
	Box,
	Center,
	Flex,
	Icon,
	IconButton,
	Spacer,
	Text,
} from '@chakra-ui/react';
import {
	MdAlternateEmail,
	MdPhone,
	MdSearch,
	MdVideocam,
} from 'react-icons/md';

export type UserTopBarProps = {
	channel: IDirectMessageChannel;
};
export default function UserTopBar({ channel }: UserTopBarProps) {
	return (
		<Box w="100%" padding="5px 20px 5px 20px">
			<Flex>
				<Flex gap="10px">
					<Center>
						<Icon as={MdAlternateEmail} boxSize="24px" />
					</Center>
					<Center>
						<Text>{channel.recipient.username}</Text>
					</Center>
				</Flex>
				<Spacer />
				<Flex gap="24px">
					<Center>
						<IconButton
							aria-label="Start Call"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdPhone />}
						/>
					</Center>
					<Center>
						<IconButton
							aria-label="Start Video Call"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdVideocam />}
						/>
					</Center>
					<Center>
						<IconButton
							aria-label="Search Messages"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdSearch />}
						/>
					</Center>
				</Flex>
			</Flex>
		</Box>
	);
}
