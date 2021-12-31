export class UsuarioInput{
    user: string = "";
    password: string = "";
}

export class UsuarioView extends UsuarioInput{
    role: string = "";
    name: string = "";
    token: string = "";
}