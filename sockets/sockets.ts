import { Socket } from 'socket.io';
import socketIO from 'socket.io';


// Configuración de las opciones de los sockets ( toda la Lógica centralizada)

// utilizaremos argumentos como el cliente

export const desconectar = ( cliente: Socket) =>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
    });

}

// Escuchar mensajes y quiero emitir un mensaje a todos los usuarios conectados a mi aplicación de socket
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{

    cliente.on('mensaje',( payload :{ de:string , cuerpo:string })=>{
            console.log('Mensaje recibido', payload);
    // Emitir algo a todos los usuarios conectados a mi aplicación de socket
        io.emit('mensaje-nuevo',payload);
    });

}





/* io: es el servidor de sockets,  tiene el control de que personas estan conectadas */