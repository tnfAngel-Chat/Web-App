'use client';

import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from '../../styles/Avatar.module.scss';

export type AvatarProps = {
	src: string;
	alt: string;
	size: SafeNumber;
	quality?: SafeNumber;
	status?: UserStatusTypes;
	indicator?: ReactNode;
};

export default function Avatar({
	src,
	alt,
	size,
	quality,
	indicator,
}: AvatarProps) {
	return (
		<Box
			height={`${size}px`}
			width={`${size}px`}
			className={styles.avatarBox}
		>
			<Image
				className={styles.avatar}
				src={src}
				width={size}
				height={size}
				style={{
					width: `${size}px`,
					height: `${size}px`,
				}}
				quality={quality || 100}
				alt={alt}
			/>
			{indicator ? indicator : null}
		</Box>
	);
}
