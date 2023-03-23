'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '../styles/global.scss';
import { persistor, store } from '../store';
import { Provider } from 'react-redux';
import AppChakraLayout from '@/components/general/AppChakraLayout';
import { PersistGate } from 'redux-persist/integration/react';
import { themes } from '@/constants/themes';
import LoadingScreen from '@/components/screens/LoadingScreen';

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
							<PersistGate
								loading={<LoadingScreen/>}
								persistor={persistor}
							>
								<AppChakraLayout>{children}</AppChakraLayout>
							</PersistGate>
						</Provider>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
