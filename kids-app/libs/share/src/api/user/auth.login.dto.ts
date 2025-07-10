import { UserDTO } from "./user.dto";

export class AuthLoginDTO{
    username: string;
    password: string;
    user: UserDTO;
    constructor(
        username: string,
        password: string,
        user: UserDTO
    ){
        this.password = password;
        this.username = username;
        this.user = user;
    }
}