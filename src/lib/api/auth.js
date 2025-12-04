import api from "./axios";

let accessToken = null;
export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}

// export async function logout() {
//   try {
//     await api.post("/auth/logout");
//   } catch (error) {
//     console.log("logout error", error);
//   }
//   localStorage.removeItem("access_token");
//   window.location.href = "/signin";
// }

// export function isLoggedIn() {
//   if (typeof window === "undefined") return false;
//   return !!localStorage.getItem("access_token");
// }
