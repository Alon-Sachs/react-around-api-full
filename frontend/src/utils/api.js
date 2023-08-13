class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return this._request(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
    }

    getUserInformation() {
        return this._request(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
    }

    editUserInformation({ name, about }) {
        return this._request(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }

    changeLikeCardStatus(id, status) {
        if (status) {
            return this._request(`${this.baseUrl}/cards/${id}/likes`, {
                method: "PUT",
                headers: this.headers
            })

        }
        else {
            return this._request(`${this.baseUrl}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this.headers
            })
        }

    }

    addNewCard({ name, link }) {
        return this._request(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }

    deleteCard(id) {
        return this._request(`${this.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers
        })
    }

    editProfilePicture({ avatar }) {
        return this._request(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkResponse)
    }

    fetchInitialData() {
        const userInfo = this.getUserInformation();
        const initialCard = this.getInitialCards();

        return Promise.all([userInfo, initialCard]);
    }

    addJwtToHeaders(jwt) {
        this.headers.authorization = jwt;
    }
}

const api = new Api({
    baseUrl: "https://api.alonsachs.mooo.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;