export class AuthModel {
  async login(email, password) {
    const response = await fetch("/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.setItem("token", data.loginResult.token);
    return data;
  }

  async register(name, email, password) {
    const response = await fetch("/api/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
}
