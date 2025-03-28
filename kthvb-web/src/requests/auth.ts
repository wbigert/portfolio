import { LoginResponse } from "@/models/Login"
import { User } from "@/models/User"

export function setLoggedIn (response: LoginResponse) : void {
  localStorage.loggedIn = 'true'
  localStorage.token = response.token
  localStorage.userDetails = JSON.stringify(response)
  localStorage.removeItem('tryout_id')
}

export function setLoggedOut () : void {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('tryout_id')
  localStorage.removeItem('token')
  localStorage.removeItem('userDetails')
}

export function loggedIn () : boolean {
  return localStorage.loggedIn === 'true'
}
