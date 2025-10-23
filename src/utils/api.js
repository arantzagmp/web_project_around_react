class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handle(res) {
    if (!res.ok) {
      return res.text().then((t) => {
        const msg = t || `HTTP ${res.status}`;
        return Promise.reject(new Error(msg));
      });
    }
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return {};
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then((r) => this._handle(r));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, about })
    }).then((r) => this._handle(r));
  }

  updateAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ avatar })
    }).then((r) => this._handle(r));
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then((r) => this._handle(r));
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link })
    }).then((r) => this._handle(r));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    }).then((r) => this._handle(r));
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers
    }).then((r) => this._handle(r));
  }
}
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/web_project_around_react",
  headers: {
    authorization: "937ce67a-bb25-4ecd-8635-136a0a5cf439"}
  });

export default api;