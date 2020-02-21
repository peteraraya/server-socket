
import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

// GET
router.get('/mensajes',(req:Request,res:Response)=>{
    // Enviar un mensaje de respuesta

    res.json({
        ok:true,
        mensaje: 'Todo esta bien!!'
    })
});


// POST 
router.post("/mensajes", (req: Request, res: Response) => {
  // Enviar un mensaje de respuesta

  // Leer la info en caso de que una de estas no se envie se enviará un undefined
  const cuerpo = req.body.cuerpo;
  const de     = req.body.cuerpo;

  // Emitir clase global
  const payload = {cuerpo,de};
  const server = Server.instance;
  server.io.emit('mensaje-nuevo',payload);


  // Respuesta
  res.json({
    ok: true,
    cuerpo,
    de
  });

});

// POST con id: utilizado para enviar un mensaje privado
router.post("/mensajes/:id", (req: Request, res: Response) => {
  // Enviar un mensaje de respuesta

  // Leer la info en caso de que una de estas no se envie se enviará un undefined
  const cuerpo = req.body.cuerpo;
  const de     = req.body.cuerpo;
  const id     = req.params.id;

  // Conectar nuestro servicio rest con nuestro servidor de socket

  const payload ={
    de,
    cuerpo
  }

  //Instancia de nuestro server
  const server = Server.instance;

  // enviar mensaje a 1 o a todos los usuarios
  server.io.in( id ).emit('mensaje-privado', payload);


// Respuesta
  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});


// Servicio para obtener todos los Ids de los usuarios
router.get('/usuarios',(req: Request, res:Response)=>{

  const server = Server.instance;

  // barrer todos los usuarios
  server.io.clients((err:any,clientes: string[]) =>{
    if (err) {
      // en caso de que lo haga mal
     return res.json({
        ok:false,
        err
      });
    }

    // todo está bien
    res.json({
      ok:true,
      clientes
    });


  });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  /// utilizaremos getlista
  
  // todo está bien
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  });


});


export default router;