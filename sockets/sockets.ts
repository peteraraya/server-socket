import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { mapaGoogle } from '../routes/router';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();

// Eventos de Mapa Google

export const marcadorGoogleNuevo = (cliente: Socket) => {
    
    cliente.on('marcador-nuevo', (marcador) =>{
        console.log(marcador);
        // agrega marcadores en todas las pantallas
        mapaGoogle.agregarMarcador( marcador );
        // emite cambios en todos lados, evitamos dependencia del io
        cliente.broadcast.emit('marcador-nuevo',marcador);
        // cliente.brodcast  evita que aparescan dos veces las emisiones
    
    });
}

export const marcadorGoogleBorrar = (cliente: Socket) => {

    cliente.on('marcador-borrar', (id:string) => {
        console.log(id);
        // agrega marcadores en todas las pantallas
        mapaGoogle.borrarMarcador(id);
        // emite cambios en todos lados, evitamos dependencia del io
        cliente.broadcast.emit('marcador-borrar', id);
        // cliente.brodcast  evita que aparescan dos veces las emisiones

    });
}

export const marcadorGoogleMover = (cliente: Socket) => {

    cliente.on('marcador-mover', (marcador) => {
        console.log(marcador);
        // agrega marcadores en todas las pantallas
        mapaGoogle.moverMarcador(marcador);
        // emite cambios en todos lados, evitamos dependencia del io
        cliente.broadcast.emit('marcador-mover', marcador);
        // cliente.brodcast  evita que aparescan dos veces las emisiones

    });
}


// Eventos de Mapa mapbox
export const mapaSockets = (cliente: Socket, io: socketIO.Server) => {
    // El cliente = instancia de la app | io = servidor de los socket conectados
    
    // Escuchamos cuando el cliente emite algo
    cliente.on('marcador-nuevo',( marcador:Marcador)=>{
        // En el mapa debemos adicionar este objeto al mapa
        mapa.agregarMarcador(marcador);
            
        // envio mensaje (emisión) a todo el mundo menos el que lo emite
        // payload: sera el marcador que recibi como argumento
        cliente.broadcast.emit('marcador-nuevo', marcador); 
    });
    // BORRAR
    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador( id );
        cliente.broadcast.emit('marcador-borrar', id); 
    });
    // BORRAR
    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
}


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