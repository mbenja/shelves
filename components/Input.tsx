type InputProps = {
	onChange: (v: string) => void;
	placeholder: string;
	type?: 'password' | 'text';
	value: string;
};

export default function Input(props: InputProps) {
	const { onChange, placeholder, type, value } = props;

	const inputType = type ?? 'text';

	return (
		<input
			className="dark:bg-neutral-800 dark:text-gray-50 focus:outline-none p-2 shadow rounded w-full"
			onChange={(ev) => onChange(ev.currentTarget.value)}
			placeholder={placeholder}
			type={inputType}
			value={value}
		/>
	);
}
