import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import { removeTokenFromCookie } from '../Utils/SessionManager';

export default function Logout() {
    const { isTokenValid, setIsTokenValid } = useAuthContext();
    if (isTokenValid) {
        setIsTokenValid(false)
        removeTokenFromCookie();
        return (
            <Redirect to="/auth" push />
        )
    }
    return null;
}