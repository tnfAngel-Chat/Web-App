import { Stack, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { MdSettings, MdPeople } from 'react-icons/md';
import SettingsModal from '../modals/SettingsModal';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Stack spacing="24px">
			<Heading as="h1">Bienvenido a tnfAngel Chat</Heading>
			<SettingsModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			<Button
				variant="outline"
				onClick={onOpen}
				rightIcon={<MdSettings />}
			>
				Abrir ajustes
			</Button>
			<Button
				rightIcon={<MdPeople />}
				onMouseEnter={() => router.prefetch('/friends')}
				onClick={() => router.push('/friends')}
			>
				Amigos
			</Button>
		</Stack>
	);
}
