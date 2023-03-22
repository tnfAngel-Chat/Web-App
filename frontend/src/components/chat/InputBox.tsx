'use client';

import { useFilePicker } from 'use-file-picker';
import { isMobile } from 'react-device-detect';
import { IChannel } from '@/types/interfaces/Channel';
import {
	Box,
	Flex,
	Center,
	IconButton,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Textarea,
} from '@chakra-ui/react';
import { MdAddCircle, MdEmojiEmotions, MdSend } from 'react-icons/md';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import useColorValue from '@/hooks/useColorValue';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	modifyMessage,
	setMessageInput,
} from '@/store/slices/chatsSlice';
import { RootState } from '@/store';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { MessageModes } from '@/types/enums/MessageModes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import normalizeMessage from '@/util/normalizeMessage';
import { useEffect, useRef } from 'react';

export type InputBoxProps = {
	channel: IChannel;
};

export default function InputBox({ channel }: InputBoxProps) {
	const [openFileSelector /*{ filesContent, loading }*/] = useFilePicker({});
	const { getColorValue } = useColorValue();
	const dispatch = useDispatch();

	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);

	useEffect(() => {
		inputRef.current?.scrollIntoView({ behavior: 'smooth' });

		if (isMobile)
			setTimeout(() => {
				inputRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 550);
	}, []);

	const chatsState = useSelector((state: RootState) => state.chats);

	const inputRef = useRef<null | any>(null);

	const handleKeyDown = (event: any) => {
		const content = event.target.value.trim();

		if (event.key === 'Enter' && !event.shiftKey && !isMobile && content) {
			event.preventDefault();
			handleSend(content);
		} else if (event.key === 'Enter' && !event.shiftKey) {
			if (!isMobile) event.preventDefault();
		}
	};

	function handleSend(rawContent: string) {
		const content = rawContent.trim();

		const selectedChannelId = directChannelsState.selectedChannelId;

		if (!selectedChannelId) return;

		const rawAuthor = {
			type: UserTypes.User,
			id: '1',
			username: 'Lauty',
			avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
			status: UserStatusTypes.Online,
		};

		dispatch(
			setMessageInput({
				channelId: selectedChannelId,
				content: '',
			})
		);

		const tempMessageId = `${Math.random() * 1000}`;

		dispatch(
			addMessage({
				channelId: selectedChannelId,
				message: normalizeMessage({
					type: MessageTypes.Text,
					mode: MessageModes.Sending,
					id: tempMessageId,
					content: content,
					author: rawAuthor,
					timestamp: Date.now(),
				}),
			})
		);

		setTimeout(() => {
			dispatch(
				modifyMessage({
					channelId: selectedChannelId,
					messageId: tempMessageId,
					newMessage: normalizeMessage({
						type: MessageTypes.Text,
						mode: MessageModes.Sent,
						id: tempMessageId,
						content: content,
						author: rawAuthor,
						timestamp: Date.now(),
					}),
				})
			);
		}, Math.random() * 260);
	}

	const handleChange = (event: any) => {
		if (directChannelsState.selectedChannelId) {
			dispatch(
				setMessageInput({
					channelId: directChannelsState.selectedChannelId,
					content: event.target.value,
				})
			);
		}
	};

	const inputValue =
		chatsState.inputs[directChannelsState.selectedChannelId ?? ''] ?? '';

	const numberOfLines = inputValue.split('\n').length;

	return (
		<Box
			bg={getColorValue('secondaryContentBackground')}
			w="100%"
			padding="15px 20px 15px 20px"
		>
			<Flex h="100%" gap="24px">
				<Flex gap="24px" paddingTop="6px">
					<IconButton
						aria-label="Add attachments"
						bg="transparent"
						size="sm"
						fontSize="24px"
						icon={<MdAddCircle />}
						onClick={openFileSelector}
					/>
				</Flex>
				<Center w="100%">
					<Textarea
						placeholder={`Message @${
							channel.type === ChannelTypes.DirectMessage
								? channel.recipient.username
								: channel.name
						}`}
						rows={numberOfLines > 22 ? 22 : numberOfLines}
						maxH="50vh"
						minH="45px"
						size="md"
						resize="none"
						focusBorderColor={getColorValue('focusBorderColor')}
						onKeyDown={handleKeyDown}
						onChange={handleChange}
						autoFocus={true}
						value={inputValue}
						ref={inputRef}
					/>
				</Center>
				<Flex gap="24px" paddingTop="6px">
					<Popover placement="top-end" isLazy>
						<PopoverTrigger>
							<IconButton
								aria-label="Add emojis"
								bg="transparent"
								size="sm"
								fontSize="24px"
								icon={<MdEmojiEmotions />}
							/>
						</PopoverTrigger>
						<PopoverContent bg={getColorValue('sidebarContent')}>
							<PopoverCloseButton />
							<PopoverHeader>Selector de emojis</PopoverHeader>
							<PopoverBody>
								Aun no hay ninguno (Por ahora)
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Flex>
				{isMobile && (
					<Flex gap="24px" paddingTop="6px">
						<IconButton
							aria-label="Send message"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdSend />}
							onClick={() => handleSend(inputValue)}
						/>
					</Flex>
				)}
			</Flex>
		</Box>
	);
}
