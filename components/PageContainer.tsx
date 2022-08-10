import { ReactNode } from 'react';

import clsx from 'clsx';

export default function PageContainer({
	children,
	forceShowTitle,
	title
}: {
	children: ReactNode;
	forceShowTitle?: boolean;
	title?: string;
}) {
	const titleClasses = clsx(
		!forceShowTitle && 'md:hidden',
		'block font-semibold mb-4 text-3xl'
	);

	return (
		<div className="flex flex-col h-full p-2">
			{title && <p className={titleClasses}>{title}</p>}
			{children}
		</div>
	);
}
