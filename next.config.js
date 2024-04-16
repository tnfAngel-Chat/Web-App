import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: process.env.NEXT_OUTPUT,
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.tnfangel.xyz',
				port: ''
			},
			{
				protocol: 'https',
				hostname: '*',
				port: ''
			}
		]
	},
	env: {
		API_VERSION: process.env.API_VERSION,
		API_URL: process.env.API_URL,
		GATEWAY_URL: process.env.GATEWAY_URL,
		AUTH_URL: process.env.AUTH_URL,
		CDN_URL: process.env.CDN_URL,
		MEDIA_PROXY_URL: process.env.MEDIA_PROXY_URL
	}
};

let configExport = nextConfig;

if (process.env.NODE_ENV === 'production') {
	console.log('Loaded production config');
	configExport = million.next(nextConfig);
}

export default configExport;
