'use client';

import '../styles/global.scss';
import { Provider } from 'react-redux';
import { store } from '../store';
import { CacheProvider } from '@chakra-ui/next-js';
import AppChakraLayout from '@/components/general/AppChakraLayout';
import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const fonts = {};

const theme = extendTheme({ config, fonts });

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
							<SWRConfig
								value={{
									fetcher: (resource, init) =>
										fetch(resource, init).then((res) =>
											res.json()
										),
								}}
							>
								<AppChakraLayout>{children}</AppChakraLayout>
							</SWRConfig>
						</Provider>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
