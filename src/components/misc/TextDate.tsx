import useThemeColors from '@/hooks/useThemeColors';
import { Box } from '@chakra-ui/react';
import OverflownText from './OverflownText';

export type TextDateProps = {
	timestamp: number;
	long: boolean;
	fontSize: string;
};

export default function TextDate({
	timestamp,
	long,
	fontSize,
}: Readonly<TextDateProps>) {
	const { getColorValue } = useThemeColors();

	return (
		<Box userSelect={long ? 'auto' : 'none'}>
			<OverflownText
				userSelect={long ? 'auto' : 'none'}
				fontSize={fontSize}
				color={getColorValue('textMutedColor')}
			>
				{long ? 'Hoy a las 10:31' : '10:31 AM'}
			</OverflownText>
		</Box>
	);
}
