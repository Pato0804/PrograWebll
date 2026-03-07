import express from 'express';
import Suscripcion from './ORM/suscripciones_mundiales.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const suscripciones_mundiales= await Suscripcion.findAll();
    res.json(suscripciones_mundiales);
});

router.get('/:id',async(req, res) => {
    const suscripciones_mundiales= await Suscripcion.findByPk(req.params.id);
    res.json(suscripciones_mundiales);
});

router.post('/',async(req, res) => {
    const {id_usuario,id_mundial,fecha_suscripcion}=req.body;
    const nuevoReaccion=await Suscripcion.create({
        id_usuario,id_mundial,fecha_suscripcion
    });
    res.send(`Reaccion creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const suscripciones_mundiales=await Suscripcion.findByPk(req.params.id);
    await suscripciones_mundiales.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const suscripciones_mundiales=await Suscripcion.findByPk(req.params.id);
 

    await suscripciones_mundiales.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
