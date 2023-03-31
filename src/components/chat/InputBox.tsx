'use client';

import { FileContent, useFilePicker } from 'use-file-picker';
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
	Image,
	Spacer,
} from '@chakra-ui/react';
import {
	MdAddCircle,
	MdAudioFile,
	MdEmojiEmotions,
	MdFilePresent,
	MdSend,
	MdVideoFile,
} from 'react-icons/md';
import axios from 'axios';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import useThemeColors from '@/hooks/useThemeColors';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	modifyMessage,
	setMessageInput,
} from '@/store/slices/chatsSlice';
import { RootState } from '@/store';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { MessageModes } from '@/types/enums/MessageModes';
import normalizeMessage from '@/util/normalizeMessage';
import { useEffect, useRef } from 'react';
import OverflownText from '../general/OverflownText';
import { client } from '@/client';
import EmojiPicker from './EmojiPicker';

export type InputBoxProps = {
	channel: IChannel;
};

export default function InputBox({ channel }: InputBoxProps) {
	const [openFileSelector, { filesContent }] = useFilePicker({
		readAs: 'DataURL',
		limitFilesConfig: { min: 1 },
	});
	const { getColorValue } = useThemeColors();
	const dispatch = useDispatch();

	const directChannelsState = useSelector(
		(state: RootState) => state.directChannels
	);

	const recipient = client.users.resolve(
		channel.type === ChannelTypes.DirectMessage ? channel.recipient : ''
	);

	const chatsState = useSelector((state: RootState) => state.chats);

	const inputRef = useRef<null | any>(null);

	const selectedChannelId = directChannelsState.selectedChannelId;

	const currentInput = chatsState.inputs[selectedChannelId ?? ''];

	const inputContent = currentInput?.content ?? '';

	const numberOfLines = inputContent.split('\n').length;

	const inputAttachments = currentInput?.attachments ?? [];

	useEffect(() => {
		inputRef.current?.scrollIntoView({ behavior: 'smooth' });

		if (isMobile)
			setTimeout(() => {
				inputRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 550);
	}, []);

	useEffect(() => {
		if (!selectedChannelId) return;

		dispatch(
			setMessageInput({
				channelId: selectedChannelId,
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

	async function handleSend(
		rawContent: string,
		rawAttachments: FileContent[]
	) {
		const content = rawContent.trim();

		if (!content && !rawAttachments.length) return;

		const selectedChannelId = directChannelsState.selectedChannelId;

		if (!selectedChannelId) return;

		dispatch(
			setMessageInput({
				channelId: selectedChannelId,
				input: { content: '', attachments: [] },
			})
		);

		const tempMessageId = `${Math.random() * 1000}`;

		const rawMessage = {
			type: MessageTypes.Text,
			mode: MessageModes.Sending,
			id: tempMessageId,
			nonce: tempMessageId,
			channelId: selectedChannelId,
			content: content,
			author: client.user.id,
			timestamp: Date.now(),
		};

		console.log('sent', selectedChannelId, rawMessage);

		dispatch(
			addMessage({
				channelId: selectedChannelId,
				message: normalizeMessage(rawMessage),
			})
		);

		client.sentMessagesIds.push(tempMessageId);

		await axios
			.post(
				`http://localhost:3002/api/channels/${channel?.id}/messages`,
				{
					content: content,
					nonce: tempMessageId,
				}
			)
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

	const handleChange = (event: any) => {
		if (directChannelsState.selectedChannelId) {
			dispatch(
				setMessageInput({
					channelId: directChannelsState.selectedChannelId,
					input: {
						content: event.target.value,
						attachments: currentInput?.attachments ?? [],
					},
				})
			);
		}
	};

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
								onClick={openFileSelector}
							/>
						</Flex>
						<Center w="100%">
							<Textarea
								placeholder={`Message @${
									channel.type === ChannelTypes.DirectMessage
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
								autoFocus={true}
								value={inputContent}
								ref={inputRef}
							/>
						</Center>
						<Flex gap="24px" paddingTop="6px">
							<EmojiPicker />
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
