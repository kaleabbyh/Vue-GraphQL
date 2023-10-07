////////////////////////////////
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  return localStorage.getItem("accesstoken");
}

export function setAccessToken(id) {
  localStorage.setItem("accesstoken", id);
}

export function removeAccessToken() {
  localStorage.removeItem("accesstoken");
}

export function isAuthenticated() {
  const token = getAccessToken();
  return !!token;
}

export const extractIdFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    return id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
