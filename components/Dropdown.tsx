import { Fragment } from 'react';

import clsx from 'clsx';

import { Menu, Transition } from '@headlessui/react';

export default function Dropdown({
	label,
	icon,
	items
}: {
	label?: string;
	icon: JSX.Element;
	items: {
		label: string;
		icon: JSX.Element;
		danger?: boolean;
		onClick: () => void;
	}[];
}) {
	return (
		<Menu as="div" className="w-fit">
			<Menu.Button className="bg-neutral-100 dark:bg-neutral-600 cursor-pointer flex focus:outline-none px-4 py-2 rounded shadow w-fit">
				{label}
				{icon && <span className="h-4 ml-2 my-auto w-4">{icon}</span>}
			</Menu.Button>
			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 bg-neutral-100 dark:bg-neutral-600 cursor-pointer flex flex-col focus:outline-none mt-1 rounded shadow w-fit z-10">
					<div className="p-1">
						{items.map((item) => (
							<Menu.Item>
								<button className="dark:hover:bg-neutral-500 hover:bg-neutral-300 flex px-2 py-2 rounded w-full">
									<span
										className={clsx(
											item.danger && 'text-red-500',
											'h-4 mr-2 my-auto w-4'
										)}
									>
										{item.icon}
									</span>
									<span className={clsx(item.danger && 'text-red-500')}>
										{item.label}
									</span>
								</button>
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
