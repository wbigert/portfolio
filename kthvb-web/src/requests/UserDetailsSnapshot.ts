import { LoginResponse } from "@/models/Login";
import { Permission, UserInfo } from "@/models/User";

export const UserDetailsSnapshot: LoginResponse = {
    "id": "64d00205ae483c752c0edcaf",
    "email": "wille555@hotmail.se",
    "token": "...",
    "name": "William Bigert",
    "picture": "",
    "permissions": [
      Permission.Admin,
      Permission.Events,
      Permission.Tryouts
    ]
  }