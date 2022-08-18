import { ReactNode } from 'react';

export default function PageContainer({
	children,
	headerButtons,
	title
}: {
	children: ReactNode;
	headerButtons?: JSX.Element;
	title?: string;
}) {
	return (
		<div className="flex flex-col h-full p-2">
			<div className="flex justify-between mb-4">
				<p className="font-semibold text-3xl">{title}</p>
				{headerButtons}
			</div>
			{children}
		</div>
	);
}
