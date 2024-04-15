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
				<Heading as='h1'>Amigos</Heading>
				<Text>Vaya.. Parece que no tienes</Text>
				<Text as='sup'>Broma simplemente no he creado la página</Text>
			</Stack>
		</Center>
	);
}
