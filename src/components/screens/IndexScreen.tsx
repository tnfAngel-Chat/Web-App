'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	Center,
	Heading,
	Stack,
	useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdSettings } from 'react-icons/md';
import SettingsModal from '../modals/SettingsModal';

export default function IndexScreen() {
	const { getColorValue } = useThemeColors();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Center
			h='100%'
			w='100%'
			bg={getColorValue('appBackground')}
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
		>
			<Stack
				spacing='20px'
				padding='20px'
				borderRadius='10px'
				alignItems='center'
				bg={getColorValue('sidebarBackground')}
			>
				<Alert status='error' borderRadius='5px'>
					<AlertIcon />
					<Stack spacing='0px'>
						<AlertTitle>This is in an early proof-of-concept version!</AlertTitle>
						<AlertDescription>Nothing will work and it will be incomplete.</AlertDescription>
					</Stack>
				</Alert>
				<Heading as='h1'>tnfAngel Chat</Heading>
				<Stack spacing='10px' w='100%' alignItems='center' mt='10px'>
					<Button
						w='100%'
						rightIcon={<ArrowForwardIcon />}
						onMouseEnter={() => router.prefetch('/friends')}
						onClick={() => router.push('/friends')}
					>
						Get started
					</Button>
					<Button w='100%' variant='outline' onClick={onOpen} rightIcon={<MdSettings />}>
						Open settings
					</Button>
				</Stack>
				<SettingsModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			</Stack>
		</Center>
	);
}
