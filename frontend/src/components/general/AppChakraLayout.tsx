import useColorValue from '@/hooks/useColorValue';
import { Box } from '@chakra-ui/react';

export default function AppChakraLayout({ children }: any) {
    	const { getColorValue } = useColorValue();

	return (
		<Box backgroundColor={getColorValue('primaryContentBackground')}>
			{children}
		</Box>
	);
}
