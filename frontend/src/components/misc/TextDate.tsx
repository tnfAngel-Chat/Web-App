import useColorValue from '@/hooks/useColorValue';
import OverflownText from '../general/OverflownText';

export type TextDateProps = {
	timestamp: number;
	long: boolean;
	fontSize: string;
};

export default function TextDate({ timestamp, long, fontSize }: TextDateProps) {
	const { getColorValue } = useColorValue();

	return (
		<OverflownText
			fontSize={fontSize}
			color={getColorValue('textMutedColor')}
		>
			{long ? 'Hoy a las 10:31' : '10:31 AM'}
		</OverflownText>
	);
}
