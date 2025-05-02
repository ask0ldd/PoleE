export class CreateUserDto {
    id? : number
    username : string
    email : string
    password : string

    constructor(user : {username : string, email : string, password : string}){
        this.username = user.username
        this.email = user.email
        this.password = user.password
    }
}
