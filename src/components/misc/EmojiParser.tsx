import Image from 'next/image';
import React, { memo } from 'react';
import twemoji from 'twemoji';

const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

function EmojiParser({
	emoji,
	ext = 'svg',
	width = 72,
	height = 72
}: Readonly<{
	emoji: string;
	ext?: 'svg' | 'png';
	width?: number;
	height?: number;
}>) {
	const HEXCodePoint = twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji);

	return (
		<Image
			src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/${
				ext === 'png' ? '72x72' : 'svg'
			}/${HEXCodePoint}.${ext}`}
			width={width}
			height={height}
			alt={emoji}
			draggable={false}
			unoptimized
		/>
	);
}

export default memo(EmojiParser);
