import { Flex } from '@chakra-ui/react';
import emoji from 'react-easy-emoji';
import EmojiParser from './EmojiParser';

export default function TextEmoji({
	children,
	size,
	...props
}: Readonly<{
	children: string | string[];
	size: number;
	[props: string]: any;
}>) {
	return (
		<Flex gap='1px' flexWrap='wrap' alignItems='center' whiteSpace='pre-wrap' w='100%' h='100%' {...props}>
			{emoji(children, (code, string, offset) => {
				return <EmojiParser width={size} height={size} emoji={string} key={offset} />;
			})}
		</Flex>
	);
}
