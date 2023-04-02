'use client';

import { Center, Heading, Stack, Text } from '@chakra-ui/react';

export default function Friends() {
	return (
		<Center h="100%">
			<Stack spacing="24px">
				<Heading as="h1">Amigos</Heading>
				<Text>Vaya.. Parece que no tienes</Text>
				<Text as="sup">Broma simplemente no he creado la página</Text>
			</Stack>
		</Center>
	);
}
