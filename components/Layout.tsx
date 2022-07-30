import { ReactNode } from 'react';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col h-screen md:mx-auto md:w-4/5 w-full">
			<HeaderBar />
			<main>{children}</main>
			<BottomBar />
		</div>
	);
}
