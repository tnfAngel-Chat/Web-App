'use client';

import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import type { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import type { ReactNode } from 'react';

export type AvatarProps = {
	src: string;
	alt: string;
	size: SafeNumber;
	quality?: SafeNumber;
	status?: UserStatusTypes;
	indicator?: ReactNode;
	onClick?: any;
};

export default function Avatar({ src, alt, size, quality, indicator, onClick }: Readonly<AvatarProps>) {
	return (
		<Box
			height={`${size}px`}
			width={`${size}px`}
			onClick={onClick}
			_hover={{ cursor: onClick ? 'pointer' : 'inherit' }}
		>
			<Image
				src={src}
				width={size}
				height={size}
				style={{
					width: `${size}px`,
					height: `${size}px`,
					borderRadius: '50%',
					objectFit: 'cover',
					userSelect: 'none'
				}}
				quality={quality || 100}
				alt={alt}
				unoptimized
			/>
			{indicator || null}
		</Box>
	);
}
