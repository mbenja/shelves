import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ThemeProvider attribute="class">
				<Layout>
					<Component {...pageProps} />
					<Toaster />
				</Layout>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
