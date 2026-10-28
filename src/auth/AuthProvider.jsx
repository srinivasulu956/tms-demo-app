import { useCallback, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY } from '../constants/app';
import { AuthContext } from './auth-context';

const readStoredUser = () => {
    try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const writeStoredUser = (user) => {
    try {
        if (user) {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            sessionStorage.removeItem(AUTH_STORAGE_KEY);
        }
    } catch {
        return;
    }
};

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);

    const signIn = useCallback((signedInUser) => {
        writeStoredUser(signedInUser);
        setUser(signedInUser);
    }, []);

    const signOut = useCallback(() => {
        writeStoredUser(null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
