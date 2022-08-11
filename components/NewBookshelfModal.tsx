import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import Modal from './Modal';

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
		onSubmit(name);
		handleClose();
	}

	return (
		<Modal
			title="New Bookshelf"
			description="Provide a name for your new bookshelf"
			isOpen={isOpen}
			onClose={handleClose}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (name.length !== 0) handleSubmit();
				}}
			>
				<Input placeholder="name" value={name} onChange={(v) => setName(v)} />
				<div className="flex gap-2 mt-4">
					<Button expand text="Cancel" fill="clear" onClick={handleClose} />
					<Button
						expand
						text="Submit"
						disabled={name.length === 0}
						onClick={handleSubmit}
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	);
}
