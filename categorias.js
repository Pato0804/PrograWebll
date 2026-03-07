import express from 'express';
import Categoria from './ORM/categorias.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const categorias= await Categoria.findAll();
    res.json(categorias);
});

router.get('/:id',async(req, res) => {
    const categorias= await Categoria.findByPk(req.params.id);
    res.json(categorias);
});

router.post('/',async(req, res) => {
    const {nombre,descripcion}=req.body;
    const nuevoCategoria=await Categoria.create({
        nombre,
        descripcion
    });
    res.send(`Usuario creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const categorias=await Categoria.findByPk(req.params.id);
    await categorias.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const categorias=await Categoria.findByPk(req.params.id);
 

    await categorias.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
