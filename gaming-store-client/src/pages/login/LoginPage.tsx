import './LoginPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { AppLogo, PasswordInput, TextInput } from '../../ui';
import { useAuthContext } from '../../providers/AuthProvider';

export const LoginPage: FC = () => {
    return (
        <div className="login-page">
            <Card className="login-card">
                <AppLogo className="small-app-logo" small />
                <LoginForm />
                <div className="right-side">
                    <img className="login-background-img" src="./login-background.jpeg" />
                    <AppLogo />
                </div>
            </Card>
        </div>
    );
};

const MAX_PASSWORD_DIGITS = 8;

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    const { login } = useAuthContext();

    const onLogin = useCallback(async () => {
        try {
            const user = await login?.(email, password);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, [email, password]);

    useEffect(() => {
        if (email.length > 0 && password.length >= MAX_PASSWORD_DIGITS) setIsValid(true);
        else setIsValid(false);
    }, [email, password]);

    return (
        <div className="login-form">
            <h2>Welcome Back!</h2>
            <span>continue with google, or enter your details</span>
            <TextInput title="Email" type="email" value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} />
            <div>
                <span className="forgot-password-btn">Forgot password</span>
            </div>
            <Button
                className="login-btn"
                variant="contained"
                disabled={!isValid}
                onClick={onLogin}
                endIcon={<ArrowForwardIcon />}
            >
                Login
            </Button>
            <div>
                <span>
                    don't have an account? <b>sign up</b>
                </span>
            </div>
        </div>
    );
};
