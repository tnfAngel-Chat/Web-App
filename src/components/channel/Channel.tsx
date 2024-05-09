'use client';

import { ChannelTypes } from '@/types/enums/ChannelTypes';

import { client } from '@/client';
import type { Channel as ChannelUnion } from '@/types/interfaces/Channel';
import type { IUser } from '@/types/interfaces/User';
import { Box, Center, Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Separator from '../layout/Separator';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';
import Message from './Message';

import useChannelMessages from '@/hooks/useMessages';
import type { RootState } from '@/store';
import { setMessages } from '@/store/slices/chatsSlice';
import normalizeMessage from '@/util/normalizeMessage';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileModal from '../modals/UserProfileModal';

export type MessagesBoxProps = {
	channel: ChannelUnion;
};

export function WelcomeMessage({ channel }: Readonly<MessagesBoxProps>) {
	const recipient = client.users.resolve(channel.type === ChannelTypes.DirectMessage ? channel.recipient : '');

	return (
		<Box w='100%'>
			<Center h='70vh'>
				<Stack spacing='24px' padding='20px'>
					<Flex gap='20px'>
						<Box minW='64px'>
							<Avatar
								size='64'
								src={channel.type === ChannelTypes.DirectMessage ? recipient.avatar : channel.icon}
								alt='Avatar'
								indicator={
									channel.type === ChannelTypes.DirectMessage ? (
										<StatusIndicator status={recipient.status} size='23' />
									) : null
								}
							/>
						</Box>
						<Center>
							<Heading as='h2'>
								{channel.type === ChannelTypes.DirectMessage ? `@${recipient.username}` : channel.name}
							</Heading>
						</Center>
					</Flex>
					<Heading as='h1'>Start of your chat</Heading>
					<Text>
						{channel.type === ChannelTypes.DirectMessage
							? `This is the start of your chat with @${recipient.username}`
							: `This is the start of your chat on ${channel.name}`}
					</Text>
				</Stack>
			</Center>
		</Box>
	);
}

export function MessageGroupSpacer() {
	return <Box h='15px' />;
}

export default function Channel({ channel }: Readonly<MessagesBoxProps>) {
	const [clickedUser, setClickedUser] = useState<IUser>();
	const mainRef = useRef<any>();
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [beforeId, setBeforeId] = useState<string>();
	const [afterId, setAfterId] = useState<string>();

	const { data, isLoading } = useChannelMessages(channel.id, afterId, beforeId);

	const chatsState = useSelector((state: RootState) => state.chats);

	const stateMessages = chatsState.chats[channel.id] ?? [];

	const [topRef] = useInView({
		threshold: 0,
		onChange: (inView) => {
			if (inView) {
				const firstMessageId = stateMessages.at(0)?.id;

				if (beforeId !== firstMessageId) {
					console.log('[TOP] should fetch');
					setAfterId(undefined);
					setBeforeId(firstMessageId);
				}
			}
		}
	});

	const [bottomRef] = useInView({
		threshold: 0,
		onChange: (inView) => {
			if (inView) {
				if (!channel.lastMessage || channel.lastMessage !== stateMessages.at(-1)?.id) {
					const lastMessageId = stateMessages.at(0)?.id;

					if (afterId !== lastMessageId) {
						console.log('[BOTTOM] should fetch');
						setBeforeId(undefined);
						setAfterId(lastMessageId);
					}
				}
			}
		}
	});

	const dataMessages = data?.map((msg) => normalizeMessage(msg));

	let lastAuthorId: string;

	if (dataMessages && (!chatsState.chats[channel.id] || beforeId || afterId)) {
		const result = stateMessages.slice();

		if (beforeId) {
			result.unshift(...dataMessages);
			setBeforeId(undefined);
		} else if (afterId) {
			result.push(...dataMessages);
			setAfterId(undefined);
		} else {
			result.push(...dataMessages);
		}

		dispatch(setMessages({ channelId: channel.id, messages: result }));
	}

	useEffect(() => {
		setTimeout(
			() =>
				mainRef.current?.scrollIntoView({
					behavior: 'smooth'
				}),
			50
		);
	}, [channel.id]);

	return (
		<Stack w='100%' h='100%' ref={mainRef} wordBreak='break-all' className='adjustScreen'>
			<UserProfileModal isOpen={isOpen} onClose={onClose} user={clickedUser} />
			<Box overflowX='auto' flexDirection='column-reverse' display='flex' h='100%'>
				<Box userSelect='text'>
					{stateMessages?.map((message, i) => {
						const isHeadless = lastAuthorId === message.author.id;

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
								{!isHeadless && <MessageGroupSpacer />}
								{MessageElement}
								{i === stateMessages.length - 1 && <MessageGroupSpacer />}
							</>
						);
					})}
				</Box>
				{stateMessages.length ? <Separator /> : null}
				<WelcomeMessage channel={channel} />
			</Box>
		</Stack>
	);
}

/* <Box w="100%" h="20px" bg="tomato" ref={topRef}></Box> */
