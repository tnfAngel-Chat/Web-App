'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '../styles/global.scss';
import { store } from '../store';
import { Provider } from 'react-redux';
import AppChakraLayout from '@/components/general/AppChakraLayout';
import { themes } from '@/constants/themes';


const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const colors = Object.fromEntries(
	themes.map((theme) => [theme.id, theme.colors])
);

const fonts = {};

const theme = extendTheme({ config, colors, fonts });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>tnfAngel Chat</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</head>
			<body>
				<ColorModeScript
					initialColorMode={theme.config.initialColorMode}
				/>
				<ChakraProvider theme={theme}>
					<CacheProvider>
						<Provider store={store}>
							<AppChakraLayout>{children}</AppChakraLayout>
						</Provider>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
