'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';

import { IChannel } from '@/types/interfaces/Channel';
import {
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import Avatar from '../user/Avatar';
import Message from './Message';
import Separator from '../layout/Separator';
import styles from '../../styles/Channel.module.scss';
import StatusIndicator from '../user/StatusIndicator';
import { IUser } from '@/types/interfaces/User';
import { client } from '@/client';
import { useState } from 'react';

import normalizeMessage from '@/util/normalizeMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { RootState } from '@/store';
import { setMessages } from '@/store/slices/chatsSlice';
import UserProfileModal from '../modals/UserProfileModal';
import useChannelMessages from '@/hooks/useMessages';

export type MessagesBoxProps = {
	channel: IChannel;
};

export function WelcomeMessage({ channel }: MessagesBoxProps) {
	const recipient = client.users.resolve(
		channel.type === ChannelTypes.DirectMessage ? channel.recipient : ''
	);

	return (
		<Box w="100%">
			<Center h="70vh">
				<Stack spacing="24px" padding="20px">
					<Flex gap="20px">
						<Box minW="64px">
							<Avatar
								size="64"
								src={
									channel.type === ChannelTypes.DirectMessage
										? recipient.avatar
										: channel.icon
								}
								alt="Avatar"
								indicator={
									channel.type ===
									ChannelTypes.DirectMessage ? (
										<StatusIndicator
											status={recipient.status}
											size="23"
										/>
									) : null
								}
							/>
						</Box>
						<Center>
							<Heading as="h2">
								{channel.type === ChannelTypes.DirectMessage
									? `@${recipient.username}`
									: channel.name}
							</Heading>
						</Center>
					</Flex>
					<Heading as="h1">Comienzo de tu chat</Heading>
					<Text>
						{channel.type === ChannelTypes.DirectMessage
							? `Este es el comienzo de tu chat con @${recipient.username}`
							: `Este es el comienzo de tu chat en ${channel.name}`}
					</Text>
				</Stack>
			</Center>
		</Box>
	);
}

export function MessageGroupSpacer() {
	return <Box h="15px" />;
}

export default function Channel({ channel }: MessagesBoxProps) {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [clickedUser, setClickedUser] = useState<IUser>();
	const { data, isLoading } = useChannelMessages(channel.id);
	const [topRef] = useInView({
		threshold: 0,
		onChange: (inView) => {
			console.log('change top', inView);
		},
	});
	const [bottomRef] = useInView({
		threshold: 0,
		onChange: (inView) => {
			console.log('change bot', inView);
		},
	});

	let lastAuthorId: string;

	const dataMessages = data?.map((msg) => normalizeMessage(msg));

	const chatsState = useSelector((state: RootState) => state.chats);

	const messages = chatsState.chats[channel.id] ?? [];

	if (dataMessages && !chatsState.chats[channel.id]) {
		dispatch(
			setMessages({ channelId: channel.id, messages: dataMessages })
		);
	}

	return (
		<Stack
			w="100%"
			h="100%"
			wordBreak="break-all"
			className={styles.messagesStack}
		>
			{!isLoading && (
				<>
					<UserProfileModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						user={clickedUser}
					/>
					<Box
						overflowX="auto"
						flexDirection="column-reverse"
						display="flex"
						h="100%"
					>
						<Box userSelect="auto">
							{messages.map((message, i) => {
								const isHeadless =
									lastAuthorId === message.author.id;

								const MessageElement = (
									<Message
										onShowAuthor={() => {
											setClickedUser(message.author);
											onOpen();
										}}
										message={message}
										key={message.id}
										headless={isHeadless}
									/>
								);

								lastAuthorId = message.author.id;

								return (
									<>
										{isHeadless ? null : (
											<MessageGroupSpacer />
										)}
										{MessageElement}
										{i === messages.length - 1 ? (
											<MessageGroupSpacer />
										) : null}
									</>
								);
							})}
						</Box>
						{messages.length ? <Separator /> : null}
						<WelcomeMessage channel={channel} />
					</Box>
				</>
			)}
		</Stack>
	);
}
