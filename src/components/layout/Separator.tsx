import useThemeColors from '@/hooks/useThemeColors';
import type { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';

export type SeparatorProps = {
	w?: SafeNumber;
	h?: SafeNumber;
};

export default function Separator({ w, h }: Readonly<SeparatorProps>) {
	const { getColorValue } = useThemeColors();

	return (
		<Box
			overflow="none"
			w={w ?? '100%;'}
			minH={h ?? '1px'}
			maxH={h ?? '1px'}
			bg={getColorValue('separatorColor')}
		/>
	);
}
