import './LoginPage.css';

import Card from '@mui/material/Card';
import { FC, useCallback, useEffect } from 'react';

import { AppLogo } from '../../ui';
import { FormProps, LoginForm } from './LoginForm';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const SignUpPage: FC = () => {
    const { signUp } = useAuthContext();

    const onSignUp = useCallback(async (email: string, password: string, name: string) => {
        try {
            const user = await signUp?.(email, password, name);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, []);

    return <Page type="Sign Up" onLogin={onSignUp} />;
};

export const LoginPage: FC = () => {
    const { login } = useAuthContext();

    const onLogin = useCallback(async (email: string, password: string) => {
        try {
            const user = await login?.(email, password);
            console.log('🚀 ~ file: loginPage.tsx:36 ~ onLogin ~ user', user);
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
        }
    }, []);

    return <Page type="Login" onLogin={onLogin} />;
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <div className="login-page">
            <Card className="login-card">
                <AppLogo className="small-app-logo" small />
                <LoginForm {...formProps} />
                <div className="right-side">
                    <img className="login-background-img" src="./login-background.jpeg" />
                    <AppLogo />
                </div>
            </Card>
        </div>
    );
};
