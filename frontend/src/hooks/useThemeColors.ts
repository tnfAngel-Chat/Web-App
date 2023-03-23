import useTheme from './useTheme';

export default function useThemeColors() {
	const [theme] = useTheme();

	return {
		getColorValue: (value: string) => {
			return `${theme.id}.${value}`;
		},
	};
}
