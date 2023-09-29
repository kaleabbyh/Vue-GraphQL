// auth.js
// import jwt from "jsonwebtoken";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(id) {
  // const token = jwt.sign({ id }, "your_secret_key");
  localStorage.setItem("token", id);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  const token = getToken();
  return !!token;
}
