import useThemeColors from '@/hooks/useThemeColors';
import type { RootState } from '@/store';
import { Center, Flex, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
	MdSignalWifiStatusbar4Bar,
	MdSignalWifiStatusbar1Bar,
	MdSignalWifiStatusbar2Bar,
	MdSignalWifiStatusbar3Bar
} from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function ConnectionStatus() {
	const { getColorValue } = useThemeColors();

	const { isConnected } = useSelector((state: RootState) => state.connection);

	const statusFontSize = '20px';
	const statusSignalColor = '#ffa500';
	const [statusIndex, setStatusIndex] = useState(0);

	const statusSignals = [
		<MdSignalWifiStatusbar4Bar key='0' fontSize={statusFontSize} color={statusSignalColor} opacity='0.3' />,
		<MdSignalWifiStatusbar1Bar key='1' fontSize={statusFontSize} color={statusSignalColor} />,
		<MdSignalWifiStatusbar2Bar key='2' fontSize={statusFontSize} color={statusSignalColor} />,
		<MdSignalWifiStatusbar3Bar key='3' fontSize={statusFontSize} color={statusSignalColor} />
	];

	useEffect(() => {
		let animationTimeout: Timer;

		if (!isConnected) {
			animationTimeout = setTimeout(() => {
				const newIndex = statusIndex + 1;

				setStatusIndex(newIndex === statusSignals.length ? 0 : newIndex);
			}, 300);
		} else if (statusIndex !== 0) {
			setStatusIndex(0);
		}

		return () => clearTimeout(animationTimeout);
	}, [statusIndex, isConnected]);

	return (
		<AnimatePresence mode='wait'>
			{!isConnected && (
				<Center
					as={motion.div}
					w='100%'
					initial={{ height: '0px' }}
					animate={{ height: '32px', transition: { delay: 2 } }}
					exit={{ height: '0px' }}
					p='0px'
				>
					<Center
						w='100%'
						h='32px'
						top='0%'
						left='0%'
						bg={getColorValue('ternaryBackground')}
						position='fixed'
					>
						<Flex alignItems='center' gap='10px' zIndex={0}>
							{statusSignals[statusIndex]}
							<Text fontWeight='bold'>Connecting...</Text>
						</Flex>
					</Center>
				</Center>
			)}
		</AnimatePresence>
	);
}
