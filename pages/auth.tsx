import { useState } from 'react';

import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [confirmPasswordText, setConfirmPasswordText] = useState('');

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col gap-4 items-center w-2/3">
          <h1 className="font-bold mb-4 text-3xl tracking-tight">shelves</h1>
          <Input
            onChange={(v: string) => setEmailText(v)}
            placeholder="email"
            type="text"
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
            disabled={
              !emailText ||
              !passwordText ||
              (!isLogin && passwordText !== confirmPasswordText)
            }
            onClick={() => {}}
            text="Login"
          />
          <Button
            fill="clear"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            text={
              isLogin
                ? 'Need to create an account?'
                : 'Already have an account?'
            }
          />
        </div>
      </div>
    </Container>
  );
}
