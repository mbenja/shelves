import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { ROUTES } from '../lib/constants';

export default function HeaderBar() {
	const router = useRouter();

	function isHeaderBarItemActive(href: string): boolean {
		return (
			router.route.includes(href) ||
			(href === ROUTES.BOOKSHELVES && router.route === '/')
		);
	}

	if (router.route === ROUTES.AUTH) {
		return null;
	}

	return (
		<div className="gap-6 hidden items-center md:flex px-2 py-4">
			<div className="font-bold text-xl tracking-tight">shelves</div>
			<HeaderBarItem
				name="Bookshelves"
				href="/"
				active={isHeaderBarItemActive(ROUTES.BOOKSHELVES)}
			/>
			<HeaderBarItem
				name="Statistics"
				href={ROUTES.STATISTICS}
				active={isHeaderBarItemActive(ROUTES.STATISTICS)}
			/>
			<HeaderBarItem
				name="Settings"
				href={ROUTES.SETTINGS}
				active={isHeaderBarItemActive(ROUTES.SETTINGS)}
			/>
		</div>
	);
}

function HeaderBarItem({
	name,
	href,
	active
}: {
	name: string;
	href: string;
	active: boolean;
}) {
	const classes = clsx(
		active && 'bg-neutral-100 dark:bg-neutral-600 shadow',
		!active && 'dark:hover:bg-neutral-600 hover:bg-neutral-300',
		'px-4 py-2 rounded transition'
	);

	return (
		<Link href={href}>
			<a className={classes}>{name}</a>
		</Link>
	);
}
