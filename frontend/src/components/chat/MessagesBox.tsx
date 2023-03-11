'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IChannel } from '@/types/interfaces/Channel';
import { IMessage } from '@/types/interfaces/Message';
import { IUser } from '@/types/interfaces/User';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Avatar from '../user/Avatar';
import Message from './Message';
import Separator from '../misc/Separator';
import styles from '../../styles/MessageBox.module.scss';
import StatusIndicator from '../user/StatusIndicator';

export type MessagesBoxProps = {
	channel: IChannel;
};

export function WelcomeMessage({ channel }: MessagesBoxProps) {
	if (channel.type === ChannelTypes.DirectMessage) {
		return (
			<Box w="100%">
				<Center h="70vh">
					<Stack spacing="24px">
						<Flex gap="20px">
							<Avatar
								size="64"
								src={channel.recipient.avatarId ?? ''}
								alt="Avatar"
								indicator={
									<StatusIndicator
										status={channel.recipient.status}
										size="23"
									/>
								}
							/>
							<Center>
								<Heading as="h2">
									@{channel.recipient.username}
								</Heading>
							</Center>
						</Flex>
						<Heading as="h1">Comienzo de tu chat</Heading>
						<Text>
							Este es el comienzo de tu chat con @
							{channel.recipient.username}
						</Text>
					</Stack>
				</Center>
			</Box>
		);
	} else {
		return <></>;
	}
}

export default function MessagesBox({ channel }: MessagesBoxProps) {
	const author: IUser = {
		type: UserTypes.User,
		id: '1',
		username: 'Lauty',
		avatarId:
			'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
		status: UserStatusTypes.Online,
	};

	const chats: Record<string, IMessage[]> = {
		'22': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
		],
		'11': [
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: 's',
				content: 'holaa',
				author: author,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				id: '3',
				content: 'pruba',
				author: author,
				timestamp: Date.now(),
			},
		],
	};

	const messages = chats[channel.id] ?? [];

	return (
		<Box w="100%">
			<WelcomeMessage channel={channel} />
			{messages.length ? <Separator /> : null}
			<Box className={styles.selectableMessagesBox}>
				{messages.map((message) => (
					<Message message={message} key={message.id} />
				))}
			</Box>
		</Box>
	);
}
