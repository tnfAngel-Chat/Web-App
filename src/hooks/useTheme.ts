import { themes } from '@/constants/themes';
import { RootState } from '@/store';
import { setTheme } from '@/store/slices/themeSlice';
import { useColorMode } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

export default function useTheme() {
	const themesState = useSelector((state: RootState) => state.themes);
	const dispatch = useDispatch();
	const { colorMode, toggleColorMode } = useColorMode();

	return [
		themesState.theme,
		(themeId: string) => {
			const theme = themes.find((theme) => theme.id === themeId);

			if (!theme) return;

			if (colorMode !== theme.baseTheme) toggleColorMode();

			dispatch(setTheme(theme));
		},
		themes,
	] as const;
}
