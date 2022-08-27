import { useRouter } from 'next/router';

import { ReactNode } from 'react';

import { ROUTES } from '../lib/constants';
import HeaderBar from './HeaderBar';

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<div className="flex flex-col h-screen max-w-7xl md:mx-auto md:w-4/5 w-full">
			{router.pathname !== ROUTES.AUTH && <HeaderBar />}
			<main>{children}</main>
		</div>
	);
}
