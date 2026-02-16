'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/store/slices/authSlice';

function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check authentication status by calling /api/auth/me
        // The cookie will be sent automatically
        fetch('/api/auth/me', {
            credentials: 'include', // Ensure cookies are sent
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Not authenticated');
                }
                return res.json();
            })
            .then((data) => {
                if (data.user) {
                    dispatch(setUser(data.user));
                } else {
                    dispatch(setLoading(false));
                }
            })
            .catch(() => {
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    return <>{children}</>;
}

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
        </Provider>
    );
}
