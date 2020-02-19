import Server from './classes/server';
import router from './routes/router';

import bodyParse from 'body-parser';

import cors from 'cors';

const server = new Server();

// BodyParser
// Lo que sea que me posteen tomalo y transformalo a un objeto de javascript
server.app.use(bodyParse.urlencoded({ extended:true}));
// Pase la petición a un formato json
server.app.use( bodyParse.json());

// CORS
server.app.use( cors({origin:true, credentials:true}) )

// Llamando rutas de servicios
server.app.use('/', router );

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${ server.port}`)
});