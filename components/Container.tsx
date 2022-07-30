import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
	return <div className="h-full p-2">{children}</div>;
}
