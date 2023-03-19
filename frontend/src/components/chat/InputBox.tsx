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

export type InputBoxProps = {
	channel: IChannel;
};

export default function InputBox({ channel }: InputBoxProps) {
	const [openFileSelector /*{ filesContent, loading }*/] = useFilePicker({});
	const { getColorValue } = useColorValue();

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
						placeholder={`Message @${
							channel.type === ChannelTypes.DirectMessage
								? channel.recipient.username
								: channel.name
						}`}
						focusBorderColor={getColorValue('focusBorderColor')}
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
