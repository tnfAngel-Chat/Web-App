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
	env: {
		API_VERSION: process.env.API_VERSION,
		API_URL: process.env.API_URL,
		GATEWAY_URL: process.env.GATEWAY_URL,
		CDN_URL: process.env.CDN_URL,
		PROXY_URL: process.env.PROXY_URL,
	},
};

module.exports = nextConfig;
