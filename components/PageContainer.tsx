import { ReactNode } from 'react';

export default function PageContainer({
	children,
	headerButtons,
	title,
	subtitle
}: {
	children: ReactNode;
	headerButtons?: JSX.Element;
	title?: string;
	subtitle?: JSX.Element;
}) {
	return (
		<div className="flex flex-col h-full p-2">
			<div className="flex justify-between mb-4">
				<div>
					<p className="font-semibold text-3xl">{title}</p>
					{subtitle}
				</div>
				<div>{headerButtons}</div>
			</div>
			{children}
		</div>
	);
}
