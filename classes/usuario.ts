
export class Usuario{
    // obligatoria : todos los clientes conectados tienen un id
    public id: string;

    public nombre:string;
    public sala: string;

    constructor(id:string){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}