import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-gray-100 dark:bg-black dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
