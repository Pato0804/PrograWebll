import express from 'express';
import Notificacion from './ORM/notificaciones.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const notificaciones= await Notificacion.findAll();
    res.json(notificaciones);
});

router.get('/:id',async(req, res) => {
    const notificaciones= await Notificacion.findByPk(req.params.id);
    res.json(notificaciones);
});

router.post('/',async(req, res) => {
    const {id_usuario,mensaje,tipo,leido,fecha_creacion}=req.body;
    const nuevoNotificacion=await Notificacion.create({
        id_usuario,mensaje,tipo,leido,fecha_creacion
    });
    res.send(`Notificacion creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const notificaciones=await Notificacion.findByPk(req.params.id);
    await notificaciones.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const notificaciones=await Notificacion.findByPk(req.params.id);
 

    await notificaciones.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
