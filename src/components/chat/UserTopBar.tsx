'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { toggleChannelMembers } from '@/store/slices/collapsiblesSlice';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IChannel } from '@/types/interfaces/Channel';
import {
	Box,
	Center,
	Flex,
	Icon,
	IconButton,
	Spacer,
} from '@chakra-ui/react';
import {
	MdAlternateEmail,
	MdPeople,
	MdPhone,
	MdSearch,
	MdVideocam,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import OverflownText from '../general/OverflownText';
import StatusIndicator from '../user/StatusIndicator';

export type UserTopBarProps = {
	channel: IChannel;
};

export default function UserTopBar({ channel }: UserTopBarProps) {
	const dispatch = useDispatch()
	const { getColorValue } = useThemeColors();

	return (
		<Box
			h="44px"
			bg={getColorValue('secondaryBackground')}
			w="100%"
			padding="5px 20px 5px 20px"
		>
			<Flex h="100%" maxH="100%" alignItems="center">
				<Flex gap="8px" h="100%" minW="30px" maxH="100%">
					<Center>
						<Icon as={MdAlternateEmail} boxSize="24px" />
					</Center>
					<Center minW="0px">
						<OverflownText fontSize="lg">
							{channel.type === ChannelTypes.DirectMessage
								? channel.recipient.username
								: channel.name}
						</OverflownText>
					</Center>
					{channel.type === ChannelTypes.DirectMessage ? (
						<Center>
							<StatusIndicator
								status={channel.recipient.status}
								size="13"
								positioned={false}
							/>
						</Center>
					) : null}
					{channel.type === ChannelTypes.DirectMessage &&
					channel.recipient.presence ? (
						<Center minW="0px">
							<OverflownText
								fontSize="sm"
								color={getColorValue('textMutedColor')}
							>
								{channel.recipient.presence}
							</OverflownText>
						</Center>
					) : null}
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
					{channel.type === ChannelTypes.Group ? (
						<Center>
							<IconButton
								aria-label="Toggle Members"
								bg="transparent"
								size="sm"
								fontSize="24px"
								onClick={() => dispatch(toggleChannelMembers())}
								icon={<MdPeople />}
							/>
						</Center>
					) : null}
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
