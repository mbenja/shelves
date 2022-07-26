import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen md:mx-auto md:w-4/5 w-full">
			<main>{children}</main>
		</div>
	);
}
