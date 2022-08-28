import clsx from 'clsx';

type ButtonProps = {
	danger?: boolean;
	disabled?: boolean;
	expand?: boolean;
	fill?: 'solid' | 'clear';
	icon?: JSX.Element;
	onClick?: () => void;
	text: string;
	type?: 'button' | 'submit';
};

export default function Button(props: ButtonProps) {
	const { danger, disabled, expand, fill, icon, onClick, text, type } = props;

	const bgColor = danger ? 'bg-red-500' : 'bg-purple-500';
	const buttonFill = fill ?? 'solid';
	let classes = clsx(
		buttonFill === 'solid'
			? `${bgColor} shadow text-gray-50`
			: 'bg-transparent dark:text-gray-50 text-black',
		disabled && 'opacity-70',
		expand ? 'w-full' : 'w-fit',
		'flex focus:outline-none font-semibold h-fit justify-center p-2 rounded whitespace-nowrap'
	);

	return (
		<button
			className={classes}
			disabled={disabled}
			onClick={disabled ? () => {} : onClick}
			type={type ?? 'button'}
		>
			{icon && <span className="h-5 my-auto w-5">{icon}</span>}
			<span className={icon ? 'ml-2 mr-1' : ''}>{text}</span>
		</button>
	);
}
