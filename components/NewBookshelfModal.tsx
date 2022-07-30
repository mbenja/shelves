import { Fragment, useState } from 'react';

import Button from './Button';
import Input from './Input';
import { Dialog, Transition } from '@headlessui/react';

export default function NewBookshelfModal({
	isOpen,
	onClose,
	onSubmit
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (v: string) => void;
}) {
	const [name, setName] = useState('');

	function handleClose(): void {
		setName('');
		onClose();
	}

	function handleSubmit(): void {
		setName('');
		onSubmit(name);
	}

	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog className="relative z-50" onClose={handleClose}>
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
						<Dialog.Panel className="bg-neutral-100 dark:bg-neutral-600 max-w-md mx-auto p-4 rounded">
							<Dialog.Title className="font-semibold text-xl">
								New Bookshelf
							</Dialog.Title>
							<Dialog.Description className="mb-4">
								Provide a name for your new bookshelf
							</Dialog.Description>

							<Input
								placeholder="name"
								value={name}
								onChange={(v) => setName(v)}
							/>
							<div className="flex gap-2 mt-4">
								<Button
									expand
									text="Cancel"
									fill="clear"
									onClick={handleClose}
								/>
								<Button
									expand
									text="Submit"
									disabled={name.length === 0}
									onClick={handleSubmit}
								/>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
