import { LoginResponse } from "@/models/Login";
import { Permission, UserRole } from "@/models/User";

export const UserDetailsSnapshot: LoginResponse = {
    id: "637fda8808d924036862bc34",
    name: "William Bigert",
    picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/william-b.png",
    permissions: [Permission.Admin],
    email: "william-b@studs.se",
    token: "abc"
}