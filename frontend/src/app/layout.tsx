'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '../styles/global.scss';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const colors = {
	dark: {
		primary: {
			userProfileSidebar: '#252525',
			sidebarContent: '#2E2E2E',
			primaryContentBackground: '#333333',
			secondaryContentBackground: '#3F3F3F',
			focusBorderColor: '#4D4D4D',
		},
	},
	light: {
		primary: {
			userProfileSidebar: '#ffffff',
			sidebarContent: '#F1F1F1',
			primaryContentBackground: '#EBEBEB',
			secondaryContentBackground: '#E6E6E6',
			focusBorderColor: '#E0E0E0',
		},
	},
};

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
				<CacheProvider>
					<ChakraProvider theme={theme}>{children}</ChakraProvider>
				</CacheProvider>
			</body>
		</html>
	);
}
