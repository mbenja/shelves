import Button from './Button';
import Modal from './Modal';

export default function ConfirmationModal({
	title,
	description,
	isDestructive,
	isOpen,
	onClose,
	onSubmit
}: {
	title: string;
	description: string;
	isDestructive: boolean;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
}) {
	function handleSubmit(): void {
		onSubmit();
		onClose();
	}

	return (
		<Modal
			title={title}
			description={description}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex gap-2 mt-4">
				<Button expand text="Cancel" fill="clear" onClick={onClose} />
				<Button
					danger={isDestructive}
					expand
					text="Confirm"
					onClick={handleSubmit}
				/>
			</div>
		</Modal>
	);
}
