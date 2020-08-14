import config from '../config';
import TokenService from './token-service';

const DateRushApiService = {
    getDates() {
        return fetch(`${config.MAIN_API_ENDPOINT}/dates`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => {
            return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
        })
    },
    postDate(item) {
        console.log(item);
        return fetch(`${config.MAIN_API_ENDPOINT}/dates`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(item)
        })
        .then(res => {
            return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
        })
    },
    deleteDateItem(dateId, callback) {
        return fetch(`${config.MAIN_API_ENDPOINT}/dates/${dateId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status);
            }
            callback(dateId);
        })
    },
    updateDateItem(dateId, newDateItem) {
        return fetch(`${config.MAIN_API_ENDPOINT}/dates/${dateId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newDateItem)
        })
        .then(res => {
            return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
        })
    }
}

export default DateRushApiService;