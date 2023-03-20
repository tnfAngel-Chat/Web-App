'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import {
	extendTheme,
	ChakraProvider,
	ColorModeScript,
	useColorMode,
} from '@chakra-ui/react';
import '../styles/global.scss';
import { store } from '../store';
import { Provider } from 'react-redux';
import AppChakraLayout from '@/components/general/AppChakraLayout';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const colors = {
	dark: {
		userProfileSidebar: '#252525',
		sidebarContent: '#2E2E2E',
		primaryContentBackground: '#333333',
		secondaryContentBackground: '#3F3F3F',
		focusBorderColor: '#4D4D4D',
		sidebarButtonHover: '#ffffff10',
		sideBarButtonActive: '#ffffff20',
		messageHover: '#00000020',
		separatorColor: '#ffffff20',
		tooltipBG: '#202020',
		textColor: '#F1F1F1',
	},
	light: {
		userProfileSidebar: '#ffffff',
		sidebarContent: '#F1F1F1',
		primaryContentBackground: '#EBEBEB',
		secondaryContentBackground: '#DADADA',
		sidebarButtonHover: '#00000010',
		sideBarButtonActive: '#00000020',
		messageHover: '#00000020',
		separatorColor: '#00000020',
		tooltipBG: '#BEBEBE',
		textColor: '#0F0F0F',
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
					<ChakraProvider theme={theme}>
						<Provider store={store}>
							<AppChakraLayout>{children}</AppChakraLayout>
						</Provider>
					</ChakraProvider>
				</CacheProvider>
			</body>
		</html>
	);
}
