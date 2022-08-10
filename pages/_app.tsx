import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Toaster } from 'react-hot-toast';

import { SWRConfig } from 'swr';

import Layout from '../components/Layout';
import { swrFetcher } from '../lib/fetcher';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Shelves</title>
			</Head>
			<SessionProvider session={pageProps.session}>
				<SWRConfig
					value={{
						fetcher: swrFetcher
					}}
				>
					<ThemeProvider attribute="class">
						<Layout>
							<Component {...pageProps} />
							<Toaster />
						</Layout>
					</ThemeProvider>
				</SWRConfig>
			</SessionProvider>
		</>
	);
}

export default MyApp;
