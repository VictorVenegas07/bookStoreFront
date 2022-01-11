export class libroInput {
    titulo:string = "";
    autor:string = "";
    publicador:string = "";
    genero:string = "";
    precio:number = 0;
    idUsuario:number = 0;
}

export class libroView extends libroInput {
    idLibro:number = 0;
}