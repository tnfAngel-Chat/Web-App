'use client';

import { Flex, Box, Stack, Text, Center } from '@chakra-ui/react';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IUser } from '@/types/interfaces/User';
import styles from '../../styles/UsersSidebar.module.scss';
import Avatar from '../user/Avatar';
import OverflownText from '../general/OverflowText';
import useColorValue from '@/hooks/useColorValue';
import normalizeUser from '@/util/normalizeUser';
import StatusIndicator from '../user/StatusIndicator';

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
						<OverflownText
							fontSize="md"
							maxW="100px"
							tooltipPlacement="top"
						>
							{user.username}
						</OverflownText>
						{user.presence ? (
							<Text fontSize="sm" noOfLines={1}>
								{user.presence}
							</Text>
						) : null}
					</Box>
				</Center>
			</Flex>
		</Flex>
	);
}

export type UsersSidebarContentProps = {
	users: IUser[];
};

export function UsersSidebarContent({ users }: UsersSidebarContentProps) {
	return (
		<Stack w="100%" h="100%">
			{users.map((user) => {
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
