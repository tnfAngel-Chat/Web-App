'use client';

import AppWrapper from '@/components/general/AppWrapper';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { store } from '../store';
import '../styles/global.scss';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
};

const fonts = {};

const theme = extendTheme({ config, fonts });

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<title>tnfAngel Chat</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</head>
			<body>
				<ColorModeScript initialColorMode={theme['config'].initialColorMode} />
				<ChakraProvider theme={theme}>
					<CacheProvider>
						<Provider store={store}>
							<SWRConfig
								value={{
									fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
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
