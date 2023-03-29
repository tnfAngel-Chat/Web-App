'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { MessageModes } from '@/types/enums/MessageModes';
import { IMessage } from '@/types/interfaces/Message';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import TextDate from '../misc/TextDate';
import Avatar from '../user/Avatar';

export type MessageProps = {
	message: IMessage;
	headless?: boolean;
	onShowAuthor?: any;
};

export function HeadlessAvatarSpace() {
	return (
		<Box>
			<Box w="42px" />
		</Box>
	);
}

export function AvatarSpaceDate({ timestamp }: { timestamp: number }) {
	return (
		<Center w="42px" h="22px">
			<TextDate timestamp={timestamp} fontSize="10px" long={false} />
		</Center>
	);
}

export default function Message({
	message,
	headless,
	onShowAuthor,
}: MessageProps) {
	const { getColorValue } = useThemeColors();
	const [isHovering, setHovering] = useState(false);

	return (
		<Box
			padding="3px 20px 3px 20px"
			_hover={{
				bg: getColorValue('messageHover'),
			}}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<Flex flex="1" gap="4" alignItems="start">
				{headless ? (
					isHovering ? (
						<Center h="100%">
							<AvatarSpaceDate timestamp={message.timestamp} />
						</Center>
					) : (
						<HeadlessAvatarSpace />
					)
				) : (
					<Box paddingTop="2px">
						<Avatar
							size="42"
							src={message.author.avatar}
							alt={`Avatar de ${message.author.username}`}
							onClick={onShowAuthor}
						/>
					</Box>
				)}
				<Box textAlign="left">
					{headless ? null : (
						<Flex gap="6px" alignItems="center">
							<Text
								className="text-bold"
								fontSize="md"
								onClick={onShowAuthor}
								_hover={{
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
							>
								{message.author.username}
							</Text>
							<TextDate
								timestamp={message.timestamp}
								fontSize="10px"
								long={true}
							/>
						</Flex>
					)}
					{message.content.split('\n').map((line, i) => {
						const lineKey = `${message.id}-${i}`;

						return (
							<Text
								key={lineKey}
								fontSize="md"
								whiteSpace="initial"
								color={
									message.mode === MessageModes.Sent
										? getColorValue('textColor')
										: getColorValue('textMutedColor')
								}
							>
								{line}
							</Text>
						);
					})}
				</Box>
			</Flex>
		</Box>
	);
}