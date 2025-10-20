class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(res) {
  if (!res.ok) return Promise.reject(`Error: ${res.status}`);
  if (res.status === 204) return Promise.resolve({});
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : Promise.resolve({});
 }


  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {  method: "GET", headers: this.headers, cache: "no-store"})
      .then((res) => this._handleResponse(res));
  }
  getCards() {
  return fetch(`${this.baseUrl}/cards`, { method: "GET", headers: this.headers, cache: "no-store" })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

  updateUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, about })
    }).then((res) => this._handleResponse(res));
  }
likeCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}/likes`, { method: "PUT", headers: this.headers })
    .then(res => this._handleResponse(res));
}
unlikeCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}/likes`, { method: "DELETE", headers: this.headers })
    .then(res => this._handleResponse(res));
}

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link })
    }).then((res) => this._handleResponse(res));
  }
  deleteCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this.headers
  }).then((res) => this._handleResponse(res));
}

updateAvatar({ avatar }) {
  return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: { ...this.headers, "Content-Type": "application/json" },
    body: JSON.stringify({ avatar })
  }).then((res) => {
     if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.status === 204) return {};
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : {};
  });
}
changeLikeCardStatus(cardId, like) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: { authorization: "937ce67a-bb25-4ecd-8635-136a0a5cf439" }
});

export default api;