import { useColorMode } from '@chakra-ui/react';

export default function useColorValue() {
	const { colorMode } = useColorMode();

	return {
		getColorValue: (value: string) => {
			return `${colorMode}.${value}`;
		},
	};
}
