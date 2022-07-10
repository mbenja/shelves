import clsx from 'clsx';

type ButtonProps = {
  disabled?: boolean;
  fill?: 'solid' | 'clear';
  onClick: () => void;
  text: string;
};

export default function Button(props: ButtonProps) {
  const { disabled, fill, onClick, text } = props;

  let buttonFill = fill ?? 'solid';
  let classes = clsx(
    buttonFill === 'solid'
      ? 'bg-purple-500 shadow text-gray-50'
      : 'bg-transparent dark:text-gray-50 text-black',
    disabled && 'opacity-70',
    'font-semibold p-2 rounded w-full'
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
    >
      {text}
    </button>
  );
}
