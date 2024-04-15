'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import type { IUser } from '@/types/interfaces/User';
import { Box, Center, Flex, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import OverflownText from '../misc/OverflownText';
import UserProfileModal from '../modals/UserProfileModal';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';
import Separator from './Separator';

export type UserListItemProps = {
	user: IUser;
	onClick: any;
};

export function UserListItem({ user, onClick }: Readonly<UserListItemProps>) {
	const { getColorValue } = useThemeColors();

	return (
		<Flex
			onClick={onClick}
			maxHeight='55px'
			minHeight='50px'
			borderRadius='5px'
			bg='transparent'
			_hover={{
				cursor: 'pointer',
				bg: getColorValue('sidebarButtonActive')
			}}
			padding='5px 10px 5px 10px'
		>
			<Flex h='100%' flex='1' gap='10px' alignItems='center' minW='0px'>
				<Center>
					<Avatar
						size='36'
						src={user.avatar}
						alt='Avatar'
						indicator={<StatusIndicator status={user.status} size='14' />}
					/>
				</Center>
				<Center minW='0px'>
					<Box textAlign='left' minW='0px'>
						<OverflownText fontSize='md' tooltipPlacement='top'>
							{user.username}
						</OverflownText>
						{user.presence ? (
							<OverflownText minW='0px' fontSize='sm' tooltipPlacement='top'>
								{user.presence}
							</OverflownText>
						) : null}
					</Box>
				</Center>
			</Flex>
		</Flex>
	);
}

export function StatusSection({ label }: Readonly<{ label: string }>) {
	const { getColorValue } = useThemeColors();

	return (
		<Flex gap='10px'>
			<Center w='40%'>
				<Text fontSize='11px' fontWeight='normal' color={getColorValue('textMutedColor')}>
					{label}
				</Text>
			</Center>
			<Center w='100%' h='100%'>
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
			<UserProfileModal isOpen={isOpen} onClose={onClose} user={clickedUser} />
			<Stack w='100%' h='100%'>
				{onlineUsers.length > 0 && <StatusSection label={`ONLINE - ${onlineUsers.length}`} />}
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
				{offlineUsers.length > 0 && <StatusSection label={`OFFLINE - ${offlineUsers.length}`} />}
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
	userSidebarRef?: any;
};

export default function UsersSidebar({ users, userSidebarRef }: UsersSidebarProps) {
	const { getColorValue } = useThemeColors();

	return (
		<Stack
			scrollSnapAlign='end'
			scrollSnapStop='always'
			h='100%'
			minW='250px'
			maxW='250px'
			ref={userSidebarRef}
			bg={getColorValue('sidebarBackground')}
		>
			<Box h='100%' w='100%' padding='10px'>
				<UsersSidebarContent users={users} />
			</Box>
		</Stack>
	);
}
