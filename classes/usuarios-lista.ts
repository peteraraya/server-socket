import { Usuario } from './usuario';

export class UsuariosLista {

    // Con la primera instancia se crea está lista vacía
    private lista: Usuario[] = [];
    constructor() {
        
    }

    // Metodos

    // Agregar un usuario
    public agregar( usuario:Usuario ){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // Actualizar usuario
    public actualizarnombre(id:string, nombre:string){
        for (const usuario of this.lista) {
            if ( usuario.id === id) {
                 usuario.nombre = nombre;
                 break;
            }
        }

        console.log('========= Actualizando Usuario ========');
        console.log(this.lista);
    }


    // Obtener lista de todos los usuarios
    public getLista(){

        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');

    }

    // Obtener usuario
    public getUsuario(id:string){
         return this.lista.find( usuario => usuario.id === id);
    }

    // Obtener usuario en una sala en particular
    public getUsuaruisEnSala( sala:string){
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    // Borrar un usuario: cuando un usuario sale del chat
    public borrarUsuario(id:string){
        
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id);
        

        // console.log(this.lista);

        // usuario borrado es :
        return tempUsuario;
    }

}