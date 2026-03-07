import express from 'express';
import Comentario from './ORM/comentarios.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const comentarios= await Comentario.findAll();
    res.json(comentarios);
});

router.get('/:id',async(req, res) => {
    const comentarios= await Comentario.findByPk(req.params.id);
    res.json(comentarios);
});

router.post('/',async(req, res) => {
    const {texto,fecha_creacion,id_usuario,id_publicacion,pais}=req.body;
    const nuevoComentario=await Comentario.create({
        texto,
        fecha_creacion,
        id_usuario,
        id_publicacion,
        pais
    });
    res.send(`Comentario creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const comentarios=await Comentario.findByPk(req.params.id);
    await comentarios.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const comentarios=await Comentario.findByPk(req.params.id);
 

    await comentarios.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
