export interface ThemeColors {
	secondaryBackground: string;
	primaryBackground: string;
	sidebarButtonActive: string;
	ternaryBackground: string;
	sidebarButtonHover: string;
	inputBackground: string;
	focusBorderColor: string;
	modalBackground: string;
	sidebarBackground: string;
	separatorColor: string;
	textMutedColor: string;
	appBackground: string;
	messageHover: string;
	textColor: string;
	textBlockedColor: string;
	guildsBackground: string;
	tooltipBackground: string;
	iconLinkBackground: string;
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
			appBackground: '#222222',
			ternaryBackground: '#272727',
			sidebarBackground: '#2E2E2E',
			modalBackground: '#2E2E2E',
			primaryBackground: '#333333',
			secondaryBackground: '#3F3F3F',
			inputBackground: '#474747',
			focusBorderColor: '#FFFFFF21',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			guildsBackground: '#232323',
			separatorColor: '#ffffff20',
			tooltipBackground: '#181818',
			iconLinkBackground: '#2E2E2E',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		colors: {
			appBackground: '#EBEBEB',
			ternaryBackground: '#FAFAFA',
			sidebarBackground: '#E7E7E7',
			modalBackground: '#F1F1F1',
			primaryBackground: '#E0E0E0',
			secondaryBackground: '#EBEBEB',
			inputBackground: '#FFFFFF',
			focusBorderColor: '#0000005E',
			sidebarButtonHover: '#00000010',
			sidebarButtonActive: '#00000020',
			messageHover: '#00000010',
			guildsBackground: '#FCFCFC',
			separatorColor: '#00000020',
			tooltipBackground: '#BEBEBE',
			iconLinkBackground: '#F1F1F1',
			textColor: '#202020',
			textMutedColor: '#3B3B3B',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
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
			inputBackground: '#080808',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#2E2E2E20',
			guildsBackground: '#060606',
			separatorColor: '#ffffff20',
			tooltipBackground: '#202020',
			iconLinkBackground: '#0C0C0C',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
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
			inputBackground: '#1F1627',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			guildsBackground: '#0C090F',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#281D30',
			iconLinkBackground: '#110C18',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#37CC7A',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'inspiration',
		name: 'Inspiration',
		baseTheme: 'dark',
		colors: {
			appBackground: 'linear-gradient(120deg, rgba(32,44,112,1) 0%, rgba(108,0,103,1) 100%)',
			modalBackground: '#0000007F',
			primaryBackground: '#0000008A',
			secondaryBackground: '#00000015',
			ternaryBackground: '#0000009C',
			focusBorderColor: '#FFFFFF2A',
			inputBackground: '#FFFFFF10',
			sidebarBackground: '#0000008F',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#00000094',
			iconLinkBackground: '#FFFFFF15',
			guildsBackground: '#0000009F',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'mountains',
		name: 'Mountains',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/mountains.svg)',
			modalBackground: '#0000007F',
			primaryBackground: '#0000008A',
			secondaryBackground: '#0000001E',
			ternaryBackground: '#0000009A',
			focusBorderColor: '#FFFFFF2A',
			inputBackground: '#FFFFFF10',
			sidebarBackground: '#0000008F',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#00000094',
			iconLinkBackground: '#FFFFFF15',
			guildsBackground: '#0000009F',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'sky',
		name: 'Sky',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/sky.svg)',
			modalBackground: '#0000007F',
			primaryBackground: '#0000008A',
			secondaryBackground: '#00000015',
			ternaryBackground: '#0000009C',
			focusBorderColor: '#FFFFFF2A',
			inputBackground: '#FFFFFF10',
			sidebarBackground: '#0000008F',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#00000094',
			iconLinkBackground: '#FFFFFF15',
			guildsBackground: '#0000009F',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'neon',
		name: 'Neon',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/neon.jpg)',
			modalBackground: '#0000007F',
			primaryBackground: '#00000063',
			secondaryBackground: '#0000003A',
			ternaryBackground: '#00000098',
			focusBorderColor: '#FFFFFF2A',
			inputBackground: '#FFFFFF10',
			sidebarBackground: '#0000007A',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			guildsBackground: '#0000009A',
			tooltipBackground: '#000000BE',
			separatorColor: '#FFFFFF2D',
			iconLinkBackground: '#FFFFFF0C',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	},
	{
		id: 'wh',
		name: 'Wormhole',
		baseTheme: 'dark',
		colors: {
			appBackground: 'url(/wh.webp)',
			modalBackground: '#0000007F',
			primaryBackground: '#00000063',
			secondaryBackground: '#0000003A',
			ternaryBackground: '#00000098',
			focusBorderColor: '#FFFFFF2A',
			inputBackground: '#FFFFFF10',
			sidebarBackground: '#0000007A',
			sidebarButtonHover: '#ffffff10',
			sidebarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			guildsBackground: '#0000009A',
			separatorColor: '#FFFFFF2D',
			tooltipBackground: '#000000BE',
			iconLinkBackground: '#FFFFFF15',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
			textBlockedColor: '#ee5959',
			statusIndicatorBorderColor: '#252525',
			statusIndicatorOnlineColor: '#2ed458',
			statusIndicatorIdleColor: '#eeba59',
			statusIndicatorDNDColor: '#ee5959',
			statusIndicatorOfflineColor: '#9b9b9b'
		}
	}
];
