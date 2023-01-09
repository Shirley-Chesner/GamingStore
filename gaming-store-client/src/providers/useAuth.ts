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

        // add to mongo here
        // const { token, ...userWithoutToken } = user;

        // try {
        //     await createUser(user.uid, { ...userWithoutToken, firstTime: true });
        // } catch (err) {
        //     console.log("createUser failed", err);
        // }

        return user;
    };

    const signOutFunc = async () => {
        // Router.push(url ? url : "/");

        await signOut();
        onUserChange(null);
    };

    useEffect(() => {
        const unsubscribe = subscribeToUserChangeEvent(onUserChange);

        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signUp,
        login,
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
