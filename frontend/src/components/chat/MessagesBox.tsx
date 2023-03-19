'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';

import { IChannel } from '@/types/interfaces/Channel';
import { IMessage } from '@/types/interfaces/Message';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Avatar from '../user/Avatar';
import Message from './Message';
import Separator from '../misc/Separator';
import styles from '../../styles/MessageBox.module.scss';
import StatusIndicator from '../user/StatusIndicator';

export type MessagesBoxProps = {
	channel: IChannel;
	messages: IMessage[];
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
								src={channel.recipient.avatar ?? ''}
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

export default function MessagesBox({ channel, messages }: MessagesBoxProps) {
	return (
		<Box w="100%">
			<WelcomeMessage channel={channel} messages={messages} />
			{messages.length ? <Separator /> : null}
			<Box className={styles.selectableMessagesBox}>
				{messages.map((message) => (
					<Message message={message} key={message.id} />
				))}
			</Box>
		</Box>
	);
}
