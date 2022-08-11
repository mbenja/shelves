import { NextRouter } from 'next/router';

import toast from 'react-hot-toast';

import { ROUTES } from '../constants';

export function resolveErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown Error';
}

export async function handleUnsuccessfulApiResponse(
	res: Response,
	router: NextRouter
): Promise<void> {
	if (res.status === 401) {
		router.push(ROUTES.AUTH);
	} else {
		toast(await res.json()).trim();
	}
}
