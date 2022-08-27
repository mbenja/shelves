import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { Statistic } from '../../lib/types/statistics';
import { resolveErrorMessage } from '../../lib/util';
import { prisma } from '../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req });
	if (!token) return res.status(401).end();

	try {
		const books = await prisma.book.findMany({
			where: {
				userId: token.userId,
				yearRead: {
					not: null
				}
			},
			select: {
				pageCount: true,
				yearRead: true
			}
		});

		const statsObj: {
			[key: number]: Omit<Statistic, 'year'>;
		} = {};
		books.forEach((book) => {
			if (book.yearRead) {
				statsObj[book.yearRead] = {
					bookCount: (statsObj[book.yearRead]?.bookCount ?? 0) + 1,
					pageCount: (statsObj[book.yearRead]?.pageCount ?? 0) + book.pageCount
				};
			}
		});

		const stats: Statistic[] = [];
		for (const [k, v] of Object.entries(statsObj)) {
			stats.push({ ...v, year: parseInt(k) });
		}

		stats.sort((a, b) => b.year - a.year);

		return res.status(200).json(stats);
	} catch (error) {
		return res.status(500).json(resolveErrorMessage(error));
	}
}
