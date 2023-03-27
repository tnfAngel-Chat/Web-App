import { ThemeColors } from '@/constants/themes';
import useTheme from './useTheme';

export default function useThemeColors() {
	const [theme] = useTheme();

	return {
		getColorValue: (value: keyof ThemeColors) => {
			return `${theme.colors[value]}`;
		},
	};
}
