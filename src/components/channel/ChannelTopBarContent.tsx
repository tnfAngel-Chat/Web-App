'use client';

import { client } from '@/client';
import useThemeColors from '@/hooks/useThemeColors';
import { toggleChannelMembers } from '@/store/slices/collapsiblesSlice';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { Channel } from '@/types/interfaces/Channel';
import {
	Center,
	Flex,
	Icon,
	IconButton,
	Spacer,
	useDisclosure,
} from '@chakra-ui/react';
import {
	MdAlternateEmail,
	MdMenu,
	MdNumbers,
	MdPeople,
	MdPhone,
	MdSearch,
	MdVideocam,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import OverflownText from '../misc/OverflownText';
import StatusIndicator from '../user/StatusIndicator';
import UserProfileModal from '../modals/UserProfileModal';
import { useState } from 'react';
import useDevice from '@/hooks/useDevice';

export type UserTopBarProps = {
	channel: Channel;
	userSidebarRef: any;
	channelFlexRef: any;
	channelRef: any;
};

export default function ChannelTopBarContent({
	channel,
	userSidebarRef,
	channelFlexRef,
	channelRef,
}: UserTopBarProps) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const recipient = client.users.resolve(
		channel.type === ChannelTypes.DirectMessage ? channel.recipient : ''
	);
	const { isMobile } = useDevice();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [mobileShowUsers, setMobileShowUsers] = useState(true);
	const [mobileShowSidebar, setMobileShowSidebar] = useState(true);

	return (
		<>
			<Flex gap="8px" h="100%" minW="30px" maxH="100%">
				{isMobile && (
					<Center>
						<IconButton
							aria-label="Show menu"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdMenu />}
							onClick={() => {
								if (mobileShowSidebar) {
									channelFlexRef.current?.scrollIntoView({
										behavior: 'smooth',
									});
									setMobileShowSidebar(false);
								} else {
									channelRef.current?.scrollIntoView({
										behavior: 'smooth',
									});
									setMobileShowSidebar(true);
								}
							}}
						/>
					</Center>
				)}
				<Center>
					<Icon
						color={getColorValue('textMutedColor')}
						as={
							channel.type === ChannelTypes.Text
								? MdNumbers
								: MdAlternateEmail
						}
						boxSize="24px"
					/>
				</Center>
				<Center minW="0px">
					{channel.type === ChannelTypes.DirectMessage ? (
						<UserProfileModal
							isOpen={isOpen}
							onClose={onClose}
							user={recipient}
						/>
					) : null}
					<OverflownText
						fontSize="lg"
						_hover={{
							cursor:
								channel.type === ChannelTypes.DirectMessage
									? 'pointer'
									: undefined,
						}}
						onClick={
							channel.type === ChannelTypes.DirectMessage
								? onOpen
								: undefined
						}
					>
						{channel.type === ChannelTypes.DirectMessage
							? recipient.username
							: channel.name}
					</OverflownText>
				</Center>
				{channel.type === ChannelTypes.DirectMessage ? (
					<Center>
						<StatusIndicator
							status={recipient.status}
							size="13"
							positioned={false}
						/>
					</Center>
				) : null}
				{channel.type === ChannelTypes.DirectMessage &&
				recipient.presence ? (
					<Center minW="0px">
						<OverflownText
							fontSize="sm"
							color={getColorValue('textMutedColor')}
						>
							{recipient.presence}
						</OverflownText>
					</Center>
				) : null}
			</Flex>
			<Spacer />
			<Flex gap="24px">
				{(channel.type === ChannelTypes.DirectMessage ||
					channel.type === ChannelTypes.Group) && (
					<>
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
					</>
				)}
				{channel.type === ChannelTypes.Group ||
				channel.type === ChannelTypes.Text ? (
					<Center>
						<IconButton
							aria-label="Toggle Members"
							bg="transparent"
							size="sm"
							fontSize="24px"
							onClick={() => {
								if (!isMobile) {
									dispatch(toggleChannelMembers());
								} else {
									if (mobileShowUsers) {
										userSidebarRef.current?.scrollIntoView({
											behavior: 'smooth',
										});
										setMobileShowUsers(false);
									} else {
										channelRef.current?.scrollIntoView({
											behavior: 'smooth',
										});
										setMobileShowUsers(true);
									}
								}
							}}
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
		</>
	);
}
