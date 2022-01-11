export class UsuarioInput{
    user: string = "";
    password: string = "";
}

export class UsuarioView extends UsuarioInput{
    idUser: number = 0;
    role: string = "";
    name: string = "";
    token: string = "";
}