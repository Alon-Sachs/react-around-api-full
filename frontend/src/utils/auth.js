export const BASE_URL = "https://api.alonsachs.mooo.com";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
    return fetch(url, options)
        .then(checkResponse)
}

export const register = (email, password) => {
    return request(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
};

export const login = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
};

export const checkToken = (token) => {
    return request(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};
