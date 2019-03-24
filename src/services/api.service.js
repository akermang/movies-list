import fetch from 'isomorphic-fetch';

const API = 'http://www.omdbapi.com/?';

export const fetchData = (query) => {
    return fetch(API + query)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong ...');
        })
}
