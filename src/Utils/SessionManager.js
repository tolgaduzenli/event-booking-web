import Cookies from 'js-cookie'
import jwt from 'jwt-decode';

export const isCookieTokenValid = () => {
    const token = Cookies.get('token');
    if (token) {
        const decodedToken = jwt(token);
        // Check for expired token
        const currentTime = Date.now() / 1000 // to get in milliseconds
        return decodedToken.exp >= currentTime;
    } else {
        return false;
    }

}

export const setTokenToCookie = (auth) => {
    const { token, userId, expiration } = auth;
    Cookies.set('token', token);
    Cookies.set('userId', userId);
    Cookies.set('tokenExpiration', expiration);
}

export const getTokenFromCookie = () => {
    return Cookies.get('token');
}

export const getUserIdFromCookie = () => {
    return Cookies.get('userId');
}

export const removeTokenFromCookie = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('tokenExpiration');
}
