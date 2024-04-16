'use client';

import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export default function Friends() {
	const mainRef = useRef<any>();

	useEffect(() => {
		mainRef.current?.scrollIntoView({
			behavior: 'smooth'
		});
	}, []);

	return (
		<Center ref={mainRef} h='100%' className='adjustScreen'>
			<Stack spacing='24px'>
				<Heading as='h1'>Friends</Heading>
				<Text>Oh, you don't have any friends right now...</Text>
			</Stack>
		</Center>
	);
}
