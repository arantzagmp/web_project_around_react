class Api {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handle(res) {
    if (res.status === 204) return Promise.resolve({});

    if (res.ok) return res.json();

    return res
      .json()
      .catch(() => ({}))
      .then((data) => {
        const message = data?.message || `HTTP ${res.status}`;
        throw new Error(message);
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((r) => this._handle(r));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, about }),
    }).then((r) => this._handle(r));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ avatar }),
    }).then((r) => this._handle(r));
  }

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((r) => this._handle(r));
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    }).then((r) => this._handle(r));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((r) => this._handle(r));
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
    }).then((r) => this._handle(r));
  }
}

const BASE_URL = "https://around-api.es.tripleten-services.com/v1/web_project_around_react";
const AUTH_TOKEN = import.meta.env.VITE_API_TOKEN || "937ce67a-bb25-4ecd-8635-136a0a5cf439";

const api = new Api(BASE_URL, {
  authorization: AUTH_TOKEN,
});

export default api;
