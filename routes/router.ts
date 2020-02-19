
import {Router, Request, Response} from 'express';

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


  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

export default router;