import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head />
			<body className="bg-neutral-200 dark:bg-black dark:text-gray-50 h-full">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
