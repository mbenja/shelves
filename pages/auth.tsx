import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../components/Button';
import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import { fetcher } from '../lib/fetcher';

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const [emailText, setEmailText] = useState('');
	const [passwordText, setPasswordText] = useState('');
	const [confirmPasswordText, setConfirmPasswordText] = useState('');
	const router = useRouter();

	async function handleAuth(): Promise<void> {
		if (isLogin) {
			handleSignIn();
		} else {
			fetcher
				.post('/api/auth/createUser', {
					email: emailText,
					password: passwordText
				})
				.then(async (response) => {
					if (response.status === 200) {
						handleSignIn();
					} else {
						toast(await response.json()).trim();
					}
				});
		}
	}

	async function handleSignIn(): Promise<void> {
		const { callbackUrl } = router.query;

		const result = await signIn('credentials-provider', {
			redirect: false,
			email: emailText,
			password: passwordText
		});

		if (result?.ok) {
			router.push((callbackUrl as string) ?? window.location.origin);
		} else {
			toast((result?.error ?? 'Unknown error').trim());
		}
	}

	return (
		<PageContainer>
			<div className="flex flex-col h-full items-center justify-center">
				<div className="flex flex-col gap-4 items-center md:w-1/4 w-2/3">
					<h1 className="font-bold mb-4 text-3xl tracking-tight">shelves</h1>
					<form
						className="flex flex-col gap-4 w-full"
						onSubmit={(e) => {
							e.preventDefault();
							handleAuth();
						}}
					>
						<Input
							onChange={(v: string) => setEmailText(v)}
							placeholder="email"
							value={emailText}
						/>
						<Input
							onChange={(v: string) => setPasswordText(v)}
							placeholder="password"
							type="password"
							value={passwordText}
						/>
						{!isLogin && (
							<Input
								onChange={(v: string) => setConfirmPasswordText(v)}
								placeholder="confirm password"
								type="password"
								value={confirmPasswordText}
							/>
						)}
						<Button
							expand
							disabled={
								!emailText ||
								!passwordText ||
								(!isLogin && passwordText !== confirmPasswordText)
							}
							text={isLogin ? 'Login' : 'Sign Up'}
							type="submit"
						/>
						{/* <Button
							expand
							fill="clear"
							onClick={() => {
								setIsLogin(!isLogin);
							}}
							text={
								isLogin
									? 'Need to create an account?'
									: 'Already have an account?'
							}
						/> */}
					</form>
				</div>
			</div>
		</PageContainer>
	);
}
