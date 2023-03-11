'use client';

import { useFilePicker } from 'use-file-picker';
import { IDirectMessageChannel } from '@/types/interfaces/Channel';
import {
	Input,
	Box,
	useColorMode,
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

export type InputBoxProps = {
	channel: IDirectMessageChannel;
};

export default function InputBox({ channel }: InputBoxProps) {
	const { colorMode } = useColorMode();
	const [openFileSelector /*{ filesContent, loading }*/] = useFilePicker({});

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			const content = event.target.value;

			console.log(content);
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
						placeholder={`Message @${channel.recipient.username}`}
						focusBorderColor={`${colorMode}.primary.focusBorderColor`}
						autoFocus={true}
						onKeyDown={handleKeyDown}
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
								bg={`${colorMode}.primary.sidebarContent`}
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
