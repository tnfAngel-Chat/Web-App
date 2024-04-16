'use client';

import { client } from '@/client';
import useThemeColors from '@/hooks/useThemeColors';
import { type RootState } from '@/store';
import { removeChannel } from '@/store/slices/channelsSlice';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { Channel, DirectBasedChannel } from '@/types/interfaces/Channel';
import { type As, Box, Center, CloseButton, Flex, Icon, IconButton, Spacer, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdAdd, MdPeople } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import OverflownText from '../misc/OverflownText';
import CreateGroup from '../popovers/CreateGroup';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';
import ProfileBox from './ProfileBox';
import Separator from './Separator';

export function DirectButtonLink({
	icon,
	label,
	href,
	isSelected
}: Readonly<{
	icon: As;
	label: string;
	href: string;
	isSelected: boolean;
}>) {
	const { getColorValue } = useThemeColors();

	return (
		<Link href={href}>
			<Flex
				w='100%'
				h='100%'
				minH='50px'
				borderRadius='5px'
				bg={isSelected ? getColorValue('sidebarButtonActive') : 'transparent'}
				_hover={{
					bg: isSelected ? getColorValue('sidebarButtonActive') : getColorValue('sidebarButtonHover')
				}}
				padding='5px 10px 5px 10px'
			>
				<Flex flex='1' gap='3' alignItems='center' flexWrap='wrap'>
					<Box w='32px'>
						<Center>
							<Icon as={icon} boxSize='24px' />
						</Center>
					</Box>
					<Box>
						<Text className={isSelected ? 'text-bold' : ''} fontSize='md'>
							{label}
						</Text>
					</Box>
				</Flex>
			</Flex>
		</Link>
	);
}

export type DirectChannelLinkProps = {
	channel: Channel;
	isSelected: boolean;
};

export function DirectChannelLink({ channel, isSelected }: Readonly<DirectChannelLinkProps>) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const [isHovering, setIsHovering] = useState(false);
	const recipient = client.users.resolve(channel.type === ChannelTypes.DirectMessage ? channel.recipient : '');

	return (
		<Link href={`/channels/${channel.id}`}>
			<Flex
				borderRadius='5px'
				bg={isSelected ? getColorValue('sidebarButtonActive') : 'transparent'}
				_hover={{
					bg: isSelected ? getColorValue('sidebarButtonActive') : getColorValue('sidebarButtonHover')
				}}
				padding='5px 10px 5px 10px'
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				gap='1px'
			>
				<Flex h='100%' minH='45px' gap='10px' alignItems='center' minW='0px'>
					<Center h='100%'>
						<Avatar
							size='36'
							src={channel.type === ChannelTypes.DirectMessage ? recipient.avatar : channel.icon}
							alt='Avatar'
							indicator={
								channel.type === ChannelTypes.DirectMessage ? (
									<StatusIndicator status={recipient.status} size='14' />
								) : null
							}
						/>
					</Center>
					<Flex minW='0px' alignItems='start' direction='column'>
						<Box w='100%'>
							<OverflownText
								fontSize='md'
								tooltipPlacement='top'
								className={isSelected ? 'text-bold' : ''}
							>
								{channel.type === ChannelTypes.DirectMessage ? recipient.username : channel.name}
							</OverflownText>
						</Box>

						{channel.type === ChannelTypes.DirectMessage ? (
							recipient.presence ? (
								<Text fontSize='sm' noOfLines={1}>
									{recipient.presence}
								</Text>
							) : null
						) : channel.type === ChannelTypes.Group ? (
							<Text fontSize='sm'>{channel.recipients.length} Members</Text>
						) : null}
					</Flex>
				</Flex>
				{isHovering ? (
					<>
						<Spacer />
						<Center>
							<CloseButton
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();

									dispatch(removeChannel(channel.id));
								}}
							/>
						</Center>
					</>
				) : null}
			</Flex>
		</Link>
	);
}

export type MainSidebarContentProps = {
	selectedChannelId?: string;
};

export function MainSidebarContent({ selectedChannelId }: Readonly<MainSidebarContentProps>) {
	const channelsState = useSelector((state: RootState) => state.channels);

	const channels = channelsState.channels.filter(
		(channel): channel is DirectBasedChannel =>
			channel.type === ChannelTypes.DirectMessage || channel.type === ChannelTypes.Group
	);

	return (
		<Stack w='100%' h='100%'>
			<DirectButtonLink
				icon={MdPeople}
				label='Friends'
				href='/friends'
				isSelected={selectedChannelId === 'friends'}
			/>
			<Flex gap='3px'>
				<Center w='100%'>
					<Separator />
				</Center>
				<Center>
					<CreateGroup>
						<IconButton
							aria-label='Create DM Group'
							bg='transparent'
							size='xs'
							fontSize='15px'
							icon={<MdAdd />}
						/>
					</CreateGroup>
				</Center>
			</Flex>
			{[...channels]
				.sort((a, b) => parseInt(b.lastMessage ?? '0') - parseInt(a.lastMessage ?? '0'))
				.map((channel) => {
					return (
						<DirectChannelLink
							channel={channel}
							key={channel.id}
							isSelected={selectedChannelId === channel.id}
						/>
					);
				})}
		</Stack>
	);
}

export default function MainSidebar({
	selectedChannelId
}: Readonly<{
	selectedChannelId?: string;
}>) {
	const { getColorValue } = useThemeColors();

	return (
		<Stack h='100%' minW='250px' maxW='250px' spacing='0px'>
			<Box h='100%' w='100%' bg={getColorValue('sidebarBackground')} overflow='auto' padding='10px'>
				<MainSidebarContent selectedChannelId={selectedChannelId} />
			</Box>
			<Box minH='75px' bg={getColorValue('ternaryBackground')}>
				<ProfileBox />
			</Box>
		</Stack>
	);
}
