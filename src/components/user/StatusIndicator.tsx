import useThemeColors from '@/hooks/useThemeColors';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { SafeNumber } from '@/types/util/SafeNumber';
import { Box, PlacementWithLogical, Tooltip } from '@chakra-ui/react';
import styles from '../../styles/StatusIndicator.module.scss';

export type StatusIndicatorProps = {
	status: UserStatusTypes;
	size: SafeNumber;
	positioned?: boolean;
	tooltipPlacement?: PlacementWithLogical;
};

export default function StatusIndicator({
	status,
	size,
	positioned = true,
	tooltipPlacement,
}: StatusIndicatorProps) {
	const { getColorValue } = useThemeColors();
	const statusValues: Record<
		UserStatusTypes,
		{ style: string; label: string }
	> = {
		[UserStatusTypes.Online]: {
			style: styles.onlineIndicator,
			label: 'Online',
		},
		[UserStatusTypes.Offline]: {
			style: styles.offlineIndicator,
			label: 'Offline',
		},
		[UserStatusTypes.Idle]: {
			style: styles.idleIndicator,
			label: 'Idle',
		},
		[UserStatusTypes.DoNotDisturb]: {
			style: styles.dndIndicator,
			label: 'Do Not Disturb',
		},
	};

	return (
		<Tooltip
			label={statusValues[status].label}
			placement={tooltipPlacement ?? 'top'}
			openDelay={100}
			bg={getColorValue('tooltipBG')}
			color={getColorValue('textColor')}
			hasArrow
		>
			<Box
				w={`${size}px`}
				h={`${size}px`}
				className={`${styles.indicator} ${
					positioned ? styles.positionedIndicator : ''
				} ${statusValues[status].style}`}
			/>
		</Tooltip>
	);
}
