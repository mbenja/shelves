import { Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';

export default function Modal({
	title,
	description,
	isOpen,
	onClose,
	children
}: {
	title: string;
	description?: string;
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}) {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="bg-black/30 fixed inset-0" />
				</Transition.Child>
				<div className="fixed inset-0 flex items-center justify-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="bg-neutral-100 dark:bg-neutral-600 max-w-xs md:max-w-md mx-auto p-4 rounded">
							<Dialog.Title className="font-semibold text-xl">
								{title}
							</Dialog.Title>
							{description && (
								<Dialog.Description className="mb-4">
									{description}
								</Dialog.Description>
							)}
							{children}
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
