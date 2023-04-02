export interface ThemeColors {
	secondaryBackground: string;
	primaryBackground: string;
	sideBarButtonActive: string;
	ternaryBackground: string;
	sidebarButtonHover: string;
	focusBorderColor: string;
	modalBackground: string;
	sidebarBackground: string;
	separatorColor: string;
	textMutedColor: string;
	appBackground: string;
	messageHover: string;
	tooltipBackground: string;
	textColor: string;
	textBlockedColor: string;
	statusIndicatorBorderColor: string;
	statusIndicatorOnlineColor: string;
	statusIndicatorIdleColor: string;
	statusIndicatorDNDColor: string;
	statusIndicatorOfflineColor: string;
}

export interface Theme {
	id: string;
	name: string;
	baseTheme: 'dark' | 'light';
	colors: ThemeColors;
}

export const themes: Theme[] = [
	{
		id: 'dark',
		name: 'Dark',
		baseTheme: 'dark',
		colors: {
			appBackground: '#333333',
			ternaryBackground: '#252525',
			sidebarBackground: '#2E2E2E',
			modalBackground: '#2E2E2E',
			primaryBackground: '#333333',
			secondaryBackground: '#3F3F3F',
			focusBorderColor: '#FFFFFF21',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#ffffff20',
			tooltipBackground: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		colors: {
			appBackground: '#EBEBEB',
			ternaryBackground: '#ffffff',
			sidebarBackground: '#F1F1F1',
			modalBackground: '#F1F1F1',
			primaryBackground: '#EBEBEB',
			secondaryBackground: '#DADADA',
			focusBorderColor: '#A1A1A1',
			sidebarButtonHover: '#00000010',
			sideBarButtonActive: '#00000020',
			messageHover: '#00000020',
			separatorColor: '#00000020',
			tooltipBackground: '#BEBEBE',
			textColor: '#0F0F0F',
			textMutedColor: '#292929',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'amoled',
		name: 'Amoled',
		baseTheme: 'dark',
		colors: {
			appBackground: '#000000',
			ternaryBackground: '#080808',
			sidebarBackground: '#0C0C0C',
			modalBackground: '#0C0C0C',
			primaryBackground: '#000000',
			secondaryBackground: '#181818',
			focusBorderColor: '#3B3B3B',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#2E2E2E20',
			separatorColor: '#ffffff20',
			tooltipBackground: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'midnight',
		name: 'Midnight',
		baseTheme: 'dark',
		colors: {
			appBackground: '#0E0A13',
			ternaryBackground: '#0D0A0F',
			primaryBackground: '#0E0A13',
			sidebarBackground: '#110C18',
			modalBackground: '#110C18',
			secondaryBackground: '#191120',
			focusBorderColor: '#392947',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#37CC7A',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'inspiration',
		name: 'Inspiration',
		baseTheme: 'dark',
		colors: {
			appBackground:
				'linear-gradient(120deg, rgba(32,44,112,1) 0%, rgba(108,0,103,1) 100%)',
			modalBackground: '#0000007F',
			primaryBackground: '#00000036',
			secondaryBackground: '#0000003F',
			ternaryBackground: '#0000008C',
			focusBorderColor: '#FFFFFF3B',
			sidebarBackground: '#0000004D',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'mountains',
		name: 'Mountains',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/mountains.svg)',
			modalBackground: '#0000007F',
			primaryBackground: '#0000008A',
			secondaryBackground: '#0000002D',
			ternaryBackground: '#000000A9',
			focusBorderColor: '#FFFFFF2A',
			sidebarBackground: '#0000008F',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#00000094',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
	{
		id: 'sky',
		name: 'Sky',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/sky.svg)',
			modalBackground: '#0000007F',
			primaryBackground: '#0000008A',
			secondaryBackground: '#0000002D',
			ternaryBackground: '#000000A9',
			focusBorderColor: '#FFFFFF2A',
			sidebarBackground: '#0000008F',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#00000094',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b',
		},
	},
];
