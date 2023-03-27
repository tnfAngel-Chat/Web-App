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
		{ color: string; label: string }
	> = {
		[UserStatusTypes.Online]: {
			color: getColorValue('statusIndicatorOnlineColor'),
			label: 'Online',
		},
		[UserStatusTypes.Offline]: {
			color: getColorValue('statusIndicatorOfflineColor'),
			label: 'Offline',
		},
		[UserStatusTypes.Idle]: {
			color: getColorValue('statusIndicatorIdleColor'),
			label: 'Idle',
		},
		[UserStatusTypes.DoNotDisturb]: {
			color: getColorValue('statusIndicatorDNDColor'),
			label: 'Do Not Disturb',
		},
	};

	return (
		<Tooltip
			label={statusValues[status].label}
			placement={tooltipPlacement ?? 'top'}
			openDelay={100}
			bg={getColorValue('tooltipBackground')}
			color={getColorValue('textColor')}
			hasArrow
		>
			<Box
				w={`${size}px`}
				h={`${size}px`}
				borderColor={getColorValue('statusIndicatorBorderColor')}
				bg={statusValues[status].color}
				className={`${styles.indicator} ${
					positioned ? styles.positionedIndicator : ''
				}`}
			/>
		</Tooltip>
	);
}
