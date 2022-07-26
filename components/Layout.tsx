import { ReactNode } from 'react';

import HeaderBar from './HeaderBar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen md:mx-auto md:w-4/5 w-full">
			<HeaderBar />
			<main>{children}</main>
		</div>
	);
}
