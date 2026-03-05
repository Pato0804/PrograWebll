import express from 'express';
import Usuario from './ORM/usuarios.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const usuarios= await Usuario.findAll();
    res.json(usuarios);
});

router.get('/:id',async(req, res) => {
    const usuario= await Usuario.findByPk(req.params.id);
    res.json(usuario);
});

router.post('/',async(req, res) => {
    const {nombre_completo,email,contrasena}=req.body;
    const nuevoUsuario=await Usuario.create({
        nombre_completo,
        email,
        contrasena
    });
    res.send(`Usuario creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const usuario=await Usuario.findByPk(req.params.id);
    await usuario.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const usuario=await Usuario.findByPk(req.params.id);
 

    await usuario.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
