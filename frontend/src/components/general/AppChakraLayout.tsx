import useThemeColors from '@/hooks/useThemeColors';
import { Box } from '@chakra-ui/react';

export default function AppChakraLayout({ children }: any) {
	const { getColorValue } = useThemeColors();

	return (
		<Box
			h="100%"
			w="100%"
			color={getColorValue('textColor')}
			backgroundColor={getColorValue('primaryContentBackground')}
		>
			{children}
		</Box>
	);
}
