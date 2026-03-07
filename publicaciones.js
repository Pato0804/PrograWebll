import express from 'express';
import Publicacion from './ORM/publicaciones.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const publicaciones= await Publicacion.findAll();
    res.json(publicaciones);
});

router.get('/:id',async(req, res) => {
    const publicaciones= await Publicacion.findByPk(req.params.id);
    res.json(publicaciones);
});

router.post('/',async(req, res) => {
    const {titulo,mensaje,imagen_url,video_url,fecha_creacion,
        fecha_aprobacion,estatus_aprobacion,
        id_usuario,id_mundial,id_categoria}=req.body;
    const nuevoPublicacion=await Publicacion.create({
        titulo,mensaje,imagen_url,video_url,fecha_creacion,
        fecha_aprobacion,estatus_aprobacion,
        id_usuario,id_mundial,id_categoria
    });
    res.send(`Publicacion creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const publicaciones=await Publicacion.findByPk(req.params.id);
    await publicaciones.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const publicaciones=await Publicacion.findByPk(req.params.id);
 

    await publicaciones.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
