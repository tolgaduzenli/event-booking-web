import { useState, useEffect } from 'react';
import constate from "constate";
import { getTokenFromCookie, getUserIdFromCookie, isCookieTokenValid } from '../Utils/SessionManager';

function useAuth() {
    const [isTokenValid, setTokenValid] = useState(false);
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        const tokenValid = isCookieTokenValid()
        setTokenValid(tokenValid);
        if (tokenValid) {
            setToken(getTokenFromCookie());
            setUserId(getUserIdFromCookie());
        }
    }, []);
    return {
        isTokenValid,
        token,
        userId,
        setUserId,
        setToken,
        setTokenValid,
    }
}

const [AuthProvider, useAuthContext] = constate(useAuth);
useAuthContext.Provider = AuthProvider;
export { useAuthContext };
