import axios from 'axios';

export function apiCall(requestBody, token) {
    const bodyParam = JSON.stringify(requestBody);
    return axios.post('http://localhost:8000/graphql', bodyParam, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => res)
    .catch((err) => err);
}
