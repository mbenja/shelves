import { ReactNode } from 'react';

export default function PageContainer({
	children,
	title
}: {
	children: ReactNode;
	title?: string;
}) {
	return (
		<div className="flex flex-col h-full p-2">
			{title && (
				<p className="block font-semibold mb-4 md:hidden text-3xl">{title}</p>
			)}
			{children}
		</div>
	);
}
