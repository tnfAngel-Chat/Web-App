import useThemeColors from '@/hooks/useThemeColors';
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
	MdSearch,
} from 'react-icons/md';
import {
	Tab,
	Tabs,
	Box,
	Flex,
	Wrap,
	Input,
	Stack,
	Center,
	TabList,
	Popover,
	WrapItem,
	TabPanel,
	TabPanels,
	IconButton,
	PopoverBody,
	PopoverHeader,
	PopoverTrigger,
	PopoverContent,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { type Emoji, emojis } from '@/constants/emojis';
import EmojiParser from '../general/EmojiParser';
import OverflownText from '../general/OverflownText';

export function EmojiTab({ tabEmojis }: { tabEmojis: Emoji[] }) {
	const { getColorValue } = useThemeColors();

	return (
		<Box h="250px" w="100%" overflow="auto">
			<Wrap w="100%" spacing="12px">
				{tabEmojis.map((emoji) => (
					<WrapItem
						bg="transparent"
						_hover={{
							bg: getColorValue('sideBarButtonActive'),
						}}
						w="42px"
						h="42px"
						fontSize="22px"
						textAlign="center"
						key={emoji.description}
						padding="6px"
						borderRadius="5px"
					>
						<Center w="100%" h="100%">
							<EmojiParser emoji={emoji.emoji} />
						</Center>
					</WrapItem>
				))}
			</Wrap>
		</Box>
	);
}

const groupedEmojis: Emoji[][] = [];

const groupCategories = new Set<string>();

emojis.forEach((emoji) => {
	groupCategories.add(emoji.category);
});

let i = 0;

for (const category of [...groupCategories]) {
	groupedEmojis[i] = emojis.filter((emoji) => emoji.category === category);
	i++;
}

const categoryIcons = [
	<MdEmojiEmotions fontSize="25px" key="1" />,
	<MdEmojiPeople fontSize="25px" key="2" />,
	<MdEmojiNature fontSize="25px" key="3" />,
	<MdEmojiFoodBeverage fontSize="25px" key="4" />,
	<MdEmojiTransportation fontSize="25px" key="5" />,
	<MdEmojiEvents fontSize="25px" key="6" />,
	<MdEmojiObjects fontSize="25px" key="7" />,
	<MdEmojiSymbols fontSize="25px" key="8" />,
	<MdEmojiFlags fontSize="25px" key="9" />,
];

export default function EmojiPicker() {
	const { getColorValue } = useThemeColors();

	return (
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
				w="460px"
				backdropFilter="blur(5px)"
				bg={getColorValue('primaryBackground')}
			>
				<PopoverCloseButton />
				<PopoverHeader>Seleccionar emojis</PopoverHeader>
				<PopoverBody>
					<Stack>
						<Flex gap="10px" alignItems="center">
							<Input
								placeholder="Search for emoji"
								focusBorderColor={getColorValue(
									'focusBorderColor'
								)}
							/>
							<IconButton
								aria-label="Search emojis"
								bg="transparent"
								fontSize="24px"
								icon={<MdSearch />}
							/>
						</Flex>
						<Tabs
							isLazy
							isFitted
							colorScheme={getColorValue('textColor')}
						>
							<TabList>
								{Object.keys(groupedEmojis).map(
									(emojiIndex) => (
										<Tab padding="10px 0px 10px 0px" key={emojiIndex}>
											{
												categoryIcons[
													emojiIndex as any as number
												]
											}
										</Tab>
									)
								)}
							</TabList>
							<TabPanels>
								{groupedEmojis.map((group, i) => (
									<TabPanel padding="5px 0px 0px 0px" key={i}>
										<Stack>
											<OverflownText>
												{[...groupCategories][i]}
											</OverflownText>
											<EmojiTab tabEmojis={group} />
										</Stack>
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</Stack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
