'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';

import { IChannel } from '@/types/interfaces/Channel';
import { IMessage } from '@/types/interfaces/Message';
import {
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import Avatar from '../user/Avatar';
import Message from './Message';
import Separator from '../misc/Separator';
import styles from '../../styles/MessageBox.module.scss';
import StatusIndicator from '../user/StatusIndicator';
import InputBox from './InputBox';
import useColorValue from '@/hooks/useColorValue';

export type MessagesBoxProps = {
	channel: IChannel;
	messages: IMessage[];
};

export function WelcomeMessage({ channel }: MessagesBoxProps) {
	return (
		<Box w="100%">
			<Center h="70vh">
				<Stack spacing="24px">
					<Flex gap="20px">
						<Avatar
							size="64"
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
										size="23"
									/>
								) : null
							}
						/>
						<Center>
							<Heading as="h2">
								{channel.type === ChannelTypes.DirectMessage
									? `@${channel.recipient.username}`
									: channel.name}
							</Heading>
						</Center>
					</Flex>
					<Heading as="h1">Comienzo de tu chat</Heading>
					<Text>
						{channel.type === ChannelTypes.DirectMessage
							? `Este es el comienzo de tu chat con @${channel.recipient.username}`
							: `Este es el comienzo de tu chat en ${channel.name}`}
					</Text>
				</Stack>
			</Center>
		</Box>
	);
}

export default function MessagesBox({ channel, messages }: MessagesBoxProps) {
	const { getColorValue } = useColorValue();

	return (
		<Stack w="100%">
			<Box
				overflow="auto"
				flexDirection="column-reverse"
				display="flex"
				h="100%"
			>
				<Box className={styles.selectableMessagesBox}>
					{messages.map((message) => (
						<Message message={message} key={message.id} />
					))}
				</Box>
				{messages.length ? <Separator /> : null}
				<WelcomeMessage channel={channel} messages={messages} />
			</Box>
			<Box minH="75px" bg={getColorValue('secondaryContentBackground')}>
				<InputBox channel={channel} />
			</Box>
		</Stack>
	);
}
