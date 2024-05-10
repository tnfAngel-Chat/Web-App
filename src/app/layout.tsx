'use client';

import AppWrapper from '@/components/general/AppWrapper';
import { CacheProvider } from '@chakra-ui/next-js';
import { Box, ChakraProvider, ColorModeScript, Flex, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { store } from '../store';
import '../styles/global.css';
import ConnectionStatus from '@/components/general/ConnectionStatus';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
};

const fonts = {};

const theme = extendTheme({ config, fonts });

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
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
								<AppWrapper>
									<Flex h='100%' w='100%' direction='column' gap='0px'>
										<ConnectionStatus />
										<Box w='100%' h='100%' zIndex={1}>
											{children}
										</Box>
									</Flex>
								</AppWrapper>
							</SWRConfig>
						</Provider>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
