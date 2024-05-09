'use client';

import { client } from '@/client';
import useDevice from '@/hooks/useDevice';
import useThemeColors from '@/hooks/useThemeColors';
import { toggleChannelMembers } from '@/store/slices/collapsiblesSlice';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { Channel } from '@/types/interfaces/Channel';
import { Flex, Icon, IconButton, Spacer, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAlternateEmail, MdMenu, MdNumbers, MdPeople, MdPhone, MdSearch, MdVideocam } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import OverflownText from '../misc/OverflownText';
import UserProfileModal from '../modals/UserProfileModal';
import StatusIndicator from '../user/StatusIndicator';

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
	channelRef
}: Readonly<UserTopBarProps>) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const recipient = client.users.resolve(channel.type === ChannelTypes.DirectMessage ? channel.recipient : '');
	const { isMobile } = useDevice();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [mobileShowUsers, setMobileShowUsers] = useState(true);
	const [mobileShowSidebar, setMobileShowSidebar] = useState(true);

	return (
		<>
			<Flex gap='8px' h='100%' minW='30px' maxH='100%' alignItems='center'>
				{isMobile && (
					<IconButton
						aria-label='Show menu'
						bg='transparent'
						size='sm'
						fontSize='24px'
						icon={<MdMenu />}
						onClick={() => {
							if (mobileShowSidebar) {
								channelFlexRef.current?.scrollIntoView({
									behavior: 'smooth'
								});
								setMobileShowSidebar(false);
							} else {
								channelRef.current?.scrollIntoView({
									behavior: 'smooth'
								});
								setMobileShowSidebar(true);
							}
						}}
					/>
				)}
				<Flex gap={['3px', '5px', '10px']} alignItems='center' minW='0px'>
					<Icon
						color={getColorValue('textMutedColor')}
						as={
							channel.type === ChannelTypes.Text
								? MdNumbers
								: channel.type === ChannelTypes.Group
									? MdPeople
									: MdAlternateEmail
						}
						boxSize='24px'
					/>
					<OverflownText
						fontSize='lg'
						fontWeight='600'
						_hover={{
							cursor: channel.type === ChannelTypes.DirectMessage ? 'pointer' : undefined
						}}
						onClick={channel.type === ChannelTypes.DirectMessage ? onOpen : undefined}
					>
						{channel.type === ChannelTypes.DirectMessage ? recipient.username : channel.name}
					</OverflownText>
				</Flex>
				{channel.type === ChannelTypes.DirectMessage && (
					<UserProfileModal isOpen={isOpen} onClose={onClose} user={recipient} />
				)}
				{channel.type === ChannelTypes.DirectMessage && (
					<>
						<StatusIndicator status={recipient.status} size='13' positioned={false} />
						{recipient.presence && (
							<OverflownText fontSize='sm' color={getColorValue('textMutedColor')}>
								{recipient.presence}
							</OverflownText>
						)}
					</>
				)}
			</Flex>
			<Spacer />
			<Flex gap={['5px', '10px', '24px']}>
				{(channel.type === ChannelTypes.DirectMessage || channel.type === ChannelTypes.Group) && (
					<>
						<IconButton
							aria-label='Start Call'
							bg='transparent'
							size='sm'
							fontSize='24px'
							icon={<MdPhone />}
						/>
						<IconButton
							aria-label='Start Video Call'
							bg='transparent'
							size='sm'
							fontSize='24px'
							icon={<MdVideocam />}
						/>
					</>
				)}
				{(channel.type === ChannelTypes.Group || channel.type === ChannelTypes.Text) && (
					<IconButton
						aria-label='Toggle Members'
						bg='transparent'
						size='sm'
						fontSize='24px'
						onClick={() => {
							if (!isMobile) {
								dispatch(toggleChannelMembers());
							} else {
								if (mobileShowUsers) {
									userSidebarRef.current?.scrollIntoView({
										behavior: 'smooth'
									});
									setMobileShowUsers(false);
								} else {
									channelRef.current?.scrollIntoView({
										behavior: 'smooth'
									});
									setMobileShowUsers(true);
								}
							}
						}}
						icon={<MdPeople />}
					/>
				)}
				<IconButton
					aria-label='Search Messages'
					bg='transparent'
					size='sm'
					fontSize='24px'
					icon={<MdSearch />}
				/>
			</Flex>
		</>
	);
}
