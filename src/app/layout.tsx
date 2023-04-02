'use client';

import '../styles/global.scss';
import { store } from '../store';
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import { CacheProvider } from '@chakra-ui/next-js';
import AppWrapper from '@/components/general/AppWrapper';
import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';

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
								<AppWrapper>{children}</AppWrapper>
							</SWRConfig>
						</Provider>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
