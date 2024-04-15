import { type Emoji, emojis } from '@/constants/emojis';
import useThemeColors from '@/hooks/useThemeColors';
import { addRecentEmoji } from '@/store/slices/recentEmojisSlice';
import {
	Flex,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	useEventListener
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EmojiParser from '../misc/EmojiParser';
import OverflownText from '../misc/OverflownText';

export function EmojiSelector({
	displayEmojis,
	selectedEmojiIndex,
	setSelectedEmojiIndex,
	onEmojiSelect,
	onClose
}: Readonly<{
	displayEmojis: Emoji[];
	selectedEmojiIndex: any;
	setSelectedEmojiIndex: any;
	onEmojiSelect: any;
	onClose: any;
}>) {
	const { getColorValue } = useThemeColors();
	const dispatch = useDispatch();

	return (
		<Stack spacing='5px' maxH='35vh' w='100%' overflowY='auto'>
			{displayEmojis.map((e, i) => {
				const isActive = i === selectedEmojiIndex;

				return (
					<Flex
						bg={isActive ? getColorValue('sidebarButtonActive') : 'transparent'}
						h='42px'
						alignItems='center'
						key={e.description}
						gap='8px'
						padding='5px'
						borderRadius='5px'
						onClick={() => {
							onClose();

							onEmojiSelect(e.emoji);

							dispatch(addRecentEmoji(e.emoji));
						}}
						onMouseEnter={() => setSelectedEmojiIndex(i)}
					>
						<EmojiParser width={28} height={28} emoji={e.emoji} />
						<OverflownText>{e.aliases.map((alias) => `:${alias}:`).join(' ')}</OverflownText>
					</Flex>
				);
			})}
		</Stack>
	);
}

export default function ChatEmojiPicker({
	children,
	isOpen,
	onClose,
	searchInput,
	onEmojiSelect
}: Readonly<{
	children: any;
	isOpen: boolean;
	onClose: any;
	searchInput: string | null;
	onEmojiSelect: any;
}>) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();

	const results = searchInput
		? emojis
				.filter(
					(e) =>
						e.description.toLowerCase().includes(searchInput.toLowerCase()) ||
						e.aliases.find((a) => a.includes(searchInput.toLowerCase())) ||
						e.tags.find((a) => a.includes(searchInput.toLowerCase()))
				)
				.sort((a, b) => {
					if (a.aliases.find((al) => al.startsWith(searchInput.toLowerCase()))) {
						return -1;
					} else if (b.aliases.find((al) => al.startsWith(searchInput.toLowerCase()))) {
						return 1;
					} else {
						return 0;
					}
				})
				.slice(0, 7)
		: [];

	if (!results.length) {
		onClose();
	}

	const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number>(0);

	useEventListener('keydown', (e) => {
		if (results.length) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();

				const res = selectedEmojiIndex + 1;

				setSelectedEmojiIndex(res >= results.length ? 0 : res);
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();

				const res = selectedEmojiIndex - 1;

				setSelectedEmojiIndex(res < 0 ? results.length - 1 : res);
			}

			if (e.key === 'Enter') {
				const emoji = results[selectedEmojiIndex];

				onClose();

				if (emoji) {
					onEmojiSelect(emoji.emoji);

					dispatch(addRecentEmoji(emoji.emoji));
				}
			}
		}
	});

	return (
		<Popover
			onOpen={() => setSelectedEmojiIndex(0)}
			placement='top-start'
			autoFocus={false}
			onClose={onClose}
			isOpen={isOpen}
			isLazy
		>
			{({ onClose }) => (
				<>
					<PopoverTrigger>{children}</PopoverTrigger>
					{results.length ? (
						<PopoverContent
							w={['100vw', 'md']}
							backdropFilter='blur(5px)'
							bg={getColorValue('sidebarBackground')}
						>
							<PopoverCloseButton />
							<PopoverHeader>Emojis que coinciden con {searchInput}</PopoverHeader>
							<PopoverBody>
								{searchInput ? (
									<EmojiSelector
										displayEmojis={results}
										selectedEmojiIndex={selectedEmojiIndex}
										setSelectedEmojiIndex={setSelectedEmojiIndex}
										onClose={onClose}
										onEmojiSelect={onEmojiSelect}
									/>
								) : null}
							</PopoverBody>
						</PopoverContent>
					) : null}
				</>
			)}
		</Popover>
	);
}
