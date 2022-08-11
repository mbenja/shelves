import clsx from 'clsx';

type ButtonProps = {
	disabled?: boolean;
	expand?: boolean;
	fill?: 'solid' | 'clear';
	icon?: JSX.Element;
	onClick: () => void;
	text: string;
};

export default function Button(props: ButtonProps) {
	const { disabled, expand, fill, icon, onClick, text } = props;

	let buttonFill = fill ?? 'solid';
	let classes = clsx(
		buttonFill === 'solid'
			? 'bg-purple-500 shadow text-gray-50'
			: 'bg-transparent dark:text-gray-50 text-black',
		disabled && 'opacity-70',
		expand ? 'w-full' : 'w-fit',
		'flex focus:outline-none font-semibold justify-center p-2 rounded'
	);

	return (
		<button
			className={classes}
			disabled={disabled}
			onClick={disabled ? () => {} : onClick}
		>
			{icon}
			<span className={icon ? 'ml-2 mr-1' : ''}>{text}</span>
		</button>
	);
}
