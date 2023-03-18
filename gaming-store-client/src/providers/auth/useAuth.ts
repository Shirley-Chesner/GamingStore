import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
    signUp as authSignUp,
    signOut,
    login,
    subscribeToUserChangeEvent,
} from './authentiocation';

export interface User {
    id: string;
    email: string | null;
    name: string | null;
    provider: string;
    photoUrl: string | null;
    token: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const onUserChange = async (rawUser: FirebaseUser | null) => {
        if (rawUser) {
            const _user = await _formatUser(rawUser);
            setUser(_user);
            setLoading(false);
            return _user;
        } else {
            setUser(null);
            setLoading(false);
            return null;
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        const user = await authSignUp(email, password, name);
        await addUserToDB(user.uid, user.displayName ? user.displayName : '', '');
        return user;
    };

    const addUserToDB = async (id: string, name: string, description: string) => {
        await fetch('http://localhost:1234/user', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: id,
                profileName: name,
                profileDescription: description,
            }),
        });
    };

    const setUserStatus = async (id: string, state: boolean) => {
        await fetch(`http://localhost:1234/user/${id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { isOnline: state },
            }),
        });
    };

    const signOutFunc = async () => {
        await signOut();
        await setUserStatus(user?.id ? user.id : '', false);
        onUserChange(null);
    };

    const loginFunc = async (email: string, password: string) => {
        const user = await login(email, password);
        await setUserStatus(user.uid, true);
        return user;
    };

    useEffect(() => {
        const unsubscribe = subscribeToUserChangeEvent(onUserChange);

        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signUp,
        login: loginFunc,
        signOut: signOutFunc,
    };
};

const _formatUser = async (user: FirebaseUser): Promise<User> => {
    const token = await user.getIdToken();
    return {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        token,
    };
};
