import useColorValue from '@/hooks/useColorValue';
import { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';


export type SeparatorProps = {
	w?: SafeNumber;
	h?: SafeNumber;
};

export default function Separator({ w, h }: SeparatorProps) {
	const { getColorValue } = useColorValue();

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
