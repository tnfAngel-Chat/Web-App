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
import { IDirectMessageChannel } from '@/types/interfaces/Channel';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IUser } from '@/types/interfaces/User';
import styles from '../../styles/MainSidebar.module.scss';
import Avatar from '../user/Avatar';
import Separator from '../misc/Separator';
import SettingsModal from '../modals/SettingsModal';
import { useState } from 'react';
import StatusIndicator from '../user/StatusIndicator';

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
	const { colorMode } = useColorMode();

	return (
		<Box
			as="button"
			className={`${styles.sidebarButton} ${
				isSelected ? styles.sidebarButtonActive : ''
			}`}
			bg={`${colorMode}.primary.sidebarContent`}
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
					<Text as={isSelected ? 'b' : 'p'} fontSize="md">
						{label}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
}

export type DirectChannelProps = {
	channel: IDirectMessageChannel;
	isSelected: boolean;
};

export function DirectChannelLink({ channel, isSelected }: DirectChannelProps) {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const recipient = channel.recipient;

	const [isHovering, setHovering] = useState(false);

	function handleMouseEnter() {
		setHovering(true);
	}
	function handleMouseLeave() {
		setHovering(false);
	}

	return (
		<Flex
			minHeight="50px"
			className={`${styles.sidebarButton} ${
				isSelected ? styles.sidebarButtonActive : ''
			}`}
			padding="5px 10px 5px 10px"
			bg={`${colorMode}.primary.sidebarContent`}
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
							src={recipient.avatarId ?? ''}
							alt="Avatar"
							indicator={
								<StatusIndicator
									status={recipient.status}
									size="14"
								/>
							}
						/>
					</Center>
					<Center>
						<Box textAlign="left">
							<Text as={isSelected ? 'b' : 'p'} fontSize="md">
								{recipient.username}
							</Text>
							{recipient.presence ? (
								<Text fontSize="sm">{recipient.presence}</Text>
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
	const users: IUser[] = [
		{
			type: UserTypes.User,
			id: '1',
			username: 'Ángel',
			status: UserStatusTypes.Online,
			avatarId: '3132',
		},
		{
			type: UserTypes.User,
			id: '3',
			username: 'Juan',
			status: UserStatusTypes.DoNotDisturb,
			avatarId:
				'https://cdn.discordapp.com/attachments/1012394358504431707/1081922878389370940/random-shot-goose-head-yellow-beak-farm-209772525.jpg',
		},
		{
			type: UserTypes.User,
			id: '2',
			username: 'Lauty',
			status: UserStatusTypes.Idle,
			avatarId:
				'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
			presence: 'TKM',
		},
		{
			type: UserTypes.User,
			username: 'Julian',
			id: '2',
			status: UserStatusTypes.Offline,
			avatarId:
				'https://cdn.discordapp.com/attachments/1012394358504431707/1081923094916120637/6201803e9abd9.jpeg',
		},
	];

	const channels: IDirectMessageChannel[] = [
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
	];

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
	const { colorMode } = useColorMode();

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
					<PopoverContent bg={`${colorMode}.primary.sidebarContent`}>
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
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			w="100%"
			h="100%"
			padding="10px 20px 10px 20px"
			bg={`${colorMode}.primary.userProfileSidebar`}
		>
			<Flex h="100%">
				<Flex flex="1" gap="12px" alignItems="left" flexWrap="wrap">
					<Center>
						<Avatar
							size="40"
							src={user.avatarId ?? ''}
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
	const { colorMode } = useColorMode();

	const currentUser = {
		type: UserTypes.User,
		id: '1',
		username: 'Ángel',
		status: UserStatusTypes.Online,
		avatarId:
			'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
		presence: '',
	};

	return (
		<Stack h="100vh" bg={`${colorMode}.primary.sidebarContent`}>
			<Box h="100%" overflow="auto" width="250px" padding="10px">
				<MainSidebarContent selectedChannelID={selectedChannelID} />
			</Box>
			<Box minH="75px">
				<ProfileBox user={currentUser} />
			</Box>
		</Stack>
	);
}
