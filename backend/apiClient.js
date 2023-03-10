import axios from "axios";
const url = "http://localhost:3001/"

export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
    }

    authenticatedCall(method, url, data) {
        return axios({
            method,
            url,
            headers: {
                authorization: this.tokenProvider()
            },
            data,
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                this.logoutHandler();
            } else {
                throw err;
            }
        });
    }

    getAds() {
        return this.authenticatedCall("get", url);
    }

    addAd(name, price) {
        return this.authenticatedCall("post", url, { name, price });
    }

    removeAd(id) {
        return this.authenticatedCall("delete", `${url}${id}`);
    }

    updateAd(id, name, price) {
        return this.authenticatedCall("put", `${url}${id}`, { name, price });
    }

    async login(userName, password) {
        const response = await axios.post(`${url}auth`, { userName, password });
        return response
    }
}