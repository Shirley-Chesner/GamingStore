import './LoginPage.css';

import Card from '@mui/material/Card';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { AppLogo, TextInput } from '../ui';

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

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <div className="login-form">
            <h2>Welcome Back!</h2>
            <span>continue with google, or enter your details</span>
            <TextInput title="Email" type="email" value={email} onChange={setEmail} />
            <TextInput title="Password" type="password" value={password} onChange={setPassword} />
            <div>
                <span className="forgot-password-btn">Forgot password</span>
            </div>
            <Button className="login-btn" variant="contained" endIcon={<ArrowForwardIcon />}>
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
