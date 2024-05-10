'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, Center, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
	const { getColorValue } = useThemeColors();

	return (
		<Box h='100%' w='100%' bg={getColorValue('appBackground')} backgroundRepeat='no-repeat' backgroundSize='cover'>
			<Center h='100%' w='100%'>
				<Flex bg={getColorValue('appBackground')} alignItems='center' direction='column' gap='15px'>
					<Image src='/logo-nobg.svg' width={100} height={100} quality={100} alt='tnfAngel Chat' />
					<Box
						as={motion.div}
						h='3px'
						background='#FF0067'
						borderRadius='2px'
						initial={{
							width: '0%',
							opacity: 1
						}}
						animate={{
							width: '100%',
							opacity: [1, 1, 1, 0],
							transition: { repeat: Infinity, duration: 1 }
						}}
					/>
				</Flex>
			</Center>
		</Box>
	);
}
