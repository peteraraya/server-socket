import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) =>{
    // Nos creamos una nueva instancia de un usuario
    const usuario = new Usuario( cliente.id);

    usuariosConectados.agregar( usuario);

    
}
//======================================================================
// Configuración de las opciones de los sockets 
// ( toda la Lógica centralizada)
// utilizaremos argumentos como el cliente
//======================================================================

export const desconectar = ( cliente: Socket, io: socketIO.Server) =>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario( cliente.id );

        io.emit('usuarios-activos', usuariosConectados.getLista() );
    });

}
//======================================================================
// Escuchar mensajes y quiero emitir 
// un mensaje a todos los usuarios conectados a mi aplicación de socket
//======================================================================
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{

    cliente.on('mensaje',( payload :{ de:string , cuerpo:string })=>{
            console.log('Mensaje recibido', payload);
    // Emitir algo a todos los usuarios conectados a mi aplicación de socket
        io.emit('mensaje-nuevo',payload);

    });

}
//==============================
//   Configurar Usuario 
//==============================
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        // console.log('Configurando usuario', payload);

        usuariosConectados.actualizarnombre( cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje:`Usuario ${ payload.nombre} configurado`
        })
        // Emitir algo a todos los usuarios conectados a mi aplicación de socket
        // io.emit('mensaje-nuevo', payload);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });

}
//==============================
// Obtener Usuarios 
//==============================
export const obtenerUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuario', () => {
        // le envio mensaje a usuario en particular: le enviamos info solo a las personas que se esten conectando
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });

}




/* io: es el servidor de sockets,  tiene el control de que personas estan conectadas */