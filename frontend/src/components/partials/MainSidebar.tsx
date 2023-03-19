'use client';

import {
	useColorMode,
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
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';
import { MdAdd, MdHome, MdPerson, MdSettings } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import {
	IChannel,
	IDirectMessageChannel,
	IRawChannel,
} from '@/types/interfaces/Channel';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IRawUser, IUser } from '@/types/interfaces/User';
import styles from '../../styles/MainSidebar.module.scss';
import Avatar from '../user/Avatar';
import Separator from '../misc/Separator';
import SettingsModal from '../modals/SettingsModal';
import { useState } from 'react';
import StatusIndicator from '../user/StatusIndicator';
import normalizeUser from '@/util/normalizeUser';
import normalizeChannel from '@/util/normalizeChannel';
import OverflownText from '../util/OverflowText';
import useColorValue from '@/hooks/useColorValue';

export function DirectButtonLink({
	icon,
	label,
	href,
	isSelected,
}: {
	icon: As<any>;
	label: string;
	href: string;
	isSelected: boolean;
}) {
	const router = useRouter();
	const { getColorValue } = useColorValue();

	return (
		<Box
			as="button"
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
			minHeight="50px"
			onClick={() => router.push(href)}
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
		</Box>
	);
}

export type DirectChannelProps = {
	channel: IChannel;
	isSelected: boolean;
};

export function DirectChannelLink({ channel, isSelected }: DirectChannelProps) {
	const router = useRouter();
	const { getColorValue } = useColorValue();

	const [isHovering, setHovering] = useState(false);

	function handleMouseEnter() {
		setHovering(true);
	}
	function handleMouseLeave() {
		setHovering(false);
	}

	return (
		<Flex
			maxHeight="55px"
			minHeight="50px"
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
			onClick={() => router.push(`/channels/${channel.id}`)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Box as="button">
				<Flex
					h="100%"
					flex="1"
					gap="10px"
					alignItems="center"
					flexWrap="wrap"
				>
					<Center>
						<Avatar
							size="36"
							src={
								channel.type === ChannelTypes.DirectMessage
									? channel.recipient.avatar
									: channel.icon
							}
							alt="Avatar"
							indicator={
								channel.type === ChannelTypes.DirectMessage ? (
									<StatusIndicator
										status={channel.recipient.status}
										size="14"
									/>
								) : null
							}
						/>
					</Center>
					<Center>
						<Box textAlign="left">
							<OverflownText
								fontSize="md"
								maxW="100px"
								tooltipPlacement="top"
								className={isSelected ? 'text-bold' : ''}
							>
								{channel.type === ChannelTypes.DirectMessage
									? channel.recipient.username
									: channel.name}
							</OverflownText>
							{channel.type === ChannelTypes.DirectMessage ? (
								channel.recipient.presence ? (
									<Text fontSize="sm" noOfLines={1}>
										{channel.recipient.presence}
									</Text>
								) : null
							) : channel.type === ChannelTypes.Group ? (
								<Text fontSize="sm">
									{channel.members.length} Miembros
								</Text>
							) : null}
						</Box>
					</Center>
				</Flex>
			</Box>
			{isHovering ? (
				<>
					<Spacer />
					<Center>
						<CloseButton
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
							}}
						/>
					</Center>
				</>
			) : null}
		</Flex>
	);
}

export type MainSidebarContentProps = {
	selectedChannelID?: string;
};

