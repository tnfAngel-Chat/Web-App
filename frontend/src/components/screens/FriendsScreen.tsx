'use client';

import useColorValue from '@/hooks/useColorValue';
import {
	Box,
	Center,
	Stack,
	Heading,
	Text,
} from '@chakra-ui/react';

export default function HomeScreen() {
	const { getColorValue } = useColorValue();

	return (
		<Box w="100%" bg={getColorValue('primaryContentBackground')}>
			<Center h="100vh">
				<Stack spacing="24px">
					<Heading as="h1">Amigos</Heading>
					<Text>Vaya.. Parece que no tienes</Text>
					<Text as="sup">
						Broma simplemente no he creado la página
					</Text>
				</Stack>
			</Center>
		</Box>
	);
}
