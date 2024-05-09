'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Box, ScaleFade } from '@chakra-ui/react';
import { useState } from 'react';
import IndexLoadingScreen from '../screens/AppLoadingScreen';
import AppSocket from './AppSocket';

export default function AppWrapper({ children }: any) {
	const { getColorValue } = useThemeColors();
	const [isLoading, setIsLoading] = useState(true);
	return (
		<AppSocket onConnectionReady={() => setIsLoading(false)}>
			<Box h='100%' w='100%' bg={getColorValue('appBackground')}>
				{isLoading ? (
					<IndexLoadingScreen />
				) : (
					<ScaleFade
						in={true}
						style={{ height: '100%', width: '100%' }}
						initialScale={0.8}
						transition={{
							enter: { duration: 0.3 }
						}}
					>
						<Box
							h='100%'
							w='100%'
							overflow='hidden'
							color={getColorValue('textColor')}
							bg={getColorValue('appBackground')}
							backgroundPosition='center center'
							backgroundRepeat='no-repeat'
							backgroundSize='cover'
						>
							<Box
								h='100%'
								w='100%'
								scrollSnapType='x mandatory'
								scrollSnapStop='always'
								scrollBehavior='smooth'
								style={{ scrollbarWidth: 'none' }}
								overflow='auto'
							>
								{children}
							</Box>
						</Box>
					</ScaleFade>
				)}
			</Box>
		</AppSocket>
	);
}
