'use client';

import { Flex, Box, Stack, Text, Center } from '@chakra-ui/react';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { IUser } from '@/types/interfaces/User';
import styles from '../../styles/UsersSidebar.module.scss';
import Avatar from '../user/Avatar';
import OverflownText from '../general/OverflownText';
import useColorValue from '@/hooks/useColorValue';
import StatusIndicator from '../user/StatusIndicator';
import Separator from '../misc/Separator';

export type UserListItemProps = {
	user: IUser;
};

export function UserListItem({ user }: UserListItemProps) {
	const { getColorValue } = useColorValue();

	return (
		<Flex
			maxHeight="55px"
			minHeight="50px"
			className={styles.sidebarButton}
			bg="transparent"
			_hover={{
				bg: getColorValue('sideBarButtonActive'),
			}}
			padding="5px 10px 5px 10px"
		>
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
	const { getColorValue } = useColorValue();

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
		<Stack w="100%" h="100%">
			{onlineUsers.length > 0 && (
				<StatusSection label={`ONLINE - ${onlineUsers.length}`} />
			)}
			{onlineUsers.map((user) => {
				return <UserListItem user={user} key={user.id} />;
			})}
			{offlineUsers.length > 0 && (
				<StatusSection label={`OFFLINE - ${offlineUsers.length}`} />
			)}
			{offlineUsers.map((user) => {
				return <UserListItem user={user} key={user.id} />;
			})}
		</Stack>
	);
}

export type UsersSidebarProps = {
	users: IUser[];
};

export default function UsersSidebar({ users }: UsersSidebarProps) {
	const { getColorValue } = useColorValue();
	return (
		<Stack h="100%" bg={getColorValue('sidebarContent')}>
			<Box h="100%" overflow="auto" width="250px" padding="10px">
				<UsersSidebarContent users={users} />
			</Box>
		</Stack>
	);
}
