import useThemeColors from '@/hooks/useThemeColors';
import { Box } from '@chakra-ui/react';
import OverflownText from '../general/OverflownText';

export type TextDateProps = {
	timestamp: number;
	long: boolean;
	fontSize: string;
};

export default function TextDate({ timestamp, long, fontSize }: TextDateProps) {
	const { getColorValue } = useThemeColors();

	return (
		<Box userSelect={long ? 'auto' : 'none'}>
			<OverflownText
				userSelect="none"
				fontSize={fontSize}
				color={getColorValue('textMutedColor')}
			>
				{long ? 'Hoy a las 10:31' : '10:31 AM'}
			</OverflownText>
		</Box>
	);
}
