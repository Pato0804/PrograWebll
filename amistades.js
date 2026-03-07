import express from 'express';
import Amistad from './ORM/amistades.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const amistades= await Amistad.findAll();
    res.json(amistades);
});

router.get('/:id',async(req, res) => {
    const amistades= await Amistad.findByPk(req.params.id);
    res.json(amistades);
});

router.post('/',async(req, res) => {
    const {id_solicitante,id_receptor,estado,fecha_solicitud}=req.body;
    const nuevoAmistad=await Amistad.create({
        id_solicitante,
        id_receptor,
        estado,
        fecha_solicitud
    });
    res.send(`Tipo de Usuario creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const amistades=await Amistad.findByPk(req.params.id);
    await amistades.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const amistades=await Amistad.findByPk(req.params.id);
 

    await amistades.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;