import express from 'express';
import Reaccion from './ORM/reacciones.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const reacciones= await Reaccion.findAll();
    res.json(reacciones);
});

router.get('/:id',async(req, res) => {
    const reacciones= await Reaccion.findByPk(req.params.id);
    res.json(reacciones);
});

router.post('/',async(req, res) => {
    const {id_usuario,id_publicacion,tipo,fecha_reaccion}=req.body;
    const nuevoReaccion=await Reaccion.create({
        id_usuario,id_publicacion,tipo,fecha_reaccion
    });
    res.send(`Reaccion creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const reacciones=await Reaccion.findByPk(req.params.id);
    await reacciones.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const reacciones=await Reaccion.findByPk(req.params.id);
 

    await reacciones.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
