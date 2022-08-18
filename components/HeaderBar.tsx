import Link from 'next/link';

import { ROUTES } from '../lib/constants';
import {
	CogIcon,
	PresentationChartLineIcon,
	ViewBoardsIcon
} from '@heroicons/react/outline';

export default function HeaderBar() {
	return (
		<div className="gap-4 items-center flex p-2">
			<div className="font-bold text-xl tracking-tight">shelves</div>
			<HeaderBarItem name="Bookshelves" icon={<ViewBoardsIcon />} href="/" />
			<HeaderBarItem
				name="Statistics"
				icon={<PresentationChartLineIcon />}
				href={ROUTES.STATISTICS}
			/>
			<HeaderBarItem
				name="Settings"
				icon={<CogIcon />}
				href={ROUTES.SETTINGS}
			/>
		</div>
	);
}

function HeaderBarItem({
	name,
	icon,
	href
}: {
	name: string;
	icon: JSX.Element;
	href: string;
}) {
	return (
		<Link href={href}>
			<a className="dark:hover:bg-neutral-600 flex hover:bg-neutral-300 px-4 py-2 rounded transition">
				<span className="h-5 my-auto w-5">{icon}</span>
				<span className="hidden md:block ml-2">{name}</span>
			</a>
		</Link>
	);
}
