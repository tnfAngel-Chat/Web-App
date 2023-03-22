import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';
import styles from '../../styles/StatusIndicator.module.scss';

export type StatusIndicatorProps = {
	status: UserStatusTypes;
	size: SafeNumber;
	positioned?: boolean;
};

export default function StatusIndicator({
	status,
	size,
	positioned = true,
}: StatusIndicatorProps) {
	const statusClasses: Record<UserStatusTypes, string> = {
		[UserStatusTypes.Online]: styles.onlineIndicator,
		[UserStatusTypes.Offline]: styles.offlineIndicator,
		[UserStatusTypes.Idle]: styles.idleIndicator,
		[UserStatusTypes.DoNotDisturb]: styles.dndIndicator,
	};

	return (
		<Box
			w={`${size}px`}
			h={`${size}px`}
			className={`${styles.indicator} ${
				positioned ? styles.positionedIndicator : ''
			} ${statusClasses[status]}`}
		/>
	);
}