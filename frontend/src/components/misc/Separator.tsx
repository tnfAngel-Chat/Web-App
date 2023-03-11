import { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';
import styles from '../../styles/Separator.module.scss';

export type SeparatorProps = {
	w?: SafeNumber;
	h?: SafeNumber;
};

export default function Separator({ w, h }: SeparatorProps) {
	return (
		<Box
			w={w ?? '100%;'}
			h={h ?? '1px'}
			className={styles.userSeparator}
		/>
	);
}
