'use client';

import { IMessage } from '@/types/interfaces/Message';
import { Box, Flex, Text } from '@chakra-ui/react';
import Avatar from '../user/Avatar';
import styles from '../../styles/Message.module.scss';

export type MessageProps = {
	message: IMessage;
};

export default function Message({ message }: MessageProps) {
	return (
		<Box w="100%" padding="8px 20px 8px 20px" className={styles.messageBox}>
			<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
				<Avatar
					size="42"
					src={message.author.avatarId ?? ''}
					alt="Avatar perron"
				/>
				
				<Box textAlign="left">
					<Text as="b" fontSize="md">
						{message.author.username}
					</Text>
					<Text as="p" fontSize="md">
						{message.content}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
}
