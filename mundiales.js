import express from 'express';
import Mundial from './ORM/mundiales.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const mundiales= await Mundial.findAll();
    res.json(mundiales);
});

router.get('/:id',async(req, res) => {
    const mundiales= await Mundial.findByPk(req.params.id);
    res.json(mundiales);
});

router.post('/',async(req, res) => {
    const {nombre,fecha,sede,imagen_url,descripcion}=req.body;
    const nuevoComentario=await Mundial.create({
        nombre,fecha,sede,imagen_url,descripcion
    });
    res.send(`Mundial creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const mundiales=await Mundial.findByPk(req.params.id);
    await mundiales.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const mundiales=await Mundial.findByPk(req.params.id);
 

    await mundiales.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
