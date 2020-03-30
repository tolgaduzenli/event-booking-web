import { useState, useEffect } from 'react';
import createUseContext from 'constate';
import { isCookieTokenValid } from '../Utils/SessionManager';

function useAuth() {
    const [isTokenValid, setIsTokenValid] = useState(false);
    useEffect(() => {
        setIsTokenValid(isCookieTokenValid());
    }, []);
    return {
        isTokenValid,
        setIsTokenValid,
    }
}

const useAuthContext = createUseContext(useAuth);
export default useAuthContext;