'use client';

import useColorValue from '@/hooks/useColorValue';
import { MessageModes } from '@/types/enums/MessageModes';
import { IMessage } from '@/types/interfaces/Message';
import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../user/Avatar';

export type MessageProps = {
	message: IMessage;
};

export default function Message({ message }: MessageProps) {
	const { getColorValue } = useColorValue();

	return (
		<Box
			w="100%"
			padding="8px 20px 8px 20px"
			_hover={{
				bg: getColorValue('messageHover'),
			}}
		>
			<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
				<Avatar
					size="42"
					src={message.author.avatar}
					alt={`Avatar de ${message.author.username}`}
				/>

				<Box textAlign="left">
					<Text className="text-bold" fontSize="md">
						{message.author.username}
					</Text>
					<Text
						fontSize="md"
						color={
							message.mode === MessageModes.Sent
								? getColorValue('textColor')
								: getColorValue('textMutedColor')
						}
					>
						{message.content}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
}
