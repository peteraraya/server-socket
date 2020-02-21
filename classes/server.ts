
import  express  from 'express';
import { SERVER_PORT } from '../global/environment';
// socket io
import socketIO from 'socket.io';
// Intermediario entre socket y express
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server{
    
    private static _instance:Server;

    public app:express.Application;
    public port:number;
    // Propiedad encargada de emitir eventos
    public io: socketIO.Server;
    private httpServer:http.Server;
    
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT; // utilizo la variable global de la aplicación
        // Incializar
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        
        this.escucharSockets();
    }

    // Patrón Singleton
    // cuando alguien quiera tener la instancia de server
    public static  get instance(){

        // Si ya existe una instancia regresa esa instancia | si no existe crea una nueva instancia
        return this._instance || (this._instance = new this());
    }

    // Metodo que escucha sockets

    private escucharSockets(){
        console.log('escuchando conexiones - sockets');

        this.io.on('connection', cliente =>{
                // console.log('Nuevo cliente conectado');
                // console.log(cliente.id);

                // Conectar Cliente
                socket.conectarCliente(cliente, this.io);

                //Configurar Usuario
                socket.configurarUsuario(cliente, this.io);

                // Obtener usuarios activos
                socket.obtenerUsuario(cliente,this.io);


                // Mensajes
                socket.mensaje(cliente, this.io);

                //  Desconectar
                socket.desconectar( cliente, this.io );

               


        });
    }
    

    //Metodo para levantar la aplicación
    start( callback: Function){
        this.httpServer.listen(this.port, callback());
    }


}