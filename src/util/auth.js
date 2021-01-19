import Cookies from 'js-cookie';
const TokenKey = 'access-token';
const RefreshTokenKey = 'refresh-token';
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setCookie(name, data) {
  return Cookies.set(name, data)
}

export function getCookie(name) {
  return Cookies.get(name)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

