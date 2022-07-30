import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function Settings() {
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const themes = [
		{
			id: 0,
			value: 'system',
			label: 'System'
		},
		{
			id: 1,
			value: 'light',
			label: 'Light'
		},
		{
			id: 2,
			value: 'dark',
			label: 'Dark'
		}
	];

	useEffect(() => {
		setMounted(true);
	}, []);

	async function handleLogout(): Promise<void> {
		const signOutResponse = await signOut({
			redirect: false,
			callbackUrl: '/auth'
		});
		router.push(signOutResponse.url);
	}

	if (!mounted) {
		return null;
	}

	return (
		<PageContainer title="Settings">
			<div className="flex flex-col gap-8 md:w-1/4 w-full">
				<div>
					<Listbox value={theme} onChange={setTheme}>
						<Listbox.Label className="font-semibold">Theme</Listbox.Label>
						<Listbox.Button className="bg-neutral-100 dark:bg-neutral-600 flex focus:outline-none justify-between pl-3 pr-2 py-2 mt-2 rounded shadow w-full">
							{themes.find((i) => i.value === theme)?.label}
							<SelectorIcon className="h-5 my-auto w-5" />
						</Listbox.Button>
						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Listbox.Options className="absolute bg-neutral-100 dark:bg-neutral-600 cursor-pointer focus:outline-none mt-1 rounded shadow w-full z-10">
								{themes.map((theme) => (
									<Listbox.Option key={theme.id} value={theme.value}>
										{({ selected }) => (
											<span className="flex gap-1 dark:hover:bg-neutral-500 hover:bg-neutral-300 items-center p-2 rounded transition">
												<span className="basis-6">
													{selected && <CheckIcon className="h-5 m-auto w-5" />}
												</span>
												<span className="">{theme.label}</span>
											</span>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</Listbox>
				</div>
				<Button expand text="Logout" onClick={handleLogout} />
			</div>
		</PageContainer>
	);
}
