import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
				<Toaster />
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;
