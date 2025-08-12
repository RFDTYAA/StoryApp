export class AuthModel {
  constructor() {
    this.API_ENDPOINT = "https://story-api.dicoding.dev/v1";
  }

  async login(email, password) {
    const response = await fetch(`${this.API_ENDPOINT}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Login gagal, periksa email dan password."
      );
    }

    localStorage.setItem("token", data.loginResult.token);
    localStorage.setItem("name", data.loginResult.name);

    return data;
  }

  async register(name, email, password) {
    const response = await fetch(`${this.API_ENDPOINT}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal.");
    }
    return data;
  }
}
