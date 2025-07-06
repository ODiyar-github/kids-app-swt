import { UserDTO } from "./user.dto";

export class AuthLoginDTO{
    private username: string;
    private password: string;
    private user: UserDTO;
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