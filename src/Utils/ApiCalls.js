import axios from 'axios';

export function apiCall(requestBody) {
    const bodyParam = JSON.stringify(requestBody);
    return axios.post('http://localhost:8000/graphql', bodyParam, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}