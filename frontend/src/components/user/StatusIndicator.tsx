import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { SafeNumber } from '@/types/util/SafeNumber';
import { Box } from '@chakra-ui/react';
import styles from '../../styles/StatusIndicator.module.scss';

export type StatusIndicatorProps = {
	status: UserStatusTypes;
	size: SafeNumber;
};

export default function StatusIndicator({
	status,
	size,
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
			className={`${styles.indicator} ${statusClasses[status]}`}
		/>
	);
}
