/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.tnfangel.xyz',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '*',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'tnfangel.xyz',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '*discordapp.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '*discord.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '*discordapp.net',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
