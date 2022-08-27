import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import Modal from './Modal';

export default function SetGoalModal({
	isOpen,
	onClose,
	onSubmit
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (v: number) => void;
}) {
	const [goal, setGoal] = useState('');
	const isSubmitDisabled = isNaN(parseInt(goal));

	function handleClose(): void {
		setGoal('');
		onClose();
	}

	function handleSubmit(): void {
		onSubmit(parseInt(goal));
		handleClose();
	}

	return (
		<Modal
			title="Set Reading Goal"
			description="How many books do you want to read this year?"
			isOpen={isOpen}
			onClose={handleClose}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (isSubmitDisabled) handleSubmit();
				}}
			>
				<Input
					placeholder="Goal"
					value={goal}
					onChange={(v) => setGoal(v)}
					type="number"
				/>
				<div className="flex gap-2 mt-4">
					<Button expand text="Cancel" fill="clear" onClick={handleClose} />
					<Button
						expand
						text="Submit"
						disabled={isSubmitDisabled}
						onClick={handleSubmit}
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	);
}
