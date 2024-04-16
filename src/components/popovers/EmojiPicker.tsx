import { type Emoji, emojis } from '@/constants/emojis';
import useThemeColors from '@/hooks/useThemeColors';
import type { RootState } from '@/store';
import { appendMessageInput } from '@/store/slices/chatsSlice';
import { addRecentEmoji } from '@/store/slices/recentEmojisSlice';
import {
	Box,
	Center,
	CloseButton,
	Flex,
	IconButton,
	Input,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
	MdEmojiEmotions,
	MdEmojiEvents,
	MdEmojiFlags,
	MdEmojiFoodBeverage,
	MdEmojiNature,
	MdEmojiObjects,
	MdEmojiPeople,
	MdEmojiSymbols,
	MdEmojiTransportation,
	MdHistory,
	MdSearch
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import EmojiParser from '../misc/EmojiParser';
import OverflownText from '../misc/OverflownText';

export function EmojisTab({
	tabEmojis,
	channelId,
	selectedEmoji,
	setSelectedEmoji,
	onClose
}: Readonly<{
	tabEmojis: Emoji[];
	channelId: string;
	selectedEmoji: any;
	setSelectedEmoji: any;
	onClose: any;
}>) {
	const { getColorValue } = useThemeColors();
	const dispatch = useDispatch();

	return (
		<Box h='30vh' w='100%' overflow='auto'>
			<Wrap w='100%' spacing='10px'>
				{tabEmojis.map((e) => (
					<WrapItem
						bg={e.emoji === selectedEmoji?.emoji ? getColorValue('sidebarButtonActive') : 'transparent'}
						w='42px'
						h='42px'
						fontSize='22px'
						textAlign='center'
						key={e.description}
						padding='6px'
						borderRadius='5px'
						onClick={(ev) => {
							if (!ev.shiftKey) onClose();

							dispatch(
								appendMessageInput({
									channelId: channelId,
									input: {
										content: `${e.emoji} `,
										attachments: []
									}
								})
							);

							dispatch(addRecentEmoji(e.emoji));
						}}
						onMouseEnter={() => setSelectedEmoji(e)}
					>
						<Center w='100%' h='100%'>
							<EmojiParser emoji={e.emoji} />
						</Center>
					</WrapItem>
				))}
			</Wrap>
		</Box>
	);
}

const groupedEmojis: Emoji[][] = [];

const groupCategories = new Set<string>(['Recent']);

emojis.forEach((emoji) => {
	groupCategories.add(emoji.category);
});

let i = 0;

for (const category of groupCategories) {
	groupedEmojis[i] = emojis.filter((emoji) => emoji.category === category);
	i++;
}

const categoryIcons = [
	<MdHistory fontSize='25px' key='0' />,
	<MdEmojiEmotions fontSize='25px' key='1' />,
	<MdEmojiPeople fontSize='25px' key='2' />,
	<MdEmojiNature fontSize='25px' key='3' />,
	<MdEmojiFoodBeverage fontSize='25px' key='4' />,
	<MdEmojiTransportation fontSize='25px' key='5' />,
	<MdEmojiEvents fontSize='25px' key='6' />,
	<MdEmojiObjects fontSize='25px' key='7' />,
	<MdEmojiSymbols fontSize='25px' key='8' />,
	<MdEmojiFlags fontSize='25px' key='9' />
];

export default function EmojiPicker({
	children,
	channelId,
	inputRef
}: Readonly<{
	children: any;
	channelId: string;
	inputRef: any;
}>) {
	const recentEmojisState = useSelector((state: RootState) => state.recentEmojis);
	const recentEmojisSorted = Object.entries(recentEmojisState.emojis).sort((a, b) => b[1] - a[1]);
	const recentEmojis = recentEmojisSorted.map((pair) => emojis.find((e) => e.emoji === pair[0])) as Emoji[];

	groupedEmojis[0] = recentEmojis;

	const [searchInput, setSearchInput] = useState('');
	const [selectedEmoji, setSelectedEmoji] = useState<Emoji | undefined>(groupedEmojis[0][0] ?? undefined);
	const { getColorValue } = useThemeColors();
	const initialFocusRef = useRef<any>();

	return (
		<Popover placement='top-end' isLazy initialFocusRef={initialFocusRef} onClose={() => inputRef.current?.focus()}>
			{({ isOpen, onClose }) => (
				<>
					{!isOpen && searchInput && setSearchInput('')}
					<PopoverTrigger>{children}</PopoverTrigger>
					<PopoverContent
						w={['100vw', 'md']}
						backdropFilter='blur(5px)'
						bg={getColorValue('sidebarBackground')}
					>
						<PopoverCloseButton />
						<PopoverHeader>Select emojis</PopoverHeader>
						<PopoverBody>
							<Stack>
								<Flex gap='10px' alignItems='center'>
									<Input
										ref={initialFocusRef}
										placeholder='Search for emoji'
										focusBorderColor={getColorValue('focusBorderColor')}
										value={searchInput}
										onChange={(e) => setSearchInput(e.target.value)}
									/>
									{searchInput ? (
										<CloseButton size='lg' onClick={() => setSearchInput('')} />
									) : (
										<IconButton
											aria-label='Search'
											bg='transparent'
											fontSize='24px'
											icon={<MdSearch />}
										/>
									)}
								</Flex>
								<Tabs
									isLazy
									isFitted
									variant='unstyled'
									position='relative'
									colorScheme={getColorValue('textColor')}
								>
									<Box overflowX='auto'>
										<TabList>
											{Object.keys(groupedEmojis).map((emojiIndex: any) => (
												<Tab
													_hover={{
														bg: getColorValue('sidebarButtonActive')
													}}
													borderRadius='5px'
													padding='10px 0px 10px 0px'
													key={emojiIndex}
												>
													{categoryIcons[emojiIndex]}
												</Tab>
											))}
										</TabList>
										<TabIndicator
											mt='2px'
											height='2px'
											bg={getColorValue('textColor')}
											borderRadius='1px'
										/>
									</Box>
									<TabPanels>
										{groupedEmojis.map((group, i) => (
											<TabPanel padding='10px 0px 0px 0px' key={i}>
												<Stack>
													{searchInput ? (
														<>
															<OverflownText>Resultados de búsqueda</OverflownText>
															<EmojisTab
																tabEmojis={emojis
																	.filter(
																		(e) =>
																			e.description
																				.toLowerCase()
																				.includes(searchInput.toLowerCase()) ||
																			e.aliases.find((a) =>
																				a.includes(searchInput.toLowerCase())
																			) ||
																			e.tags.find((a) =>
																				a.includes(searchInput.toLowerCase())
																			)
																	)
																	.sort((a, b) => {
																		if (
																			a.aliases.find((al) =>
																				al.startsWith(searchInput.toLowerCase())
																			)
																		) {
																			return -1;
																		} else if (
																			b.aliases.find((al) =>
																				al.startsWith(searchInput.toLowerCase())
																			)
																		) {
																			return 1;
																		} else {
																			return 0;
																		}
																	})
																	.slice(0, 50)}
																channelId={channelId}
																selectedEmoji={selectedEmoji}
																setSelectedEmoji={setSelectedEmoji}
																onClose={onClose}
															/>
														</>
													) : (
														<>
															<OverflownText>{[...groupCategories][i]}</OverflownText>
															<EmojisTab
																tabEmojis={group}
																channelId={channelId}
																selectedEmoji={selectedEmoji}
																setSelectedEmoji={setSelectedEmoji}
																onClose={onClose}
															/>
														</>
													)}
													{selectedEmoji && (
														<Flex alignItems='center' gap='10px'>
															<Center h='100%'>
																<EmojiParser
																	emoji={selectedEmoji.emoji}
																	width={32}
																	height={32}
																/>
															</Center>
															<Center minW='0px'>
																<OverflownText>
																	{selectedEmoji.aliases
																		.map((alias) => `:${alias}:`)
																		.join(' ')}
																</OverflownText>
															</Center>
														</Flex>
													)}
												</Stack>
											</TabPanel>
										))}
									</TabPanels>
								</Tabs>
							</Stack>
						</PopoverBody>
					</PopoverContent>
				</>
			)}
		</Popover>
	);
}
