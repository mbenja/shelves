import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES } from '../lib/constants';
import {
	CogIcon,
	PresentationChartLineIcon,
	ViewBoardsIcon
} from '@heroicons/react/outline';

export default function BottomBar() {
	const router = useRouter();

	if (router.route === ROUTES.AUTH) {
		return null;
	}

	return (
		<div className="bg-slate-200 flex justify-evenly md:hidden px-2 py-2">
			<BottomBarItem
				icon={<ViewBoardsIcon className="h-7 m-auto w-7" />}
				href={ROUTES.BOOKSHELVES}
			/>
			<BottomBarItem
				icon={<PresentationChartLineIcon className="h-7 m-auto w-7" />}
				href={ROUTES.STATISTICS}
			/>
			<BottomBarItem
				icon={<CogIcon className="h-7 m-auto w-7" />}
				href={ROUTES.SETTINGS}
			/>
		</div>
	);
}

function BottomBarItem({ icon, href }: { icon: JSX.Element; href: string }) {
	return (
		<Link href={href}>
			<a className="grow py-2">{icon}</a>
		</Link>
	);
}
