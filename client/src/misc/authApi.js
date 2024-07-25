import { instance, bearerAuth } from './apiConfig';


export const authApi = {
  login,
  register,
  getCurrentUser
}

function login(username, password) {
  return instance.post('api/auth/login', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function register(user) {
  return instance.post('api/auth/register', user, {
    headers: { 'Content-type': 'application/json' }
  })
}


function getCurrentUser(user) {
  return instance.get('api/auth/current-user', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}



