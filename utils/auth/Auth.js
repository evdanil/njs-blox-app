// authData object assumes properties: apiUrl string, username string, password string
export function getStoredAuth() {
  const authData = localStorage.getItem('authData')
    ? JSON.parse(localStorage.getItem('authData'))
    : { apiUrl: '', username: '', pasword: '' }
  return authData
}

export function storeAuthData(authData) {
  localStorage.setItem('authData', JSON.stringify(authData))
}