export function MainSidebarContent({
	selectedChannelID: selectedChannelID,
}: MainSidebarContentProps) {
	const users: IRawUser[] = [
		{
			type: UserTypes.User,
			id: '1',
			username: 'Ángel',
			status: UserStatusTypes.Online,
		},
		{
			type: UserTypes.User,
			id: '3',
			username: 'Juan',
			status: UserStatusTypes.DoNotDisturb,
			avatar: 'https://cdn.discordapp.com/attachments/1012394358504431707/1081922878389370940/random-shot-goose-head-yellow-beak-farm-209772525.jpg',
		},
		{
			type: UserTypes.User,
			id: '2',
			username: 'Lauty',
			status: UserStatusTypes.Idle,
			avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
			presence: 'TKM',
		},
		{
			type: UserTypes.User,
			username: 'Julionete jose juan',
			id: '4',
			status: UserStatusTypes.Offline,
			avatar: 'https://cdn.discordapp.com/attachments/1012394358504431707/1081923094916120637/6201803e9abd9.jpeg',
		},
		{
			type: UserTypes.User,
			username: 'el pepe',
			id: '5',
			status: UserStatusTypes.Online,
		},
	];

	const rawChannels: IRawChannel[] = [
		{
			type: ChannelTypes.DirectMessage,
			id: '22',
			recipient: users[1],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '11',
			recipient: users[2],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '33',
			recipient: users[3],
		},
		{
			type: ChannelTypes.Group,
			id: '44',
			icon: 'https://discord.com/assets/f90fca70610c4898bc57b58bce92f587.png',
			name: 'uwu',
			members: [users[1], users[2]],
		},
		{
			type: ChannelTypes.Group,
			id: '55',
			members: [users[1], users[3], users[2]],
		},
		{
			type: ChannelTypes.DirectMessage,
			id: '60',
			recipient: users[4],
		},
	];

	const channels = rawChannels.map(normalizeChannel);

	return (
		<Stack w="100%" h="100%">
			<DirectButtonLink
				icon={MdHome}
				label="Inicio"
				href="/home"
				isSelected={selectedChannelID === 'home'}
			/>
			<DirectButtonLink
				icon={MdPerson}
				label="Amigos"
				href="/friends"
				isSelected={selectedChannelID === 'friends'}
			/>
			<CreateGroupSection />
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

export function CreateGroupSection() {
	const { getColorValue } = useColorValue();

	return (
		<Flex gap="3px">
			<Center w="100%">
				<Separator />
			</Center>
			<Center>
				<Popover placement="bottom-start" isLazy>
					<PopoverTrigger>
						<IconButton
							aria-label="Create DM Group"
							bg="transparent"
							size="xs"
							fontSize="15px"
							icon={<MdAdd />}
						/>
					</PopoverTrigger>
					<PopoverContent bg={getColorValue('sidebarContent')}>
						<PopoverCloseButton />
						<PopoverHeader>Seleccionar amigos</PopoverHeader>
						<PopoverBody>Aun no hay amigos</PopoverBody>
					</PopoverContent>
				</Popover>
			</Center>
		</Flex>
	);
}

export type ProfileBoxProps = {
	user: IUser;
};

export function ProfileBox({ user }: ProfileBoxProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { getColorValue } = useColorValue();

	return (
		<Box
			w="100%"
			h="100%"
			padding="10px 20px 10px 20px"
			bg={getColorValue('userProfileSidebar')}
		>
			<Flex h="100%">
				<Flex flex="1" gap="12px" alignItems="left" flexWrap="wrap">
					<Center>
						<Avatar
							size="40"
							src={user.avatar ?? ''}
							alt="Avatar"
							indicator={
								<StatusIndicator
									status={user.status}
									size="15"
								/>
							}
						/>
					</Center>
					<Center>
						<Box textAlign="left">
							<Text fontSize="md">{user.username}</Text>
							{user.presence ? (
								<Text fontSize="sm">{user.presence}</Text>
							) : null}
						</Box>
					</Center>
				</Flex>
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
	selectedChannelID: string;
}) {
	const { getColorValue } = useColorValue();

	const currentUser = normalizeUser({
		type: UserTypes.User,
		id: '1',
		username: 'Ángel',
		status: UserStatusTypes.Online,
		avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
	});

	return (
		<Stack h="100vh" bg={getColorValue('sidebarContent')}>
			<Box h="100%" overflow="auto" width="250px" padding="10px">
				<MainSidebarContent selectedChannelID={selectedChannelID} />
			</Box>
			<Box minH="75px">
				<ProfileBox user={currentUser} />
			</Box>
		</Stack>
	);
}
