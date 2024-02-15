'use client';

import ky from 'ky';
import { useFilePicker } from 'use-file-picker';
import type { Channel } from '@/types/interfaces/Channel';
import {
	Box,
	Flex,
	Center,
	IconButton,
	Textarea,
	Image,
	Spacer,
	useEventListener,
	useDisclosure,
} from '@chakra-ui/react';
import {
	MdAddCircle,
	MdAudioFile,
	MdEmojiEmotions,
	MdFilePresent,
	MdSend,
	MdVideoFile,
} from 'react-icons/md';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import useThemeColors from '@/hooks/useThemeColors';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	modifyMessage,
	setMessageInput,
} from '@/store/slices/chatsSlice';
import type { RootState } from '@/store';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { MessageModes } from '@/types/enums/MessageModes';
import normalizeMessage from '@/util/normalizeMessage';
import { useEffect, useRef, useState } from 'react';
import OverflownText from '../misc/OverflownText';
import { client } from '@/client';
import EmojiPicker from '../popovers/EmojiPicker';
import ChatEmojiPicker from '../popovers/ChatEmojiPicker';
import useDevice from '@/hooks/useDevice';

export type InputBoxProps = {
	channel: Channel;
};

export default function InputArea({ channel }: InputBoxProps) {
	const [openFileSelector, { filesContent }] = useFilePicker({
		readAs: 'DataURL',
		limitFilesConfig: { min: 1 },
	});
	const { isMobile } = useDevice();
	const { getColorValue } = useThemeColors();
	const dispatch = useDispatch();
	const recipient = client.users.resolve(
		channel.type === ChannelTypes.DirectMessage ? channel.recipient : ''
	);
	const [emojiSearchInput, setEmojiSearchInput] = useState<string | null>(
		null
	);
	const chatsState = useSelector((state: RootState) => state.chats);
	const inputRef = useRef<null | any>(null);
	const currentInput = chatsState.inputs[channel.id];
	const inputContent = currentInput?.content ?? '';
	const numberOfLines = inputContent.split('\n').length;
	const inputAttachments = currentInput?.attachments ?? [];

	const {
		isOpen: isChatEmojiPickerOpen,
		onOpen: onChatEmojiPickerOpen,
		onClose: onChatEmojiPickerClose,
	} = useDisclosure();

	useEffect(() => {
		dispatch(
			setMessageInput({
				channelId: channel.id,
				input: {
					content: currentInput?.content ?? '',
					attachments: [
						...(currentInput?.attachments ?? []),
						...filesContent,
					],
				},
			})
		);
	}, [filesContent]);

	useEffect(() => {
		inputRef.current.setSelectionRange(
			inputRef.current.value.length,
			inputRef.current.value.length
		);
	}, []);

	const handleKeyDown = (event: any) => {
		const content = event.target.value.trim();

		if (
			event.key === 'Enter' &&
			!event.shiftKey &&
			!isMobile &&
			(content || inputAttachments.length)
		) {
			event.preventDefault();
			handleSend(content, inputAttachments);
		} else if (event.key === 'Enter' && !event.shiftKey) {
			if (!isMobile) event.preventDefault();
		}
	};

	useEventListener('keydown', (e) => {
		if (!isChatEmojiPickerOpen) {
			const ignore = ['INPUT', 'TEXTAREA'];

			if (!ignore.includes(document.activeElement?.tagName ?? '')) {
				if ((!e.ctrlKey && e.key.length === 1) || e.key === 'Backspace')
					inputRef.current.focus();
				if (e.key === 'Enter' && !e.shiftKey)
					handleSend(inputContent, inputAttachments);
			}
		}
	});

	async function handleSend(
		rawContent: string,
		rawAttachments: any[]
	) {
		if (!isChatEmojiPickerOpen) {
			const content = rawContent.trim();

			onChatEmojiPickerClose();

			if (!content && !rawAttachments.length) return;

			dispatch(
				setMessageInput({
					channelId: channel.id,
					input: { content: '', attachments: [] },
				})
			);

			const tempMessageId = `${Math.random() * 1000}`;

			const rawMessage = {
				type: MessageTypes.Text,
				mode: MessageModes.Sending,
				id: tempMessageId,
				nonce: tempMessageId,
				channelId: channel.id,
				content: content,
				author: client.user.id,
				timestamp: Date.now(),
			};
			dispatch(
				addMessage({
					channelId: channel.id,
					message: normalizeMessage(rawMessage),
				})
			);

			client.sentMessagesIds.push(tempMessageId);

			await ky
				.post(`${client.links.api}/channels/${channel?.id}/messages`, {
					content: content,
					nonce: tempMessageId,
				})
				.then((result) => {
					dispatch(
						modifyMessage({
							channelId: rawMessage.channelId,
							messageId: rawMessage.id,
							newMessage: normalizeMessage({
								...rawMessage,
								mode: MessageModes.Sent,
								id: result.data.id,
							}),
						})
					);
				})
				.catch(() => {
					dispatch(
						modifyMessage({
							channelId: rawMessage.channelId,
							messageId: rawMessage.id,
							newMessage: normalizeMessage({
								...rawMessage,
								mode: MessageModes.Blocked,
							}),
						})
					);
				});
		}
	}

	const handleChange = (event: any) => {
		const content = event.target.value;

		handleEmojiPickerChange(event);

		dispatch(
			setMessageInput({
				channelId: channel.id,
				input: {
					content: content,
					attachments: currentInput?.attachments ?? [],
				},
			})
		);
	};

	const handleEmojiPickerChange = (event: any) => {
		const content = event.target.value as string;

		if (content.includes(':')) {
			const spacedContent = content.split(' ');

			let selectedWord = '';

			let length = 0;

			spacedContent.every((word, i) => {
				length += word.length + 1;

				if (length >= event.target.selectionStart) {
					selectedWord = word;
					return false;
				}

				return true;
			});

			if (
				selectedWord.startsWith(':') &&
				!selectedWord.endsWith(':') &&
				selectedWord.split(':').length === 2
			) {
				const searchInput = selectedWord.replaceAll(':', '');

				setEmojiSearchInput(searchInput);

				if (!isChatEmojiPickerOpen && searchInput.length > 1) {
					onChatEmojiPickerOpen();
				}
			} else {
				if (isChatEmojiPickerOpen) onChatEmojiPickerClose();
			}
		} else {
			if (isChatEmojiPickerOpen) onChatEmojiPickerClose();
		}
	};

	function handleChatEmojiSelect(emoji: string) {
		const input = inputRef.current;
		const content = input.value as string;

		const spacedContent = content.split(' ');

		let length = 0;

		spacedContent.every((word, i) => {
			length += word.length + 1;

			if (length >= input.selectionStart) {
				spacedContent[i] = `${emoji} `;
				return false;
			}

			return true;
		});

		dispatch(
			setMessageInput({
				channelId: channel.id,
				input: {
					content: spacedContent.join(' '),
					attachments: [...(currentInput?.attachments ?? [])],
				},
			})
		);
	}

	const fileIcons = [
		{
			type: [
				'webm',
				'mkv',
				'flv',
				'flv',
				'vob',
				'ogv',
				'ogg',
				'drc',
				'mng',
				'avi',
				'MTS',
				'M2TS',
				'TS',
				'mov',
				'qt',
				'wmv',
				'yuv',
				'rm',
				'rmvb',
				'viv',
				'asf',
				'amv',
				'mp4',
				'm4p ',
				'm4v',
				'mpg',
				'mp2',
				'mpeg',
				'mpe',
				'mpv',
				'mpg',
				'mpeg',
				'm2v',
				'm4v',
				'svi',
				'3gp',
				'3g2',
				'mxf',
				'roq',
				'nsv',
				'flv',
				'f4v',
				'f4p',
				'f4a',
				'f4b',
			],
			icon: <MdVideoFile size="100%" />,
		},
		{
			type: [
				'wv',
				'wma',
				'wav',
				'vox',
				'voc',
				'tta',
				'sln',
				'rf64',
				'raw',
				'ra',
				'rm',
				'opus',
				'ogg',
				'oga',
				'mogg',
				'nmf',
				'msv',
				'mpc',
				'mp3',
				'mmf',
				'm4p',
				'm4b',
				'm4a',
				'ivs',
				'iklax',
				'gsm',
				'flac',
				'dvf',
				'dss',
				'cda',
				'awb',
				'au',
				'ape',
				'amr',
				'alac',
				'aiff',
				'act',
				'aax',
				'aac',
				'aa',
				'8svx',
				'3gp',
			],
			icon: <MdAudioFile size="100%" />,
		},
	];

	return (
		<Box
			bg={getColorValue('secondaryBackground')}
			w="100%"
			padding="15px 20px 15px 20px"
		>
			<Box overflow="auto" h="100%" maxH="60vh">
				<Flex direction="column" overflow="auto" gap="20px" w="100%">
					{inputAttachments.length ? (
						<Flex overflow="auto" direction="column">
							<Flex gap="20px" overflow="auto">
								{inputAttachments.map((file, i) => {
									const fileExtension =
										file.name.split('.').pop() ?? '';

									return (
										<Box
											w="200px"
											h="240px"
											objectFit="cover"
											bg={getColorValue(
												'primaryBackground'
											)}
											borderRadius="10px"
											padding="20px"
											key={`${file.name}-${i}`}
										>
											<Flex
												direction="column"
												h="100%"
												w="100%"
												gap="5px"
											>
												<Image
													h="100%"
													w="100%"
													fit="cover"
													borderRadius="10px"
													fallback={
														<Box padding="20px">
															{fileIcons.find(
																(file) =>
																	file.type.includes(
																		fileExtension
																	)
															)?.icon ?? (
																<MdFilePresent size="100%" />
															)}
														</Box>
													}
													alt={file.name}
													src={file.content}
												/>
												<Spacer />
												<OverflownText>
													{file.name}
												</OverflownText>
											</Flex>
										</Box>
									);
								})}
							</Flex>
						</Flex>
					) : null}
					<Flex h="100%" w="100%" gap="24px">
						<Flex gap="24px" paddingTop="6px">
							<IconButton
								aria-label="Add attachments"
								bg="transparent"
								size="sm"
								fontSize="24px"
								icon={<MdAddCircle />}
								onClick={() => {
									openFileSelector();
									inputRef.current.focus();
								}}
							/>
						</Flex>
						<Center w="100%">
							<ChatEmojiPicker
								onEmojiSelect={handleChatEmojiSelect}
								searchInput={emojiSearchInput}
								isOpen={isChatEmojiPickerOpen}
								onClose={onChatEmojiPickerClose}
							>
								<Textarea
									autoFocus={isMobile ? false : true}
									placeholder={`Message @${
										channel.type ===
										ChannelTypes.DirectMessage
											? recipient.username
											: channel.name
									}`}
									rows={
										numberOfLines >
										(inputAttachments.length ? 10 : 22)
											? inputAttachments.length
												? 10
												: 22
											: numberOfLines
									}
									maxH="50vh"
									h={numberOfLines > 1 ? '100%' : '45px'}
									minH="45px"
									size="md"
									resize="none"
									focusBorderColor={getColorValue(
										'focusBorderColor'
									)}
									onKeyDown={handleKeyDown}
									onChange={handleChange}
									value={inputContent}
									ref={inputRef}
								/>
							</ChatEmojiPicker>
						</Center>
						<Flex gap="24px" paddingTop="6px">
							<EmojiPicker
								channelId={channel.id}
								inputRef={inputRef}
							>
								<IconButton
									aria-label="Add emojis"
									bg="transparent"
									size="sm"
									fontSize="24px"
									icon={<MdEmojiEmotions />}
								/>
							</EmojiPicker>
						</Flex>
						{isMobile && (
							<Flex gap="24px" paddingTop="6px">
								<IconButton
									aria-label="Send message"
									bg="transparent"
									size="sm"
									fontSize="24px"
									icon={<MdSend />}
									onClick={() =>
										handleSend(
											inputContent,
											inputAttachments
										)
									}
								/>
							</Flex>
						)}
					</Flex>
				</Flex>
			</Box>
		</Box>
	);
}
