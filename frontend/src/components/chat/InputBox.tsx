'use client';

import { useFilePicker } from 'use-file-picker';
import { IChannel } from '@/types/interfaces/Channel';
import {
	Input,
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
} from '@chakra-ui/react';
import { MdAddCircle, MdEmojiEmotions } from 'react-icons/md';
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

	const chatsState = useSelector((state: RootState) => state.chats);

	const handleKeyDown = (event: any) => {
		const content = event.target.value.trim();

		if (
			event.key === 'Enter' &&
			directChannelsState.selectedChannelId &&
			content
		) {
			const sentChannelId = directChannelsState.selectedChannelId;

			const rawAuthor = {
				type: UserTypes.User,
				id: '1',
				username: 'Lauty',
				avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
				status: UserStatusTypes.Online,
			};

			dispatch(
				setMessageInput({
					channelId: directChannelsState.selectedChannelId,
					content: '',
				})
			);

			const tempMessageId = `${Math.random() * 1000}`;

			dispatch(
				addMessage({
					channelId: sentChannelId,
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
						channelId: sentChannelId,
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
	};

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

	return (
		<Box w="100%" h="100%" padding="10px 20px 10px 20px">
			<Flex h="100%" gap="24px">
				<Flex gap="24px">
					<Center>
						<IconButton
							aria-label="Add attachments"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdAddCircle />}
							onClick={openFileSelector}
						/>
					</Center>
				</Flex>
				<Center w="100%">
					<Input
						placeholder={`Message @${
							channel.type === ChannelTypes.DirectMessage
								? channel.recipient.username
								: channel.name
						}`}
						focusBorderColor={getColorValue('focusBorderColor')}
						autoFocus={true}
						onKeyDown={handleKeyDown}
						onChange={handleChange}
						value={
							chatsState.inputs[
								directChannelsState.selectedChannelId ?? ''
							] ?? ''
						}
					/>
				</Center>
				<Flex gap="24px">
					<Center>
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
							<PopoverContent
								bg={getColorValue('sidebarContent')}
							>
								<PopoverCloseButton />
								<PopoverHeader>
									Selector de emojis
								</PopoverHeader>
								<PopoverBody>
									Aun no hay ninguno (Por ahora)
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</Center>
				</Flex>
			</Flex>
		</Box>
	);
}
