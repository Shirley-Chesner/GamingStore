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

            // cookie.set("purple-door-finders-token", _user.token, {
            //     expires: 1,
            // });

            setLoading(false);
            return _user;
        } else {
            setUser(null);
            // cookie.remove("purple-door-finders-token");

            setLoading(false);
            return null;
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        const user = await authSignUp(email, password, name);
        // TODO: add description?
        await addUserToDB(user.uid, user.displayName ? user.displayName : '', '');
        // user.
        // add to mongo here
        // const { token, ...userWithoutToken } = user;

        // try {
        //     await createUser(user.uid, { ...userWithoutToken, firstTime: true });
        // } catch (err) {
        //     console.log("createUser failed", err);
        // }

        //    userID: Number,
        // profileName: String,
        // profileDescription: String

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
        // Router.push(url ? url : "/");
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
