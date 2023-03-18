import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    User,
    signOut as firebaseSignOut,
    updateProfile,
    onIdTokenChanged,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAZeCwSD8Az1sdBuOXYJ0SeT8LDO_lATO8',
    authDomain: 'gamingstore-e0b4f.firebaseapp.com',
    projectId: 'gamingstore-e0b4f',
    storageBucket: 'gamingstore-e0b4f.appspot.com',
    messagingSenderId: '709754022401',
    appId: '1:709754022401:web:74f0c1f30d8e4e2454ae00',
    measurementId: 'G-KEWJ8LMLLV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

type AuthEventError = {
    code: string;
    message: string;
};

export function subscribeToUserChangeEvent(onChange: (user: User | null) => void) {
    return onIdTokenChanged(auth, onChange);
}

export function signOut() {
    return firebaseSignOut(auth);
}

export async function signUp(email: string, password: string, name: string): Promise<User> {
    const user = await _userSignInOrUp(email, password, true);

    await updateProfile(user, { displayName: name });

    return user;
}

export function login(email: string, password: string): Promise<User> {
    return _userSignInOrUp(email, password);
}

async function _userSignInOrUp(email: string, password: string, newUser = false): Promise<User> {
    const signInOrUpFunc = newUser ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    try {
        const userCredential = await signInOrUpFunc(auth, email, password);

        return userCredential.user;
    } catch (error) {
        const authError = error as AuthEventError;
        const errorCode = authError.code;
        const errorMessage = authError.message;

        throw error;
    }
}
