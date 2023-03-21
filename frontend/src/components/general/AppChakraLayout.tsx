import useColorValue from '@/hooks/useColorValue';
import { Box } from '@chakra-ui/react';

export default function AppChakraLayout({ children }: any) {
	const { getColorValue } = useColorValue();

	return (
		<Box
			h="100%"
			w="100%"
			backgroundColor={getColorValue('primaryContentBackground')}
		>
			{children}
		</Box>
	);
}
