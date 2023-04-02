'use client';

import {
	Flex,
	Box,
	Stack,
	Text,
	Icon,
	As,
	Center,
	useDisclosure,
	CloseButton,
	Spacer,
	IconButton,
} from '@chakra-ui/react';
import { MdAdd, MdHome, MdPeople, MdSettings } from 'react-icons/md';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IChannel } from '@/types/interfaces/Channel';
import { RootState } from '@/store';
import { useState } from 'react';
import { removeChannel } from '@/store/slices/directChannelsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Avatar from '../user/Avatar';
import Separator from './Separator';
import SettingsModal from '../modals/SettingsModal';
import StatusIndicator from '../user/StatusIndicator';
import OverflownText from '../general/OverflownText';
import useThemeColors from '@/hooks/useThemeColors';
import styles from '../../styles/MainSidebar.module.scss';
import { client } from '@/client';
import CreateGroup from '../popovers/CreateGroup';

export function DirectButtonLink({
	icon,
	label,
	href,
	isSelected,
}: {
	icon: As;
	label: string;
	href: string;
	isSelected: boolean;
}) {
	const { getColorValue } = useThemeColors();

	return (
		<Link href={href}>
			<Flex
				w="100%"
				h="100%"
				minH="50px"
				className={styles.sidebarButton}
				bg={
					isSelected
						? getColorValue('sideBarButtonActive')
						: 'transparent'
				}
				_hover={{
					bg: isSelected
						? getColorValue('sideBarButtonActive')
						: getColorValue('sidebarButtonHover'),
				}}
				padding="5px 10px 5px 10px"
			>
				<Flex flex="1" gap="3" alignItems="center" flexWrap="wrap">
					<Box w="32px">
						<Center>
							<Icon as={icon} boxSize="24px" />
						</Center>
					</Box>
					<Box>
						<Text
							className={isSelected ? 'text-bold' : ''}
							fontSize="md"
						>
							{label}
						</Text>
					</Box>
				</Flex>
			</Flex>
		</Link>
	);
}

export type DirectChannelProps = {
	channel: IChannel;
	isSelected: boolean;
};

export function DirectChannelLink({ channel, isSelected }: DirectChannelProps) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const [isHovering, setHovering] = useState(false);
	const recipient = client.users.resolve(
		channel.type === ChannelTypes.DirectMessage ? channel.recipient : ''
	);

	return (
		<Link href={`/channels/${channel.id}`}>
			<Flex
				className={styles.sidebarButton}
				bg={
					isSelected
						? getColorValue('sideBarButtonActive')
						: 'transparent'
				}
				_hover={{
					bg: isSelected
						? getColorValue('sideBarButtonActive')
						: getColorValue('sidebarButtonHover'),
				}}
				padding="5px 10px 5px 10px"
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
				gap="1px"
			>
				<Flex
					h="100%"
					minH="45px"
					gap="10px"
					alignItems="center"
					minW="0px"
				>
					<Center h="100%">
						<Avatar
							size="36"
							src={
								channel.type === ChannelTypes.DirectMessage
									? recipient.avatar
									: channel.icon
							}
							alt="Avatar"
							indicator={
								channel.type === ChannelTypes.DirectMessage ? (
									<StatusIndicator
										status={recipient.status}
										size="14"
									/>
								) : null
							}
						/>
					</Center>
					<Flex minW="0px" alignItems="start" direction="column">
						<Box w="100%">
							<OverflownText
								fontSize="md"
								tooltipPlacement="top"
								className={isSelected ? 'text-bold' : ''}
							>
								{channel.type === ChannelTypes.DirectMessage
									? recipient.username
									: channel.name}
							</OverflownText>
						</Box>

						{channel.type === ChannelTypes.DirectMessage ? (
							recipient.presence ? (
								<Text fontSize="sm" noOfLines={1}>
									{recipient.presence}
								</Text>
							) : null
						) : channel.type === ChannelTypes.Group ? (
							<Text fontSize="sm">
								{channel.members.length} Miembros
							</Text>
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
	selectedChannelID?: string;
};

export function MainSidebarContent({
	selectedChannelID: selectedChannelID,
}: MainSidebarContentProps) {
	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);

	const channels = directChannelsState.channels;

	return (
		<Stack w="100%" h="100%">
			<DirectButtonLink
				icon={MdHome}
				label="Inicio"
				href="/home"
				isSelected={selectedChannelID === 'home'}
			/>
			<DirectButtonLink
				icon={MdPeople}
				label="Amigos"
				href="/friends"
				isSelected={selectedChannelID === 'friends'}
			/>
			<Flex gap="3px">
				<Center w="100%">
					<Separator />
				</Center>
				<Center>
					<CreateGroup>
						<IconButton
							aria-label="Create DM Group"
							bg="transparent"
							size="xs"
							fontSize="15px"
							icon={<MdAdd />}
						/>
					</CreateGroup>
				</Center>
			</Flex>
			{channels.map((channel) => {
				return (
					<DirectChannelLink
						channel={channel}
						key={channel.id}
						isSelected={selectedChannelID === channel.id}
					/>
				);
			})}
		</Stack>
	);
}

export function ProfileBox() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = client.user;

	return (
		<Box
			w="100%"
			h="100%"
			maxW="100%"
			maxH="100%"
			padding="10px 20px 10px 20px"
		>
			<Flex minW="0px" h="100%" gap="5px">
				<Flex minW="0px" gap="12px" alignItems="left">
					<Center>
						<Avatar
							size="40"
							src={user.avatar}
							alt="Avatar"
							indicator={
								<StatusIndicator
									status={user.status}
									size="15"
								/>
							}
						/>
					</Center>
					<Center w="100%" minW="0px">
						<Box textAlign="left" w="100%" maxW="100%" minW="0px">
							<OverflownText fontSize="md">
								{user.username}
							</OverflownText>
							{user.presence ? (
								<OverflownText fontSize="sm">
									{user.presence}
								</OverflownText>
							) : null}
						</Box>
					</Center>
				</Flex>
				<Spacer />
				<Flex gap="24px">
					<SettingsModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
					/>
					<Center>
						<IconButton
							aria-label="Open settings"
							bg="transparent"
							size="sm"
							fontSize="24px"
							onClick={onOpen}
							icon={<MdSettings />}
						/>
					</Center>
				</Flex>
			</Flex>
		</Box>
	);
}

export default function MainSidebar({
	selectedChannelID,
}: {
	selectedChannelID?: string;
}) {
	const { getColorValue } = useThemeColors();

	return (
		<Stack
			scrollSnapAlign="start"
			scrollSnapStop="always"
			h="100%"
			minW="250px"
			maxW="250px"
			spacing="0px"
		>
			<Box
				h="100%"
				w="100%"
				bg={getColorValue('sidebarBackground')}
				overflow="auto"
				padding="10px"
			>
				<MainSidebarContent selectedChannelID={selectedChannelID} />
			</Box>
			<Box minH="75px" bg={getColorValue('ternaryBackground')}>
				<ProfileBox />
			</Box>
		</Stack>
	);
}
