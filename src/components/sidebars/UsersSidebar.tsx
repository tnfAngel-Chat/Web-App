'use client';

import {
	Flex,
	Box,
	Stack,
	Text,
	Center,
	useDisclosure,
} from '@chakra-ui/react';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { IUser } from '@/types/interfaces/User';
import styles from '../../styles/UsersSidebar.module.scss';
import Avatar from '../user/Avatar';
import OverflownText from '../general/OverflownText';
import useThemeColors from '@/hooks/useThemeColors';
import StatusIndicator from '../user/StatusIndicator';
import Separator from '../misc/Separator';
import UserProfileModal from '../modals/UserProfileModal';
import { useState } from 'react';

export type UserListItemProps = {
	user: IUser;
	onClick: any;
};

export function UserListItem({ user, onClick }: UserListItemProps) {
	const { getColorValue } = useThemeColors();

	return (
		<Flex
			onClick={onClick}
			maxHeight="55px"
			minHeight="50px"
			className={styles.sidebarButton}
			bg="transparent"
			_hover={{
				cursor: 'pointer',
				bg: getColorValue('sideBarButtonActive'),
			}}
			padding="5px 10px 5px 10px"
		>
			<Flex h="100%" flex="1" gap="10px" alignItems="center">
				<Center>
					<Avatar
						size="36"
						src={user.avatar}
						alt="Avatar"
						indicator={
							<StatusIndicator status={user.status} size="14" />
						}
					/>
				</Center>
				<Center>
					<Box textAlign="left">
						<OverflownText fontSize="md" tooltipPlacement="top">
							{user.username}
						</OverflownText>
						{user.presence ? (
							<OverflownText fontSize="sm" tooltipPlacement="top">
								{user.presence}
							</OverflownText>
						) : null}
					</Box>
				</Center>
			</Flex>
		</Flex>
	);
}

export function StatusSection({ label }: { label: string }) {
	const { getColorValue } = useThemeColors();

	return (
		<Flex gap="10px">
			<Center w="40%">
				<Text
					fontSize="11px"
					fontWeight="normal"
					color={getColorValue('textMutedColor')}
				>
					{label}
				</Text>
			</Center>
			<Center w="100%" h="100%">
				<Separator />
			</Center>
		</Flex>
	);
}

export type UsersSidebarContentProps = {
	users: IUser[];
};

export function UsersSidebarContent({ users }: UsersSidebarContentProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [clickedUser, setClickedUser] = useState<IUser>();
	const onlineUsers: IUser[] = [];
	const offlineUsers: IUser[] = [];

	users.forEach((user) => {
		if (user.status !== UserStatusTypes.Offline) {
			onlineUsers.push(user);
		} else {
			offlineUsers.push(user);
		}
	});

	return (
		<>
			<UserProfileModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				user={clickedUser}
			/>
			<Stack w="100%" h="100%">
				{onlineUsers.length > 0 && (
					<StatusSection label={`ONLINE - ${onlineUsers.length}`} />
				)}
				{onlineUsers.map((user) => {
					return (
						<UserListItem
							user={user}
							onClick={() => {
								setClickedUser(user);
								onOpen();
							}}
							key={user.id}
						/>
					);
				})}
				{offlineUsers.length > 0 && (
					<StatusSection label={`OFFLINE - ${offlineUsers.length}`} />
				)}
				{offlineUsers.map((user) => {
					return (
						<UserListItem
							user={user}
							onClick={() => {
								setClickedUser(user);
								onOpen();
							}}
							key={user.id}
						/>
					);
				})}
			</Stack>
		</>
	);
}

export type UsersSidebarProps = {
	users: IUser[];
};

export default function UsersSidebar({ users }: UsersSidebarProps) {
	const { getColorValue } = useThemeColors();
	return (
		<Stack
			scrollSnapAlign="end"
			scrollSnapStop="always"
			h="100%"
			minW="250px"
			maxW="250px"
			bg={getColorValue('sidebarBackground')}
		>
			<Box h="100%" w="100%" padding="10px">
				<UsersSidebarContent users={users} />
			</Box>
		</Stack>
	);
}
